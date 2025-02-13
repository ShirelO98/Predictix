# Generated by Django 5.1.4 on 2025-01-23 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('predictixApp', '0002_machinehistory_remove_factory_machines_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('machine_id', models.CharField(max_length=20, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=50)),
                ('manufacturer', models.CharField(max_length=100)),
                ('installation_date', models.DateField()),
                ('status', models.CharField(choices=[('Operational', 'Operational'), ('Maintenance', 'Maintenance'), ('Faulty', 'Faulty')], max_length=50)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('temperature', models.FloatField(blank=True, null=True)),
                ('pressure', models.FloatField(blank=True, null=True)),
                ('vibration', models.FloatField(blank=True, null=True)),
                ('humidity', models.FloatField(blank=True, null=True)),
                ('noise_level', models.FloatField(blank=True, null=True)),
            ],
        ),
    ]
