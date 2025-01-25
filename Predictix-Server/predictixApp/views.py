from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import joblib
from django.db.models import Sum
from datetime import datetime, timedelta
from predictixApp.models import Machine, Factory, MachineThreshold
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
    
    machines_data = []
    for machine in machines:
        if hasattr(machine, 'thresholds'):
            thresholds = machine.thresholds  
            sensors = {
                "temperature": {"value": machine.temperature, "threshold": thresholds.temperature_threshold, "alert": machine.temperature > thresholds.temperature_threshold},
                "pressure": {"value": machine.pressure, "threshold": thresholds.pressure_threshold, "alert": machine.pressure > thresholds.pressure_threshold},
                "vibration": {"value": machine.vibration, "threshold": thresholds.vibration_threshold, "alert": machine.vibration > thresholds.vibration_threshold},
                "humidity": {"value": machine.humidity, "threshold": thresholds.humidity_threshold, "alert": machine.humidity > thresholds.humidity_threshold},
                "noise_level": {"value": machine.noise_level, "threshold": thresholds.noise_level_threshold, "alert": machine.noise_level > thresholds.noise_level_threshold},
            }
        else:
            sensors = {
                "temperature": {"value": machine.temperature, "threshold": None, "alert": None},
                "pressure": {"value": machine.pressure, "threshold": None, "alert": None},
                "vibration": {"value": machine.vibration, "threshold": None, "alert": None},
                "humidity": {"value": machine.humidity, "threshold": None, "alert": None},
                "noise_level": {"value": machine.noise_level, "threshold": None, "alert": None},
            }
        
        machines_data.append({"name": machine.name, "sensors": sensors})
    
    return JsonResponse({"factory_id": factory_id, "machines": machines_data}, safe=False)