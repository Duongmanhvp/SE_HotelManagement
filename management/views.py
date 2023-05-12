import os
import csv
from random import randint
from faker import Faker
from datetime import datetime, timedelta

from django.db import transaction
from django.shortcuts import get_object_or_404

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.generics import ListAPIView

from hotel_management import settings
from booking.models import Reservation, Hotel
from core.models import Account
from .serializers import HotelManagerSerializer
from .custom_permissions import IsHotelManagerPermission

faker = Faker()

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
    ordering = ['id']
    lookup_fields = ['check_in','id','customer_name']

    def get_queryset(self):
        """
        Multiple field query for hotel manager admin.
        """
        queryset = Reservation.objects.all()

        hotel = self.request.query_params.get('hotel')
        username = self.request.query_params.get('username')
        check_in_month = self.request.query_params.get('check_in_month')
        check_in_year = self.request.query_params.get('check_in_year')
        check_out_month = self.request.query_params.get('check_out_month')
        check_out_year = self.request.query_params.get('check_out_year')

        if hotel is not None:
            queryset = queryset.filter(hotel__title=hotel)

        if username is not None:
            queryset = queryset.filter(customer__username=username)

        if check_in_month is not None:
            queryset = queryset.filter(check_in__month=check_in_month)

        if check_in_year is not None:
            queryset = queryset.filter(check_in__year=check_in_year)

        if check_out_month is not None:
            queryset = queryset.filter(check_out__month=check_out_month)

        if check_out_year is not None:
            queryset = queryset.filter(check_out__year=check_out_year)

        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        total = [ i.amount for i in queryset]
        serializer = HotelManagerSerializer(queryset, many=True)
        return Response({
            "number reservation": len(total),
            "total": sum(total),
            "data": serializer.data
            })

    

@transaction.atomic
@api_view(['POST'])
def create_bulk_data(request):
    room_list = []
    count = 0
    with open(os.path.join(settings.BASE_DIR,'static/Hotel Reservations.csv')) as f:
        reader = csv.reader(f)
        first_row = next(reader)
        for row in reader:
            if count > 5:
                room_list = Reservation.objects.bulk_create(room_list)
                return Response({
                    "success": "users succeessfully imported"
                })
            check_in_time = datetime(year=int(row[9]), month=int(row[10]), day=int(row[11]))
            entry, created = Reservation.objects.get_or_create(
                hotel = Hotel.objects.get(id = 10),
                customer = Account.objects.get(id= randint(20, 10000)),
                no_of_children = row[2],
                no_of_adults= row[1], 
                room_type = row[7],
                meal_type = row[5],
                has_parking_lot = row[6],
                check_in = check_in_time, 
                check_out = check_in_time + timedelta(days=5)
            )
            room_list.append(entry)
            count = count + 1

        return Response({
            "success": "users succeessfully imported"
        })



