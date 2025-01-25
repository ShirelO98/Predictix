import random
from predictixApp.models import Machine
from datetime import datetime

def simulate_sensor_changes():
    """
    function that simulates sensor changes for all machines.
    """
    machines = Machine.objects.all()
    
    for machine in machines:
        machine.temperature = simulate_sensor_value(machine.temperature, 20, 80)
        machine.pressure = simulate_sensor_value(machine.pressure, 0.5, 2.0)
        machine.vibration = simulate_sensor_value(machine.vibration, 0.1, 1.5)
        machine.humidity = simulate_sensor_value(machine.humidity, 30, 90)
        machine.noise_level = simulate_sensor_value(machine.noise_level, 50, 100)

        if simulate_fault():
            machine.prediction_status = 1
            machine.temperature += random.uniform(5, 10)
            machine.noise_level += random.uniform(10, 20)
        else:
            machine.prediction_status = 0

        machine.save()

def simulate_sensor_value(current_value, min_value, max_value):
    if current_value is None:
        current_value = random.uniform(min_value, max_value)
    else:
        current_value = max(min(current_value + random.uniform(-2, 2), max_value), min_value)
    return round(current_value, 2)

def simulate_fault():
    return random.random() < 0.1
