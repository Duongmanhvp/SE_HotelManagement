from collections import OrderedDict
from .models import Room , Reservation
from .exceptions import NotEnoughStockException, NotAProperRatingNumberException
from rest_framework_json_api import serializers
from rest_framework.fields import CharField, IntegerField

class HotelSerializer(serializers.ModelSerializer):
    
    name = CharField(source="title", required=True)

    class Meta:
        model = Room
        fields = (
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
    
    hotel_name = CharField(source="hotel.title", required=True)
    room_type = CharField(source="title", required=True)

    class Meta:
        model = Room
        fields = (
            'hotel_name',
            'title',
            'no_room_available',
            'price',
        )

class ReservationSerializer(serializers.ModelSerializer):

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