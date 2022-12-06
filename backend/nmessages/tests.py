from rest_framework.test import APITestCase
from model_bakery import baker

from account.models import User
from nmessages.models import NMessage
from notifications.models import EnumNotificationType


class NMessagesAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    def test_create(self):
        # When
        self.client.force_authenticate(user=self.user)
        request_data = {
            'name': 'name',
            'data': {'channel': 'channel', 'message': 'message'},
            'notification_type': EnumNotificationType.SLACK
        }
        response = self.client.post('/api/message/', data=request_data, format='json')

        # Then
        self.assertEqual(response.status_code, 201)
        responded_channel = NMessage.objects.filter(
            notification_type=EnumNotificationType.SLACK
        ).last().data['channel']
        expected = request_data['data']['channel']
        self.assertEqual(responded_channel, expected)

    def test_invalid_type_create(self):
        self.client.force_authenticate(user=self.user)
        data = {'channel': 'channel', 'message': 'message',
                'notification_type': 'invalid'}
        response = self.client.post(
            '/api/message/',
            data=data
        )
        self.assertEqual(response.status_code, 400)

    def test_list(self):
        # Given

        # When
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/message/?projectId=1')

        # Then
        self.assertEqual(response.status_code, 200)
