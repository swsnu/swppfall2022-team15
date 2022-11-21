# Generated by Django 4.1.2 on 2022-11-21 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0002_alter_notificationgroup_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('SENDING', 'Sending'), ('SUCCESS', 'Success'), ('PARTIAL_SUCCESS', 'Partial Success'), ('FAILURE', 'Failure')], max_length=20),
        ),
    ]