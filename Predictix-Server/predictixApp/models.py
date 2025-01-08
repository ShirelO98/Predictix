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
    factory_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.machine_name
    
class ModelTrainingMetadata(models.Model):
    last_training_count = models.IntegerField(default=0)  
    last_trained_at = models.DateTimeField(auto_now=True)

class Factory(models.Model):
    admin_id = models.CharField(max_length=10)
    factory_id = models.CharField(max_length=10)
    factory_name = models.CharField(max_length=100)
    machines = models.ManyToManyField(Machine)

    def __str__(self):
        return self.factory_name