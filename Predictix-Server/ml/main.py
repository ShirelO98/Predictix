from ml.data_processor import FactoryDataProcessor
from ml.model_trainer import ModelTrainer
from ml.utils import load_data

def main():
    # Load and process data
    data_path = 'enhanced_factory_data.csv'
    raw_data = load_data(data_path)
    
    if raw_data is not None:
        processor = FactoryDataProcessor(data_path)
        processed_data = (processor
                          .clean_data()
                          .feature_engineering()
                          .get_processed_data())

        # Train and evaluate model
        trainer = ModelTrainer(processed_data)
        model = trainer.train_model()
        trainer.evaluate_model(model)

if __name__ == "__main__":
    main()
