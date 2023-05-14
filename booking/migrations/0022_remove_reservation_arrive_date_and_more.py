# Generated by Django 4.1.3 on 2023-05-05 04:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0021_alter_reservation_arrive_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservation',
            name='arrive_date',
        ),
        migrations.RemoveField(
            model_name='reservation',
            name='no_of_days_stay',
        ),
        migrations.AddField(
            model_name='reservation',
            name='check_in',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='reservation',
            name='check_out',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]