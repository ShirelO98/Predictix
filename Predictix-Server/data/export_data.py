import pandas as pd
from predictixApp.models import Machine

def export_data_to_csv(file_path="data/machine_data.csv"):
    try:
        # Export data from database
        queryset = Machine.objects.all().values(
            "machine_id",
            "vibration",
            "temperature",
            "pressure",
            "up_time",
            "down_time",
            "status",
            "last_maintenance_date",
            "factory_id"
        )
        df = pd.DataFrame(list(queryset))

        # Clean column names
        df.columns = [col.replace(" ", "_") for col in df.columns]

        # Save to CSV
        df.to_csv(file_path, index=False)
        print(f"Data exported to {file_path} successfully.")
    except Exception as e:
        print(f"Error during data export: {e}")
