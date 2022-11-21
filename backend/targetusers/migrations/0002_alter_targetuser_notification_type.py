# Generated by Django 4.1.2 on 2022-11-21 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('targetusers', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='targetuser',
            name='notification_type',
            field=models.CharField(choices=[('HTTP', 'Http'), ('SLACK', 'Slack'), ('EMAIL', 'Email'), ('SMS', 'Sms')], max_length=32),
        ),
    ]
