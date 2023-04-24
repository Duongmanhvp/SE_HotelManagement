from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.register, name= 'register'),
    path('core_route/', views.get_routes, name='core route'),
    # path('init',views.create_bulk_user, name='init')
]