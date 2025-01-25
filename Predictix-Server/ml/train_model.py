import joblib
import pandas as pd
from ml.data_processor import FactoryDataProcessor
from ml.model_trainer import ModelTrainer
from predictixApp.models import MachineHistory, Machine

def fetch_data_from_machine_history():
    records = Machine.objects.all()
    
    data = []
    for record in records:
        data.append({
            "date": record.installation_date,
            "machine_id": record.machine_id,
            "temperature": record.temperature,
            "pressure": record.pressure,
            "vibration": record.vibration,
            "humidity": record.humidity,
            "noise_level": record.noise_level,
            "age": (pd.Timestamp.now().year - record.installation_date.year),
            "fault": record.prediction_status
        })
    
    df = pd.DataFrame(data)
    
    df = df.drop(columns=['machine_id'], errors='ignore')
    
    return df

def train_and_save_model_from_db(model_path):
    """
    training the model and saving it to a file.
    """
    data = fetch_data_from_machine_history()
    
    processor = FactoryDataProcessor(data)
    processed_data = processor.clean_data().feature_engineering().data
    
    trainer = ModelTrainer(processed_data)
    model = trainer.train_model()
    trainer.evaluate_model(model)
    
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    model_path = 'ml/models/factory_model.pkl'
    train_and_save_model_from_db(model_path)
