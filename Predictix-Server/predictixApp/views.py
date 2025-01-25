from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import joblib
from django.db.models import Sum
from datetime import datetime, timedelta
from predictixApp.models import Machine, Factory
from django.shortcuts import get_object_or_404
from ml.update_predictions import update_prediction_status

def get_tagged_machines_by_factory(request, factory_id):
    try:
        factory = Factory.objects.get(id=factory_id)
        model_path = 'ml/models/factory_model.pkl'
        model = joblib.load(model_path)
        update_prediction_status(model, factory_id)
        machines = Machine.objects.filter(factories__id=factory_id)
        
        machines_data = [
            {
                "machine_id": machine.machine_id,
                "name": machine.name,
                "type": machine.type,
                "manufacturer": machine.manufacturer,
                "temperature": machine.temperature,
                "pressure": machine.pressure,
                "vibration": machine.vibration,
                "humidity": machine.humidity,
                "noise_level": machine.noise_level,
                "prediction_status": machine.prediction_status,
            }
            for machine in machines
        ]

        return JsonResponse({"factory_id": factory_id, "machines": machines_data}, safe=False)
    
    except Factory.DoesNotExist:
        return JsonResponse({"error": "Factory not found"}, status=404)
    

def alerts(request, factory_id):
    factory = get_object_or_404(Factory, id=factory_id)
    machines = factory.machines.all()
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

    return JsonResponse({"factory_id": factory_id, "machines": machines_data}, safe=False)

def overview(request, factory_id):
    factory = get_object_or_404(Factory, id=factory_id)
    machines = factory.machines.all()
    total_machines = machines.count()
    needs_maintenance_machines = machines.filter(status="Maintenance").count()

    return JsonResponse({
        "needs_maintenance_machines": needs_maintenance_machines,
        "total_machines": total_machines
    })