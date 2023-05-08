import os

import csv
from random import randint

from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.generics import ListAPIView

from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction

from hotel_management import settings
from booking.models import Reservation, Hotel, RoomType, Room
from .serializers import HotelManagerSerializer
from .custom_permissions import IsHotelManagerPermission

@transaction.atomic
@api_view(['POST'])
def create_bulk_data(request):
    # with open(os.path.join(settings.BASE_DIR,'static/user_data.csv')) as f:
    #     reader = csv.reader(f)
    #     first_row = next(reader)
    #     for row in reader:
    #         user, created = Account.objects.get_or_create(
    #             username = row[0],
    #             email = row[1],
    #             password = row[2],
    #         )

    # with open(os.path.join(settings.BASE_DIR,'static/hotel_data.csv')) as f:
    #     reader = csv.reader(f)
    #     first_row = next(reader)
    #     for row in reader:
    #         user, created = Hotel.objects.get_or_create(
    #             title = row[0],
    #             description = row[1],
    #             country = row[2],
    #             city = row[3],
    #             address = row[4],
    #             star_rating = randint(3, 5),
    #     )

    # with open(os.path.join(settings.BASE_DIR,'static/roomtype_data.csv')) as f:
    #     reader = csv.reader(f)
    #     first_row = next(reader)
    #     for row in reader:
    #         user, created = RoomType.objects.get_or_create(
    #             hotel = Hotel(id = row[0]),
    #             title = row[1],
    #             description = row[2],
    #             total_inventory = 10,
    #             total_reserved = 10,
    #             rate = 100,
    #     )
    
    # room_list = []
    # with open(os.path.join(settings.BASE_DIR,'static/room_data.csv')) as f:
    #     reader = csv.reader(f)
    #     first_row = next(reader)
    #     for row in reader:
    #         entry = Room(
    #             hotel = Hotel.objects.get(id = row[0]),
    #             room_type = RoomType.objects.get(
    #                 hotel = row[0],
    #                 title = row[2],
    #                 ),
    #             floor = row[1],
    #             is_available = True,
    #         )
    #         room_list.append(entry)
    #     rooms = Room. objects.bulk_create(room_list)

    return Response({
        "success": "users succeessfully imported"
    })

class HotelManagerView(
    RetrieveModelMixin,
    viewsets.GenericViewSet,
    ListAPIView
    ):
    
    permission_classes = (permissions.IsAuthenticated, IsHotelManagerPermission,)
    serializer_class = HotelManagerSerializer
    queryset = Reservation.objects.all()

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['check_in', 'check_out']
    ordering = ['check_in']



