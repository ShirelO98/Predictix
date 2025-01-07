from predictixApp.models import Machine
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib
import pandas as pd
import os

def test_model_on_existing_data():
    try:
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        # Load model and scaler
        model = joblib.load(os.path.join(BASE_DIR, "ml", "model.pkl"))
        scaler = joblib.load(os.path.join(BASE_DIR, "ml", "scaler.pkl"))
        print("Model and scaler loaded successfully.")

        # Load data
        queryset = Machine.objects.all().values(
            "vibration", "temperature", "pressure", "up_time", "down_time"
        )
        if not queryset.exists():
            print("No data available for testing.")
            return

        df = pd.DataFrame(list(queryset))
        print(f"Data loaded: {df.shape[0]} rows")

        # Preprocess features
        features = scaler.transform(df[["vibration", "temperature", "pressure", "up_time", "down_time"]])
        print("Processed features:")
        print(features)

        # Make predictions
        predictions = model.predict(features)
        print("Predictions:")
        print(predictions)

        if predictions.size == 0:
            print("No predictions were made. Ensure the data is correct and sufficient.")
            return

        # Print a summary of predictions
        status_map = {0: "Operational", 1: "Needs Maintenance", 2: "Failed"}
        prediction_counts = pd.Series(predictions).map(status_map).value_counts()

        print("Prediction summary:")
        print(prediction_counts)

    except Exception as e:
        print(f"Error testing model: {e}")
