from django.urls import reverse

from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from core.models import Account

class RoutingTestCase(APITestCase):
    
    def test_get_routes(self):
        response = self.client.get(reverse('get_routes'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(type(response.data), list)

class LoginTestCase(
    APITestCase
):  
    def setUp(self) -> None:
        self.user = Account.objects.create_user(username='user', email='user@foo.com', password='pass')
        self.user.is_verified = True
        self.user.is_active = True
        
        self.user.save()

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        print(self.user.auth)

