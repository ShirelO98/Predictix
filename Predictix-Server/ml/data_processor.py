import pandas as pd

class FactoryDataProcessor:
    def __init__(self, data):
        self.data = data
    
    def clean_data(self):
        """
        cleaning the data: removing duplicates and missing values.
        """
        self.data.dropna(inplace=True)
        return self

    def feature_engineering(self):
        """
        adding new features to the data.
        """
    
        self.data['machine_age_category'] = pd.cut(
            self.data['age'], 
            bins=[0, 3, 6, 10], 
            labels=['New', 'Medium', 'Old']
        )
        
        self.data = pd.get_dummies(
            self.data, 
            columns=['machine_type', 'manufacturer', 'machine_age_category']
        )
        return self
