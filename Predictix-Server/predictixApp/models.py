from django.db import models

class Machine(models.Model):
    machine_id = models.CharField(max_length=10)
    machine_name = models.CharField(max_length=100)
    vibration = models.FloatField()
    temperature = models.IntegerField()
    pressure = models.IntegerField()
    status = models.CharField(max_length=20)
    last_maintenance_date = models.DateField()
    next_maintenance_date = models.DateField()
    up_time = models.IntegerField()
    down_time = models.IntegerField()

    def __str__(self):
        return self.machine_name
class ModelTrainingMetadata(models.Model):
    last_training_count = models.IntegerField(default=0)  
    last_trained_at = models.DateTimeField(auto_now=True)
