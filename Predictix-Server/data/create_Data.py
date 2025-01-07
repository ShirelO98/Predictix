import csv
from datetime import datetime
from predictixApp.models import Machine

def load_data_from_csv():
    file_path = "data/machine_data.csv"  # הנתיב לקובץ ה-CSV
    with open(file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            Machine.objects.create(
                machine_id=row["MachineID"],
                machine_name=row["MachineName"],
                vibration=float(row["Vibration"]),
                temperature=int(row["Temperature"]),
                pressure=int(row["Pressure"]),
                status=row["Status"],
                last_maintenance_date=datetime.strptime(row["LastMaintenanceDate"], "%Y-%m-%d").date(),
                next_maintenance_date=datetime.strptime(row["NextMaintenanceDate"], "%Y-%m-%d").date(),
                up_time=int(row["UpTime"]),
                down_time=int(row["DownTime"]),
            )
    print("Data loaded successfully!")
