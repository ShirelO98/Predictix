import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def load_data(source="db", file_path="data/machine_data.csv"):
    if source == "csv":
        df = pd.read_csv(file_path)
    elif source == "db":
        from predictixApp.models import Machine
        queryset = Machine.objects.all().values(
            "vibration", "temperature", "pressure", "up_time", "down_time", "status"
        )
        df = pd.DataFrame(list(queryset))
    else:
        raise ValueError("Invalid source. Use 'csv' or 'db'.")
    return df

def preprocess_data(df):
    # Handle missing values
    df = df.dropna()

    # Ensure all statuses are mapped to numbers
    df["status"] = df["status"].map({"Operational": 0, "Needs Maintenance": 1, "Failed": 2})

    # Check if there are any unmapped statuses
    if df["status"].isnull().any():
        raise ValueError("Found unmapped statuses in the 'status' column.")

    # Features and labels
    X = df[["vibration", "temperature", "pressure", "up_time", "down_time"]]
    y = df["status"]

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Normalize data
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    return X_train, X_test, y_train, y_test, scaler
