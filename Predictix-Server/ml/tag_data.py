import os
import pandas as pd
import joblib
from predictixApp.models import Machine
from ml.preprocess import preprocess_data

def tag_data_with_model(file_path="data/machine_data.csv"):
    try:
        # Load the model and scaler
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        model_path = os.path.join(BASE_DIR, "ml", "model.pkl")
        scaler_path = os.path.join(BASE_DIR, "ml", "scaler.pkl")

        if not os.path.exists(model_path) or not os.path.exists(scaler_path):
            print("Error: Model or scaler not found. Train the model first.")
            return

        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)

        print("Model and scaler loaded successfully.")

        # Load data from CSV
        df = pd.read_csv(file_path)
        print(f"Data loaded from {file_path}")

        # Preprocess the data
        features = df[["vibration", "temperature", "pressure", "up_time", "down_time"]]
        scaled_features = scaler.transform(features)

        # Predict statuses
        predictions = model.predict(scaled_features)
        status_map = {0: "Operational", 1: "Needs Maintenance", 2: "Failed"}
        df["predicted_status"] = [status_map[pred] for pred in predictions]

        print("Data tagged with predictions.")

        # Update the database with predictions
        print("Updating database with tagged data...")
        for _, row in df.iterrows():
            Machine.objects.filter(machine_id=row["machine_id"]).update(
                vibration=row["vibration"],
                temperature=row["temperature"],
                pressure=row["pressure"],
                up_time=row["up_time"],
                down_time=row["down_time"],
                status=row["predicted_status"],
            )

        print("Database updated successfully.")

    except Exception as e:
        print(f"Error during tagging process: {e}")
