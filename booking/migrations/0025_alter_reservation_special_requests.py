# Generated by Django 4.1.3 on 2023-05-05 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0024_room_activate_date_room_deactivate_date_room_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='special_requests',
            field=models.TextField(blank=True, default='', max_length=1000),
        ),
    ]
