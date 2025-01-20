from ml.preprocess import load_data, preprocess_data
from sklearn.metrics import classification_report, accuracy_score
import joblib

def evaluate_model():
    df = load_data("db")
    _, X_test, _, y_test, _ = preprocess_data(df)

    model = joblib.load("ml/model.pkl")
    predictions = model.predict(X_test)
    print("Evaluation Report:")
    print(classification_report(y_test, predictions))
