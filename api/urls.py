from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverviews, name='overviews'),
    path('users/', views.getAllUsers, name='users'),
    path('users/<str:pk>/', views.getUser, name='query_user'),
    path('register/', views.register, name='register'),
]