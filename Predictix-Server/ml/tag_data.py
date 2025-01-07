from predictixApp.models import Machine
import joblib

def tag_data():
    # Load model and scaler
    model = joblib.load("ml/model.pkl")
    scaler = joblib.load("ml/scaler.pkl")

    # Fetch data without updated status
    machines = Machine.objects.all()
    for machine in machines:
        # Extract features
        features = [
            machine.vibration,
            machine.temperature,
            machine.pressure,
            machine.up_time,
            machine.down_time,
        ]

        # Preprocess and predict
        scaled_features = scaler.transform([features])
        prediction = model.predict(scaled_features)[0]

        # Map prediction to status
        status_map = {0: "Operational", 1: "Needs Maintenance", 2: "Failed"}
        predicted_status = status_map[int(prediction)]

        # Update the machine status
        machine.status = predicted_status
        machine.save()

    print("All data has been tagged successfully.")
