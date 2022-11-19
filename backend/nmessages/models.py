from django.db import models

from core.models import TimeStampedModel


class NMessage(TimeStampedModel):
    """Model definition for NMessages."""
    content = models.JSONField()
