from core.views import get_tokens_for_user
from .serializers import  HotelSerializer, RoomSerializer, ReservationSerializer
from .models import Hotel, Room , Reservation
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin,UpdateModelMixin,RetrieveModelMixin
from rest_framework.generics import ListAPIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class HotelViewSet(
        RetrieveModelMixin, 
        viewsets.GenericViewSet,
        ListAPIView
        ):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    # filter
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['country', 'city', 'address', 'star_rating']
    search_fields = ['title']
    ordering_fields = []

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
        
