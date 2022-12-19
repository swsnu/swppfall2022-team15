from enum import Enum

from django.db import models

from account.models import User


class Project(models.Model):
    class ProjectType(str, Enum):
        ORGANIZATION = 'organization'
        INDIVIDUAL = 'individual'

    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_type = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
