from django.urls import path
from . import views

urlpatterns = [
    path("getTaggedByFactory/<int:factory_id>/", views.get_tagged_machines_by_factory, name="get_tagged_machines_by_factory"),
    path("alerts/<int:factory_id>/", views.alerts, name="alerts"),
    path("update_thresholds/<int:machine_id>/", views.update_thresholds, name="update_thresholds"),
    path("getAllEdges/<int:factory_id>/", views.get_edges, name="get_tagged_machines_by_factory"),
    # path("flows/<int:factory_id>/", views.get_flows_by_factory, name="get_flows_by_factory"),
    
]