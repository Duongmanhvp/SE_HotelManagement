# Generated by Django 4.1.3 on 2023-04-23 08:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_account_profile_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='account',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='account',
            name='phone_number',
        ),
    ]