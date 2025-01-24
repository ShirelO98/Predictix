import pandas as pd

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
