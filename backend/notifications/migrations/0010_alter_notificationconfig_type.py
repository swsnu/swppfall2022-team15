# Generated by Django 4.1.2 on 2022-12-05 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0009_alter_notification_request_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificationconfig',
            name='type',
            field=models.CharField(choices=[('WEBHOOK', 'Webhook'), ('SLACK', 'Slack'), ('EMAIL', 'Email'), ('SMS', 'Sms')], max_length=20),
        ),
    ]
