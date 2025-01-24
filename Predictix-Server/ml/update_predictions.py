import pandas as pd
from predictixApp.models import Machine

def update_prediction_status(model, factory_id):
    """
    עדכון שדה prediction_status של מכונות במפעל מסוים לפי חיזוי מודל
    """
    # שליפת המכונות של המפעל
    machines = Machine.objects.filter(factories__id=factory_id)
    
    # הכנת הנתונים
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
            "operating_hours": None,  # ערך ברירת מחדל
            "total_maintenance_cost": None,  # ערך ברירת מחדל
            "energy_consumption": None,  # ערך ברירת מחדל
            "last_maintenance_days": None  # ערך ברירת מחדל
        })
        machines_to_update.append(machine)
    
    # המרה ל-DataFrame
    df = pd.DataFrame(data)
    
    # בדיקת עמודות חסרות והוספתן
    expected_columns = model.named_steps['preprocessor'].transformers_[0][2]
    for column in expected_columns:
        if column not in df.columns:
            df[column] = None  # הוספת עמודות חסרות עם ערך ברירת מחדל
    
    # חיזוי סטטוסים עם המודל
    predictions = model.predict(df)
    
    # עדכון השדה prediction_status במסד הנתונים
    for machine, prediction in zip(machines_to_update, predictions):
        machine.prediction_status = prediction
        machine.save()
