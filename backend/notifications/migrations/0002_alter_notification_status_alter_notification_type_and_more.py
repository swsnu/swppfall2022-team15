# Generated by Django 4.1.3 on 2022-11-08 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notification',
            name='status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('SENDING', 'Sending'), ('SUCCESS', 'Success'), ('PARTIAL_SUCCESS', 'Partial Success'), ('FAILURE', 'Failure')], max_length=20),
        ),
        migrations.AlterField(
            model_name='notification',
            name='type',
            field=models.CharField(choices=[('EMAIL', 'Email'), ('SMS', 'Sms'), ('API', 'Api')], max_length=20),
        ),
        migrations.AlterField(
            model_name='notificationlog',
            name='status',
            field=models.CharField(choices=[('EMAIL', 'Email'), ('SMS', 'Sms'), ('API', 'Api')], max_length=20),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('SENDING', 'Sending'), ('SUCCESS', 'Success'), ('PARTIAL_SUCCESS', 'Partial Success'), ('FAILURE', 'Failure')], max_length=20),
        ),
    ]
