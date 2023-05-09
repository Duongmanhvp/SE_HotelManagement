from rest_framework.test import APITestCase, APIRequestFactory, APIClient
from rest_framework import status

from django.urls import reverse

from core.views import UserProfileView, LoginView
from core.test import base_test

class RoutingTestCase(APITestCase):
    
    def test_get_routes(self):
        response = self.client.get(reverse('get_routes'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(type(response.data), list)
        self.assertEqual(response.data[0], {
            "Endpoint": "/register/",
            "method": "POST",
            "header": None,
            "body": {
                "username": "str",
                "email": "str",
                "password": "str",
                "re_password": "str"
            },
            "description": "register new user"
        })

class LoginTestCase(
    base_test.NewUserTestCase,
    APITestCase
):
    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.view = LoginView.as_view()
        self.url = reverse('login')
        super().setUp()
    
    def test_user_login(self):

        data = {
            "email": self.email,
            "password": self.password
        }

        request = self.factory.post(self.url, data=data, content_type='application/json')

        response = self.view(request)
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)



class UserProfileTestCase(
    base_test.NewUserTestCase,
    APITestCase
    ):

    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.view = UserProfileView.as_view()
        self.urls = reverse('profile')
        self.super().setUp()

    def test_get_profile(self):
        pass

    # def test_update_profile(self):
    #     ...