from django.urls import reverse
from model_bakery import baker
from rest_framework import status
from rest_framework.test import APITestCase

from account.models import User
from notifications.models import EnumNotificationType
from targetusers.models import TargetUser


class TargetUserAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    def test_list(self):
        self.client.force_authenticate(self.user)
        response = self.client.get('/api/targetuser/')
        self.assertEqual(response.status_code, 200)

    def test_create(self):
        self.client.force_login(self.user)
        data = {'notification_type': EnumNotificationType.SLACK,
                'name': 'name', 'api_key': 'api-key'}
        response = self.client.post(reverse('targetuser-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TargetUser.objects.last().name, data['name'])

    def test_invalid_type_create(self):
        self.client.force_login(self.user)
        data = {'notification_type': '.',
                'name': 'name', 'api_key': 'api-key'}
        response = self.client.post(reverse('targetuser-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
