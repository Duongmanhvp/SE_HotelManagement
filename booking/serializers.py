from collections import OrderedDict

from rest_framework import serializers
from rest_framework.serializers import CharField
from django.utils import timezone
now = timezone.now()

from .models import RoomType , Reservation, Hotel

class HotelSerializer(serializers.ModelSerializer):
    name = CharField(source="title", required=True)
    class Meta:
        model = Hotel
        fields = (
            'id',
            'name',
            'description',
            'address',
            'country',
            'city',
            'star_rating',
        )
    def validate(self, res: OrderedDict):
        rating = res.get("star_rating")
        if not rating in range(1,5):
            raise serializers.ValidationError('Not a proper input for rating')
        return res

class RoomTypeSerializer(
    serializers.ModelSerializer
):
    room_type = CharField(source="title", required=True)
    room_description = CharField(source="description", required=True)

    class Meta:
        model = RoomType
        fields = (
            'id',
            'room_type',
            'room_description',
            'total_inventory',
            'total_reserved',
        )

class SingleHotelSerializer(
    serializers.ModelSerializer,
):
    name = CharField(source="title", required=True)
    room_type = RoomTypeSerializer(many=True)
    class Meta:
        model = Hotel
        fields = (
            'id',
            'name',
            'description',
            'address',
            'country',
            'city',
            'star_rating',
            'room_type',
        )

class StatusUpdateSerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Reservation
        fields = (
            'status',
        )

class ReservationSerializer(
    serializers.ModelSerializer,
):
    amount = serializers.ReadOnlyField()
    class Meta:
        model = Reservation
        fields = (
            'id',
            'hotel',
            'room_type',
            'check_in',
            'check_out',
            'no_of_children',
            'no_of_adults',
            'meal_type',
            'has_parking_lot',
            'special_requests',
            'amount',
            'status',
        )
        extra_kwargs = {
            'room_type': {'required': True},
            'check_in':{'required': True,},
            'check_out':{'required': True},
        }

    def validate(self, data):
        # handle check in time
        if self.context['request'].method == 'POST':
            if data['check_in'] <= data['check_out']:
                raise serializers.ValidationError('Improper check in or check out date')

            # handle room
            room = RoomType.objects.get(hotel = data['hotel'], description=data['room_type'])
            if not room.check_availability(data['check_in'], data['check_out']):
                raise serializers.ValidationError('Not enough room')
            return data
        return data
    
    def partial_update(self, instance, validated_data):
        instance.status = validated_data['status']
        return instance

    def create(self, validated_data):
        validated_data['customer'] = self.context['request'].user
        return super().create(validated_data)