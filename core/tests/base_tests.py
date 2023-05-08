from django.test import TestCase
from faker import Faker

from core.models import Account

class NewAccountTestCase(TestCase):
    """
    Account test
    """

    def setUp(self):
        faker = Faker()
        self.username = faker.user_name()
        self.password = faker.password()
        self.email = faker.email()
        self.first_name = faker.first_name()
        self.last_name = faker.last_name()
        self.user = Account.objects.create_user(username=self.username,
                                                    email=self.email,
                                                    password=self.password,
                                                    first_name=self.first_name,
                                                    last_name=self.last_name)
        
    def tearDown(self):
        self.user.delete()
