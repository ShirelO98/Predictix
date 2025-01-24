from predictixApp.models import Machine
import pandas as pd

def update_prediction_status(model, factory_id):
    # שליפת המכונות שקשורות למפעל
    machines = Machine.objects.filter(factories__id=factory_id)
    data = []

    for machine in machines:
        # הוספת הנתונים למערך
        data.append({
            'temperature': machine.temperature,
            'pressure': machine.pressure,
            'vibration': machine.vibration,
            'humidity': machine.humidity,
            'noise_level': machine.noise_level,
            'age': (pd.Timestamp.now().year - machine.installation_date.year),
        })
    
    # המרה ל-DataFrame
    df = pd.DataFrame(data)
    
    # חיזוי על ידי המודל
    predictions = model.predict(df)
    
    # עדכון הסטטוס במסד הנתונים
    for machine, prediction in zip(machines, predictions):
        machine.prediction_status = prediction
        machine.save()
