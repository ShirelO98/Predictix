from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import joblib
from django.db.models import Sum
from datetime import datetime, timedelta
from predictixApp.models import Machine, Factory
from django.shortcuts import get_object_or_404

def get_tagged_machines_by_factory(request, factory_id):
    try:
        # שליפת המפעל לפי factory_id
        factory = Factory.objects.get(id=factory_id)
        
        # שליפת המכונות המשויכות למפעל זה
        machines = factory.machines.all()  # קשר ManyToMany
        
        # הכנת הנתונים לתגובה
        machines_data = [
            {
                "machine_id": machine.machine_id,
                "name": machine.name,
                "type": machine.type,
                "manufacturer": machine.manufacturer,
                "prediction_status": machine.prediction_status,
            }
            for machine in machines
        ]

        return JsonResponse({"factory_id": factory_id, "machines": machines_data}, safe=False)

    except Factory.DoesNotExist:
        return JsonResponse({"error": "Factory not found"}, status=404)
    

def alerts(request, factory_id):
    # שליפת המפעל לפי factory_id
    factory = get_object_or_404(Factory, id=factory_id)

    # שליפת כל המכונות שקשורות למפעל זה
    machines = factory.machines.all()

    # יצירת רשימה של מכונות עם המידע הנדרש
    machines_data = [
        {
            "name": machine.name,
            "sensors": {
                "temperature": machine.temperature,
                "pressure": machine.pressure,
                "vibration": machine.vibration,
                "humidity": machine.humidity,
                "noise_level": machine.noise_level,
            }
        }
        for machine in machines
    ]

    # החזרת נתונים בפורמט JSON
    return JsonResponse({"factory_id": factory_id, "machines": machines_data}, safe=False)