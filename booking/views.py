from json import JSONDecodeError
from django.http import JsonResponse
from core.models import Account

from core.serializers import AccountRegisterSerializer
from core.views import get_tokens_for_user
from .serializers import  HotelSerializer, RoomSerializer, ReservationSerializer
from .models import Hotel, Room , Reservation
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin,UpdateModelMixin,RetrieveModelMixin
from rest_framework.generics import ListAPIView

class HotelViewSet(
        RetrieveModelMixin, 
        viewsets.GenericViewSet,
        ListAPIView
        ):
    # permission_classes = (IsAuthenticated,)
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    lookup_field = 'id'
    filter_fields = ('country', 'city')
    search_fields = ('name')
    def get(self, request, *args, **kwargs):
        model_data = Hotel.objects.all
        try:
            ...
        except:
            pass


class RoomViewSet(
        RetrieveModelMixin, 
        viewsets.GenericViewSet,
        ListAPIView
        ):
    # permission_classes = (IsAuthenticated,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('hotel_id')
    search_fields = ('name')

    def get_queryset(self):
        return super().get_queryset()

class ReservationViewSet(
        ListModelMixin,
        RetrieveModelMixin,
        UpdateModelMixin, 
        viewsets.GenericViewSet
        ):
    
    permission_classes = (IsAuthenticated,)
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(customer=user)

    def post(request, *args, **kwargs):
        serializer = ReservationSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    