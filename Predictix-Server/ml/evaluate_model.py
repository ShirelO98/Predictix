from preprocess import load_data, preprocess_data
from sklearn.metrics import classification_report, accuracy_score
import joblib

def evaluate_model(source="csv"):
    # Load data
    df = load_data(source=source)
    X_train, X_test, y_train, y_test, _ = preprocess_data(df)

    # Load model
    model = joblib.load("ml/model.pkl")

    # Predictions
    y_pred = model.predict(X_test)

    # Evaluation
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("\nClassification Report:\n", classification_report(y_test, y_pred))
