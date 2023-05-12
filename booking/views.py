from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import filters, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView

from .serializers import  HotelSerializer, ReservationSerializer, SingleHotelSerializer
from .models import Hotel, Reservation

class HotelViewSet(
    viewsets.ReadOnlyModelViewSet,
    ):
    """
    Hotel views.

    """
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['country', 'city', 'star_rating']
    search_fields = ['title']
    ordering_fields = []

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = SingleHotelSerializer(instance, many=False)
        return Response(serializer.data)
    
class ReservationViewSet(
    viewsets.GenericViewSet,
    RetrieveUpdateAPIView,
    ListCreateAPIView
    ):
    """
    Reservation views.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(customer=user)