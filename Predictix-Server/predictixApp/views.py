from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import joblib
from django.db.models import Sum
from datetime import datetime, timedelta
from predictixApp.models import Machine, Factory, MachineThreshold, Edge
from django.shortcuts import get_object_or_404
from ml.update_predictions import update_prediction_status
from django.views.decorators.csrf import csrf_exempt
import json

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
                "temperature": {"value": machine.temperature, "threshold": thresholds.temperature_threshold},
                "pressure": {"value": machine.pressure, "threshold": thresholds.pressure_threshold},
                "vibration": {"value": machine.vibration, "threshold": thresholds.vibration_threshold},
                "humidity": {"value": machine.humidity, "threshold": thresholds.humidity_threshold},
                "noise_level": {"value": machine.noise_level, "threshold": thresholds.noise_level_threshold},
            }
        else:
            sensors = {
                "temperature": {"value": machine.temperature, "threshold": None},
                "pressure": {"value": machine.pressure, "threshold": None},
                "vibration": {"value": machine.vibration, "threshold": None},
                "humidity": {"value": machine.humidity, "threshold": None},
                "noise_level": {"value": machine.noise_level, "threshold": None},
            }
        
        # הוספת machine_id לרשומה
        machines_data.append({
            "machine_id": machine.machine_id,
            "name": machine.name,
            "sensors": sensors
        })
    
    return JsonResponse({"factory_id": factory_id, "machines": machines_data}, safe=False)


@csrf_exempt
def update_thresholds(request, machine_id):
    if request.method == "POST":
        try:

            machine = get_object_or_404(Machine, id=machine_id)
            thresholds = machine.thresholds  

            data = json.loads(request.body)
            temperature_threshold = data.get("temperature_threshold", thresholds.temperature_threshold)
            pressure_threshold = data.get("pressure_threshold", thresholds.pressure_threshold)
            vibration_threshold = data.get("vibration_threshold", thresholds.vibration_threshold)
            humidity_threshold = data.get("humidity_threshold", thresholds.humidity_threshold)
            noise_level_threshold = data.get("noise_level_threshold", thresholds.noise_level_threshold)

         
            thresholds.temperature_threshold = temperature_threshold
            thresholds.pressure_threshold = pressure_threshold
            thresholds.vibration_threshold = vibration_threshold
            thresholds.humidity_threshold = humidity_threshold
            thresholds.noise_level_threshold = noise_level_threshold
            thresholds.save()

            return JsonResponse({
                "message": "Thresholds updated successfully.",
                "updated_thresholds": {
                    "temperature_threshold": thresholds.temperature_threshold,
                    "pressure_threshold": thresholds.pressure_threshold,
                    "vibration_threshold": thresholds.vibration_threshold,
                    "humidity_threshold": thresholds.humidity_threshold,
                    "noise_level_threshold": thresholds.noise_level_threshold,
                }
            }, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method. Use POST."}, status=405)


def get_edges(request, factory_id):
    """
    Retrieve edges for a specific factory in reverse order.
    """
    try:
        # Get the factory by integer ID
        factory = get_object_or_404(Factory, id=factory_id)
        
        # Fetch edges related to this factory and reverse order
        edges = Edge.objects.filter(factory=factory).select_related("head", "source", "target").order_by("-id")

        edges_data = [
            {
                "id": edge.id,
                "factory_id": edge.factory.id,  
                "head": f"{edge.head.machine_id:02}",
                "source": f"{edge.source.machine_id:02}",
                "target": f"{edge.target.machine_id:02}"
            }
            for edge in edges
        ]

        return JsonResponse({"edges": edges_data}, safe=False, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

# def get_flows_by_factory(request, factory_id):
#     """
#     Retrieve all flows (edges) grouped by head machine for a given factory.
#     """
#     try:
#         # Get the factory
#         factory = get_object_or_404(Factory, id=factory_id)

#         # Fetch all edges related to this factory
#         edges = Edge.objects.filter(factory=factory).select_related("head", "source", "target")

#         # Group edges by head machine
#         flows = {}
#         for edge in edges:
#             head_id = f"M{edge.head.machine_id:03}"
            
#             if head_id not in flows:
#                 flows[head_id] = []

#             flows[head_id].append({
#                 "source": f"M{edge.source.machine_id:03}",
#                 "target": f"M{edge.target.machine_id:03}"
#             })

#         return JsonResponse({"factory_id": factory.id, "flows": flows}, safe=False, status=200)

#     except Exception as e:
#         return JsonResponse({"error": str(e)}, status=500)
