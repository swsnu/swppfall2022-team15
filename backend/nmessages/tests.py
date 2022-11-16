from rest_framework.test import APITestCase
from model_bakery import baker

from account.models import User
from project.models import Project


class NMessagesAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    def test_create(self):
        # Given
        project = baker.make(Project)

        # When
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            '/api/message/',
            data={'project': project.id, 'content': 'test'}
        )

        # Then
        self.assertEqual(response.status_code, 201)

    def test_list(self):
        # Given

        # When
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/message/?projectId=1')

        # Then
        self.assertEqual(response.status_code, 200)
