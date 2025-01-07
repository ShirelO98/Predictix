from sklearn.ensemble import RandomForestClassifier
from ml.preprocess import preprocess_data
from predictixApp.models import Machine, ModelTrainingMetadata
import joblib
import pandas as pd
import os

def train_model_if_needed():
    try:
        # Get the current count of data in the database
        current_data_count = Machine.objects.count()

        # Get the last training metadata
        metadata, created = ModelTrainingMetadata.objects.get_or_create(id=1)

        # Check if we need to train the model
        if current_data_count - metadata.last_training_count >= 100:
            print("Training model...")

            # Load data from the database
            queryset = Machine.objects.all().values(
                "vibration", "temperature", "pressure", "up_time", "down_time", "status"
            )
            
            if not queryset.exists():
                print("No data available for training.")
                return

            df = pd.DataFrame(list(queryset))

            # Preprocess data
            X_train, X_test, y_train, y_test, scaler = preprocess_data(df)

            # Train model
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            model.fit(X_train, y_train)

            # Save the model and scaler
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            joblib.dump(model, os.path.join(BASE_DIR, "ml", "model.pkl"))
            joblib.dump(scaler, os.path.join(BASE_DIR, "ml", "scaler.pkl"))

            # Update metadata
            metadata.last_training_count = current_data_count
            metadata.save()

            print("Model trained and metadata updated.")
    except Exception as e:
        print(f"Error during model training: {e}")
