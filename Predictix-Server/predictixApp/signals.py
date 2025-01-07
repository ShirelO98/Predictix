from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Machine
from ml.train_model import train_model_if_needed
from ml.tag_data import tag_data

@receiver(post_save, sender=Machine)
def check_and_train_model(sender, instance, created, **kwargs):
    if created: 
        train_model_if_needed()
        tag_data()
