from model_bakery import baker
from rest_framework.test import APITestCase

from account.models import User


class TargetUserAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    def test_list(self):
        self.client.force_authenticate(self.user)
        response = self.client.get('/api/targetuser/')
        self.assertEqual(response.status_code, 200)
