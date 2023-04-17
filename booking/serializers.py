from collections import OrderedDict
from .models import Room , Reservation, Hotel
from .exceptions import NotEnoughStockException, NotAProperRatingNumberException
from rest_framework_json_api import serializers
from rest_framework.fields import CharField
from rest_framework import permissions

class HotelSerializer(serializers.ModelSerializer):
    
    name = CharField(source="title", required=True)

    class Meta:
        model = Hotel
        fields = (
            'id',
            'name',
            'description',
            'country',
            'city',
            'star_rating',
        )
    def validate(self, res: OrderedDict):
        rating = res.get("star_rating")
        if not rating in range(1,5):
            raise NotAProperRatingNumberException
        return res

class RoomSerializer(serializers.ModelSerializer):
    
    hotel_id = CharField(source="hotel.id", required=True)
    room_type = CharField(source="title", required=True)
    room_description = CharField(source="description", required=True)

    class Meta:
        model = Room
        fields = (
            'hotel_id',
            'room_type',
            'room_description',
            'no_room_available',
            'price',
        )

class ReservationSerializer(
    serializers.ModelSerializer,
):
    permission_classes = (permissions.IsAuthenticated )
    room = serializers.PrimaryKeyRelatedField(queryset = Room.objects.all(), many=False)
    customer_name = CharField(source="customer.name")

    class Meta:
        model = Reservation
        fields = (
            'customer_name',
            'room',
            'quantity',
        )

    def validate(self, res: OrderedDict):
        room = res.get("room")
        quantity = res.get("quantity")
        if not room.check_stock(quantity):
            raise NotEnoughStockException
        return res