# Generated by Django 5.1.4 on 2025-01-07 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('predictixApp', '0002_machine_delete_mac'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModelTrainingMetadata',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_training_count', models.IntegerField(default=0)),
                ('last_trained_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
