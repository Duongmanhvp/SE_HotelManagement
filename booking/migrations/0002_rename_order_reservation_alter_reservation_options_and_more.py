# Generated by Django 4.1.3 on 2023-04-10 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_customer_name'),
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Order',
            new_name='Reservation',
        ),
        migrations.AlterModelOptions(
            name='reservation',
            options={'ordering': ['id'], 'verbose_name': 'Reservation', 'verbose_name_plural': 'Reservation'},
        ),
        migrations.RenameField(
            model_name='room',
            old_name='stock',
            new_name='no_room_available',
        ),
        migrations.RemoveField(
            model_name='room',
            name='slug',
        ),
        migrations.AddField(
            model_name='hotel',
            name='city',
            field=models.CharField(default='city', max_length=100),
        ),
        migrations.AddField(
            model_name='hotel',
            name='country',
            field=models.CharField(default='country', max_length=100),
        ),
    ]