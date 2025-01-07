from preprocess import load_data, preprocess_data
from sklearn.ensemble import RandomForestClassifier
import joblib

def train_model(source="csv"):
    # Load and preprocess data
    df = load_data(source=source)
    X_train, X_test, y_train, y_test, scaler = preprocess_data(df)

    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save model and scaler
    joblib.dump(model, "ml/model.pkl")
    joblib.dump(scaler, "ml/scaler.pkl")

    print("Model trained and saved successfully!")
