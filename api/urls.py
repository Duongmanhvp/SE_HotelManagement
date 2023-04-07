from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverviews, name='overviews'),

    # user controller api
    path('users/', views.getAllUsers, name='users'),
    path('users/<str:pk>/', views.getUser, name='query_user'),
    path('register/', views.register, name='register'),

    # booking interface controller api
    # path('hotel/',)

    # billing controller api

    # finnancial admin controller api
]