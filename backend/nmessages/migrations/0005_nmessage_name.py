# Generated by Django 4.1.2 on 2022-12-05 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nmessages', '0004_alter_nmessage_notification_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='nmessage',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
