from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_routes, name='get_routes'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.register, name='register'),
    path('user/', views.UserProfileView.as_view(), name='profile')
]