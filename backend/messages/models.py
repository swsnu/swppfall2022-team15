from django.db import models

from core.models import TimeStampedModel


# Create your models here.

class NMessage(TimeStampedModel):
    """Model definition for NMessages."""
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE)
    content = models.TextField()

