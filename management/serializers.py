from rest_framework import serializers
from rest_framework.serializers import CharField

from booking.models import Reservation

class HotelManagerSerializer(
    serializers.ModelSerializer,
):
    hotel_name = serializers.CharField(source='hotel.title', read_only=True)
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    class Meta:
        model = Reservation
        exclude = ['created', 'modified', 'activate_date', 'deactivate_date', 'hotel', 'customer']