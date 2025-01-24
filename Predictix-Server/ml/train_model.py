import joblib
from ml.data_processor import FactoryDataProcessor
from ml.model_trainer import ModelTrainer

def train_and_save_model(data_path, model_path):
    # עיבוד הנתונים
    processor = FactoryDataProcessor(data_path)
    processed_data = processor.clean_data().feature_engineering().data
    
    # אימון המודל
    trainer = ModelTrainer(processed_data)
    model = trainer.train_model()
    trainer.evaluate_model(model)
    
    # שמירת המודל לקובץ
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    data_path = 'data/enhanced_factory_data.csv'  # נתיב לקובץ הנתונים
    model_path = 'ml/models/factory_model.pkl'  # נתיב לשמירת המודל
    train_and_save_model(data_path, model_path)
