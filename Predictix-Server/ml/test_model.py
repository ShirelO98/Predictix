from predictixApp.models import Machine
import joblib
import pandas as pd
from sklearn.metrics import classification_report

def test_general_model():
    try:
        # Load the model and scaler
        model = joblib.load("ml/model.pkl")
        scaler = joblib.load("ml/scaler.pkl")

        # Load data from the database
        queryset = Machine.objects.all().values(
            "vibration", "temperature", "pressure", "up_time", "down_time", "status"
        )
        df = pd.DataFrame(list(queryset))

        if df.empty:
            print("No data available for testing.")
            return

        # Ensure all statuses are mapped to numbers
        df["status"] = df["status"].map({"Operational": 0, "Needs Maintenance": 1, "Failed": 2})

        # Check for unmapped statuses
        if df["status"].isnull().any():
            raise ValueError("Found unmapped statuses in the 'status' column.")

        # Preprocess data
        features = df[["vibration", "temperature", "pressure", "up_time", "down_time"]]
        labels = df["status"]
        scaled_features = scaler.transform(features)

        # Predictions
        predictions = model.predict(scaled_features)

        # Evaluation
        print("Prediction Results:")
        print(classification_report(labels, predictions, target_names=["Operational", "Needs Maintenance", "Failed"]))
    except Exception as e:
        print(f"Error during model testing: {e}")
