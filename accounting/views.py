from django.shortcuts import render
import os
from hotel_management import settings
from django.contrib.auth.hashers import make_password
import csv

from booking.models import Reservation
from random import randint
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response

class HotelManagerView():
    pass

@api_view(['POST'])
def create_bulk_user(request):
    with open(os.path.join(settings.BASE_DIR,'static/test_hotel_data.csv')) as f:
        reader = csv.reader(f)
        for row in reader:
            if row[8] != 'star_rating':
                hotel, created = Reservation.objects.get_or_create(
                    title = str(row[3]), 
                    description =str(row[4]),
                    star_rating = randint(3, 5), 
                    country = row[9],
                    city = row[10],
                    address = row[11]
                )
    context = {}
    return Response({
        "success": "users succeessfully imported"
    })