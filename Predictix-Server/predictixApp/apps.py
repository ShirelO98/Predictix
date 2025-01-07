from django.apps import AppConfig

class PredictixAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'predictixApp'

    def ready(self):
        import predictixApp.signals 
