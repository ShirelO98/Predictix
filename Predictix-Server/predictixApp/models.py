from django.db import models

class MachineHistory(models.Model):
    date = models.DateField() 
    machine = models.IntegerField()  
    machine_type = models.CharField(max_length=50) 
    manufacturer = models.CharField(max_length=50)  
    age = models.IntegerField() 
    last_maintenance_days = models.IntegerField()  
    total_maintenance_cost = models.FloatField()  
    temperature = models.FloatField()  
    pressure = models.FloatField()  
    vibration = models.FloatField() 
    energy_consumption = models.FloatField()  
    noise_level = models.FloatField() 
    humidity = models.FloatField()  
    operating_hours = models.IntegerField() 
    fault = models.BooleanField() 

    def __str__(self):
        return f"Machine {self.machine} on {self.date}"

    class Meta:
        verbose_name_plural = "Machine Histories"

class Factory(models.Model):
    factory_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    established_date = models.DateField()
    admin_id = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.name} ({self.factory_id})"


class Machine(models.Model):
    machine_id = models.IntegerField(unique=True)
    factories = models.ManyToManyField(Factory, related_name="machines")
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    manufacturer = models.CharField(max_length=100)
    installation_date = models.DateField()
    status = models.CharField(max_length=50, choices=[
        ('Operational', 'Operational'),
        ('Maintenance', 'Maintenance'),
        ('Faulty', 'Faulty'),
    ])
    location = models.CharField(max_length=255, null=True, blank=True)

    # Sensor data
    temperature = models.FloatField(null=True, blank=True)
    pressure = models.FloatField(null=True, blank=True)
    vibration = models.FloatField(null=True, blank=True)
    humidity = models.FloatField(null=True, blank=True)
    noise_level = models.FloatField(null=True, blank=True)

    prediction_status = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.machine_id})"

