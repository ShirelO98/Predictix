import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

class FactoryDataProcessor:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
    
    def clean_data(self):
        # הסרת שורות עם ערכים חסרים
        self.data.dropna(inplace=True)
        return self

    def feature_engineering(self):
        # יצירת מאפיינים נוספים
        self.data['machine_age_category'] = pd.cut(
            self.data['age'], 
            bins=[0, 3, 6, 10], 
            labels=['New', 'Medium', 'Old']
        )
        
        # המרת עמודות קטגוריאליות
        self.data = pd.get_dummies(
            self.data, 
            columns=['machine_type', 'manufacturer', 'machine_age_category']
        )
        return self

class ModelTrainer:
    def __init__(self, data):
        # הגדרת משתנים
        self.X = data.drop(['fault', 'date'], axis=1)
        self.y = data['fault']
        
        # חלוקה לסט אימון ובדיקה
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=0.2, random_state=42
        )
    
    def create_preprocessing_pipeline(self):
        # טיפול בעמודות מספריות וקטגוריאליות
        numeric_features = self.X.select_dtypes(include=['int64', 'float64']).columns
        
        numeric_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ])
        
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, numeric_features)
            ])
        
        return preprocessor
    
    def train_model(self):
        # יצירת צינור מלא של עיבוד ואימון
        pipeline = Pipeline(steps=[
            ('preprocessor', self.create_preprocessing_pipeline()),
            ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
        ])
        
        pipeline.fit(self.X_train, self.y_train)
        return pipeline
    
    def evaluate_model(self, model):
        # חיזוי ותוצאות
        y_pred = model.predict(self.X_test)
        
        print("Classification Report:")
        print(classification_report(self.y_test, y_pred))
        
        return model

def main():
    # זרימת עבודה שלמה
    processor = FactoryDataProcessor('enhanced_factory_data.csv')
    processed_data = (processor
                      .clean_data()
                      .feature_engineering()
                      .data)
    
    trainer = ModelTrainer(processed_data)
    model = trainer.train_model()
    trainer.evaluate_model(model)

if __name__ == "__main__":
    main()