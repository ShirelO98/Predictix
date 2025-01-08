from django.contrib import admin
from .models import Machine
from .models import ModelTrainingMetadata
from .models import Factory

@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    list_display = ("machine_id", "machine_name", "status", "up_time", "down_time")

@admin.register(ModelTrainingMetadata)
class ModelTrainingMetadataAdmin(admin.ModelAdmin):
    list_display = ("last_training_count", "last_trained_at")

@admin.register(Factory)
class FactoryAdmin(admin.ModelAdmin):
    list_display = ("factory_id", "factory_name", "admin_id")
    filter_horizontal = ("machines",) 
