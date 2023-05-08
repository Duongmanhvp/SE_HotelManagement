from rest_framework import serializers

from booking.models import Reservation

class HotelManagerSerializer(
    serializers.ModelSerializer,
):
    hotel_name = serializers.CharField(source='hotel.title', read_only=True)
    customer_name = serializers.CharField(source='customer.username', read_only=True)
    amount = serializers.ReadOnlyField()

    class Meta:
        model = Reservation
        fields = (
            "id",
            "hotel_name",
            "customer_name",
            "room_type",
            "no_of_children",
            "no_of_adults",
            "meal_type",
            "has_parking_lot",
            "special_requests",
            "check_in",
            "check_out",
            "amount",
            "status",
        )
