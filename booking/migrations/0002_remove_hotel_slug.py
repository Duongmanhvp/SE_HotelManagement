# Generated by Django 4.1.3 on 2023-04-23 05:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hotel',
            name='slug',
        ),
    ]