# Generated by Django 4.1.2 on 2022-11-23 07:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0006_remove_notification_notification_config'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='reservation',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='notifications.reservation'),
        ),
    ]
