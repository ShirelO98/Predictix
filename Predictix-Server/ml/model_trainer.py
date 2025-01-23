from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

class ModelTrainer:
    def __init__(self, data):
        # Define features and labels
        self.X = data.drop(['fault', 'date'], axis=1)
        self.y = data['fault']

        # Split data into training and testing sets
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            self.X, self.y, test_size=0.2, random_state=42
        )

    def create_preprocessing_pipeline(self):
        # Handle numeric columns
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
        # Build a full pipeline for preprocessing and training
        pipeline = Pipeline(steps=[
            ('preprocessor', self.create_preprocessing_pipeline()),
            ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
        ])

        pipeline.fit(self.X_train, self.y_train)
        return pipeline

    def evaluate_model(self, model):
        # Make predictions and show evaluation results
        y_pred = model.predict(self.X_test)

        print("Classification Report:")
        print(classification_report(self.y_test, y_pred))

        return model
