from django.apps import AppConfig

class PredictixAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'predictixApp'

    def ready(self):
        """
        function to start the sensor update task when the app is ready.
        """
        from .tasks import start_sensor_update_task
        start_sensor_update_task()
