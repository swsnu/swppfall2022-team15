# Generated by Django 4.1.2 on 2022-11-19 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='data',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
