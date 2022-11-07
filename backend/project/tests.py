from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from account.models import User
from project.models import Project


class ProjectTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user('test@test.com', 'test')
        self.projects = [
            Project.objects.create(
                name='project1',
                user=self.user,
                project_type=Project.ProjectType.INDIVIDUAL
            ),
            Project.objects.create(
                name='project2',
                user=self.user,
                project_type=Project.ProjectType.INDIVIDUAL
            ),
            Project.objects.create(
                name='project3',
                user=self.user,
                project_type=Project.ProjectType.INDIVIDUAL
            )
        ]

    def test_list_project(self):
        url = reverse('project-list')
        self.client.force_login(self.user)
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 3)

        user = User.objects.create_user('test2@test.com', 'test')
        self.client.force_login(user)
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 0)

    def test_create_project(self):
        url = reverse('project-list')
        self.client.force_login(self.user)
        resp = self.client.post(url, data={
            'name': 'new project',
            'project_type': Project.ProjectType.INDIVIDUAL.value
        })
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Project.objects.filter(user=self.user, name='new project').exists())
