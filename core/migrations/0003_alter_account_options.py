# Generated by Django 4.1.3 on 2023-05-08 09:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_account_first_name_account_last_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='account',
            options={'permissions': [('is_hotel_manager', 'can manage reservation')], 'verbose_name': 'Account', 'verbose_name_plural': 'Accounts'},
        ),
    ]