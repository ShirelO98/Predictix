from django.urls import path
from . import views

urlpatterns = [
    path("machines/", views.get_machines, name="get_machines"),
    path("overview/", views.overview, name="overview"),
    path("alerts/", views.alerts, name="alerts"),
    path("scheduled-maintenance/", views.scheduled_maintenance, name="scheduled_maintenance"),
    path("critical-machines/", views.critical_machines, name="critical_machines"),
]