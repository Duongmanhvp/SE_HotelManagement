from django.test import SimpleTestCase
from django.urls import reverse, resolve
from core.views import LoginView, UserProfileView, register

class URLsTestCase(SimpleTestCase):

    def test_register_url_is_resolved(self):
        urls = reverse('register')
        self.assertEquals(resolve(urls).func, register)

    def test_login_view_url_is_resolved(self):
        urls = reverse('login')
        self.assertEquals(resolve(urls).func.view_class, LoginView)

    def test__url_is_resolved(self):
        urls = reverse('profile')
        self.assertEquals(resolve(urls).func.view_class, UserProfileView)