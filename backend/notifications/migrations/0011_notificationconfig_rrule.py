# Generated by Django 4.1.2 on 2022-12-08 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0010_alter_notificationconfig_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='notificationconfig',
            name='rrule',
            field=models.TextField(null=True),
        ),
    ]
