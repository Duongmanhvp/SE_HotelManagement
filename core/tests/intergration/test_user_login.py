from rest_framework.test import APIClient
from core.tests import base_tests

class UserLoginTestCase(base_tests.NewAccountTestCase):
    """
    """
    def setUp(self):
        super().setUp()

    def test_user_login(self):
        client = APIClient()
        result = client.post('http://127.0.0.1:8000/login/', {
            'email': self.email,
            'password': self.password
        }, format='vnd.api+json')

        self.assertEquals(result.status_code, 200)
        self.assertTrue('access' in result.json())
        self.assertTrue('refresh' in result.json())

    def tearDown(self):
        self.client.logout()
        super().tearDown()