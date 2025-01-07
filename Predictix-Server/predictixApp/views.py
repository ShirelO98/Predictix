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


def alerts(request):
    # Query machines with "Failed" status and convert to dictionaries
    failed_machines = list(
        Machine.objects.filter(status="Failed").values(
            "machine_id", "machine_name", "status", "vibration", "temperature", "pressure"
        )
    )

    # Query machines with critical metrics (e.g., vibration > 2.0, temperature > 100, pressure > 150)
    critical_machines = list(
        Machine.objects.filter(
            vibration__gt=2.0
        ).values(
            "machine_id", "machine_name", "vibration", "temperature", "pressure", "status"
        )
    ) + list(
        Machine.objects.filter(
            temperature__gt=100
        ).values(
            "machine_id", "machine_name", "vibration", "temperature", "pressure", "status"
        )
    ) + list(
        Machine.objects.filter(
            pressure__gt=150
        ).values(
            "machine_id", "machine_name", "vibration", "temperature", "pressure", "status"
        )
    )

    # Combine the two lists
    alerts = failed_machines + critical_machines

    # Return the data as JSON
    return JsonResponse(alerts, safe=False)

def scheduled_maintenance(request):
    # Calculate the date range for the next 7 days
    today = datetime.now().date()
    next_week = today + timedelta(days=7)

    # Filter machines with scheduled maintenance in the next 7 days
    machines = Machine.objects.filter(
        next_maintenance_date__range=(today, next_week)
    ).values(
        "machine_id", "machine_name", "status", "next_maintenance_date"
    )

    return JsonResponse(list(machines), safe=False)


def scheduled_maintenance(request):
    # Calculate the date range for the next 7 days
    today = datetime.now().date()
    next_week = today + timedelta(days=7)

    # Filter machines with scheduled maintenance in the next 7 days
    machines = Machine.objects.filter(
        next_maintenance_date__range=(today, next_week)
    ).values(
        "machine_id", "machine_name", "status", "next_maintenance_date"
    )

    return JsonResponse(list(machines), safe=False)


def critical_machines(request):
    # Filter machines in "Needs Maintenance" status and order by highest down_time
    machines = Machine.objects.filter(status="Needs Maintenance").order_by(
        "-down_time"
    )[:10]  # Get the top 10 machines with the highest down_time

    # Select specific fields to include in the response
    machines_data = machines.values(
        "machine_id", "machine_name", "status", "down_time", "vibration", "temperature", "pressure"
    )

    return JsonResponse(list(machines_data), safe=False)


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
