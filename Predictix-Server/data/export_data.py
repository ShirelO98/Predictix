import pandas as pd
from predictixApp.models import Machine

def export_data_to_csv(output_path="data/machine_data.csv"):
    queryset = Machine.objects.all().values(
        "machine_id", "machine_name", "vibration", "temperature",
        "pressure", "status", "last_maintenance_date",
        "next_maintenance_date", "up_time", "down_time"
    )
    df = pd.DataFrame(list(queryset))
    df.to_csv(output_path, index=False)
    print(f"Data exported to {output_path}")
