from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Machine
import joblib
from django.http import JsonResponse

def get_machines(request):
    machines = Machine.objects.all().values()
    return JsonResponse(list(machines), safe=False)


def predict_failure(request):
    # Load model and scaler
    model = joblib.load("ml/model.pkl")
    scaler = joblib.load("ml/scaler.pkl")

    # Extract features from request
    features = [
        float(request.GET.get("vibration", 0)),
        float(request.GET.get("temperature", 0)),
        float(request.GET.get("pressure", 0)),
        float(request.GET.get("up_time", 0)),
        float(request.GET.get("down_time", 0)),
    ]

    # Preprocess and predict
    scaled_features = scaler.transform([features])
    prediction = model.predict(scaled_features)

    # Map prediction back to status
    status_map = {0: "Operational", 1: "Needs Maintenance", 2: "Failed"}
    predicted_status = status_map[int(prediction[0])]

    return JsonResponse({"predicted_status": predicted_status})
