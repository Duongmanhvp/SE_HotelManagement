# Generated by Django 4.1.3 on 2023-04-27 14:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='arrive_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 4, 27, 21, 55, 30, 350222)),
        ),
    ]