from django.urls import path

from . import views

urlpatterns = [
    path('import/', views.create_bulk_data, name= 'data'),
]