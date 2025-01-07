from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Machine
import joblib
from django.db.models import Sum
from datetime import datetime, timedelta

def get_machines(request):
    machines = Machine.objects.all().values()
    return JsonResponse(list(machines), safe=False)

def overview(request):
    today = datetime.now().date()
    next_week = today + timedelta(days=7)
    total_machines = Machine.objects.count()
    needs_maintenance_machines = Machine.objects.filter(status="Needs Maintenance").count()
    total_down_time = Machine.objects.filter(next_maintenance_date__range=(today, next_week)).aggregate(
        total_down_time=Sum("down_time")
    )["total_down_time"]

    response = {
        "total_machines": total_machines,
        "needs_maintenance_machines": needs_maintenance_machines,
        "down_time_hours_next_7_days": total_down_time or 0,  # אם אין נתונים, נחזיר 0
    }

    return JsonResponse(response)

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
