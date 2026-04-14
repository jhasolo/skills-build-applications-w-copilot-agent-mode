from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import AppUser


class ApiRootTests(APITestCase):
    def test_api_root_returns_collection_links(self):
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)


class AppUserTests(APITestCase):
    def test_create_user(self):
        url = reverse('user-list')
        payload = {
            'name': 'Bruce Wayne',
            'email': 'batman@dc.com',
            'team': 'dc',
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AppUser.objects.count(), 1)
        self.assertEqual(AppUser.objects.get().email, payload['email'])
