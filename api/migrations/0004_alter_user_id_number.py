# Generated by Django 4.1.7 on 2023-03-27 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_hotel_service_rename_updated_user_last_updated_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id_number',
            field=models.IntegerField(default=0),
        ),
    ]
