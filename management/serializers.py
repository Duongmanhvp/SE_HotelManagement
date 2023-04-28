from rest_framework_json_api import serializers
from rest_framework.fields import CharField

from booking.models import Reservation, Room

class HotelManagerSerializer(
    serializers.ModelSerializer,
):
    class Meta:
        model = Reservation
        fields = '__all__'