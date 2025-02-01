from django.contrib import admin
from .models import MachineHistory
from .models import Factory, Machine, MachineThreshold, Edge

@admin.register(MachineHistory)
class MachineHistoryAdmin(admin.ModelAdmin):
    list_display = ('date', 'machine', 'machine_type', 'manufacturer', 'age', 'last_maintenance_days', 'total_maintenance_cost', 'fault')
    list_filter = ('machine_type', 'manufacturer', 'fault', 'date')
    search_fields = ('machine', 'manufacturer', 'machine_type')
    ordering = ('-date',)

@admin.register(Factory)
class FactoryAdmin(admin.ModelAdmin):
    list_display = ('factory_id', 'name', 'location', 'established_date', 'admin_id')
    search_fields = ('factory_id', 'name', 'location')
    ordering = ('-established_date',)


@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    list_display = ('machine_id', 'name', 'type', 'manufacturer', 'status', 'installation_date')
    list_filter = ('type', 'manufacturer', 'status', 'factories')
    search_fields = ('machine_id', 'name', 'manufacturer')
    ordering = ('-installation_date',)

@admin.register(MachineThreshold)
class MachineThresholdAdmin(admin.ModelAdmin):
    list_display = (
        "machine",
        "temperature_threshold",
        "pressure_threshold",
        "vibration_threshold",
        "humidity_threshold",
        "noise_level_threshold",
    )

@admin.register(Edge)
class EdgeAdmin(admin.ModelAdmin):
    list_display = ("factory", "head", "source", "target")
    search_fields = ("factory__name", "head__name", "source__name", "target__name")