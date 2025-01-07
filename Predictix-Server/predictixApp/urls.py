from django.urls import path
from . import views

urlpatterns = [
    path("machines/", views.get_machines, name="get_machines"),
    path("overview/", views.overview, name="overview"),
]