from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.generics import ListAPIView, ListCreateAPIView

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import  HotelSerializer, RoomSerializer, ReservationSerializer
from .models import Hotel, Room , Reservation

class HotelViewSet(
        viewsets.GenericViewSet,
        RetrieveModelMixin,
        ListAPIView
    ):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    # filter
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['country', 'city', 'star_rating']
    search_fields = ['title']
    ordering_fields = []

class RoomViewSet(
        viewsets.GenericViewSet,
        RetrieveModelMixin,
        ListAPIView
    ):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

    # filter
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ['title', 'description']
    search_fields = ['title']
    ordering_fields = ['price']

    def get_queryset(self):
        return super().get_queryset()

class ReservationViewSet(
        viewsets.GenericViewSet,
        RetrieveModelMixin,
        ListCreateAPIView
    ):
    
    permission_classes = (IsAuthenticated,)
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        print(user)
        return Reservation.objects.filter(customer=user)
