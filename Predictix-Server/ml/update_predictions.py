import pandas as pd
from predictixApp.models import Machine

def update_prediction_status(model, factory_id):
    """
    update the prediction status of the machines in the factory.
    """
    machines = Machine.objects.filter(factories__id=factory_id)
    
    data = []
    machines_to_update = []
    
    for machine in machines:
        data.append({
            "machine_id": machine.machine_id,
            "temperature": machine.temperature,
            "pressure": machine.pressure,
            "vibration": machine.vibration,
            "humidity": machine.humidity,
            "noise_level": machine.noise_level,
            "age": (pd.Timestamp.now().year - machine.installation_date.year),
            "operating_hours": None,  
            "total_maintenance_cost": None,  
            "energy_consumption": None,  
            "last_maintenance_days": None  
        })
        machines_to_update.append(machine)
    
    df = pd.DataFrame(data)
    
    expected_columns = model.named_steps['preprocessor'].transformers_[0][2]
    for column in expected_columns:
        if column not in df.columns:
            df[column] = None  
    
    predictions = model.predict(df)
    
    for machine, prediction in zip(machines_to_update, predictions):
        machine.prediction_status = prediction
        machine.save()
