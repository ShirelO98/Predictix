import pandas as pd

class FactoryDataProcessor:
    def __init__(self, data):
        """
        data: DataFrame שמכיל את הנתונים.
        """
        self.data = data
    
    def clean_data(self):
        """
        ניקוי נתונים: הסרת שורות עם ערכים חסרים.
        """
        self.data.dropna(inplace=True)
        return self

    def feature_engineering(self):
        """
        הנדסת תכונות: הוספת עמודות חדשות והמרת עמודות קטגוריאליות.
        """
        # הוספת קטגוריות לגיל המכונה
        self.data['machine_age_category'] = pd.cut(
            self.data['age'], 
            bins=[0, 3, 6, 10], 
            labels=['New', 'Medium', 'Old']
        )
        
        # המרת עמודות קטגוריאליות לעמודות בינאריות
        self.data = pd.get_dummies(
            self.data, 
            columns=['machine_type', 'manufacturer', 'machine_age_category']
        )
        return self
