from django.urls import path
from . import views

urlpatterns = [
    path("getTaggedByFactory/<int:factory_id>/", views.get_tagged_machines_by_factory, name="get_tagged_machines_by_factory"),
    path("overview/", views.overview, name="overview"),
    path("alerts/", views.alerts, name="alerts"),
    path("scheduled-maintenance/", views.scheduled_maintenance, name="scheduled_maintenance"),
    path("critical-machines/", views.critical_machines, name="critical_machines"),
]