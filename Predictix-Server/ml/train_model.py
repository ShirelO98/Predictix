import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib
import pandas as pd
from ml.preprocess import preprocess_data
from data.export_data import export_data_to_csv
from predictixApp.models import Machine, ModelTrainingMetadata

def train_and_tag_if_needed(forece_retrain=False):
    try:
        # Fetch metadata
        metadata, created = ModelTrainingMetadata.objects.get_or_create(id=1)
        current_data_count = Machine.objects.count()

        # Check if new records require retraining
        if forece_retrain or current_data_count - metadata.last_training_count >= 100:
            print("Training and tagging model...")

            # Step 1: Export latest data
            from data.export_data import export_data_to_csv
            export_data_to_csv()

            # Step 2: Load data and preprocess
            from ml.preprocess import load_data, preprocess_data
            df = load_data("csv")
            X_train, X_test, y_train, y_test, scaler = preprocess_data(df)

            # Step 3: Train the model
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            model.fit(X_train, y_train)

            # Step 4: Save model and scaler
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            joblib.dump(model, os.path.join(BASE_DIR, "ml", "model.pkl"))
            joblib.dump(scaler, os.path.join(BASE_DIR, "ml", "scaler.pkl"))

            # Step 5: Tag data with the model
            from ml.tag_data import tag_data_with_model
            tag_data_with_model()

            # Step 6: Update metadata
            metadata.last_training_count = current_data_count
            metadata.save()
            
             # Update metadata
            metadata.last_training_count = current_data_count
            metadata.save() 

            print("Model trained and data tagged successfully.")
        else:
            print("Not enough new records for retraining.")
    except Exception as e:
        print(f"Error during training process: {e}")
