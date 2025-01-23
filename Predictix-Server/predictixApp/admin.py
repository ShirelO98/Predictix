from django.contrib import admin
from .models import MachineHistory
from .models import Factory, Machine

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
