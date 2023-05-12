from django.db import models
from django.utils.translation import gettext_lazy as _

from django_extensions.db.models import (
    TimeStampedModel,
    ActivatorModel,
    TitleDescriptionModel,
)

from core.models import Account

class Hotel(
    TitleDescriptionModel,
    ActivatorModel,
    TimeStampedModel,
    ):
    """
    Hotel ORM for creation of Hotel database.
    """
    class Meta:
        verbose_name = 'Hotel'
        verbose_name_plural = 'Hotels'
        ordering = ['created', 'id']

    star_rating = models.IntegerField(default=1, blank= False)
    country = models.CharField(max_length=100, default='country', blank=False)
    city = models.CharField(max_length=100, default='city', blank=False)
    address = models.CharField(max_length=100, default='city', blank=False)

    def __str__(self):
        return self.title

class RoomType(
    TitleDescriptionModel,
    ActivatorModel, 
    TimeStampedModel,
    ):
    """
    Room type ORM for creation of Room Type.
    
    Whenever user book a room, they can only choose type of room.
    Their room will be assigned when they check in.
    """
    class Meta:
        verbose_name = 'Room Type'
        verbose_name_plural = 'Room Types'
        constraints = [
            models.UniqueConstraint('id', 'hotel', name='constraint_1')
        ]
    
    hotel = models.ForeignKey(Hotel, default=0, unique=False, on_delete=models.CASCADE, to_field='id', related_name='room_type')
    title = models.CharField(max_length=50)
    total_inventory = models.IntegerField(default=2)
    total_reserved = models.IntegerField(default=1)
    rate = models.DecimalField(max_digits=20,default=0, decimal_places=2)
    
    def check_availability(self, check_in, check_out):
        avail_list = []
        booking_list = Reservation.objects.filter(room_type=self.description, hotel=self.hotel)
        for reservation in booking_list:
            if reservation.check_in > check_out or reservation.check_out < check_in:
                avail_list.append(True)
            else:
                avail_list.append(False)
        return False if avail_list.count(False) >= 10 else True

class Room(    
    ActivatorModel,
    TimeStampedModel,
    ):
    """
    Room ORM for creation of Room database.
    """
    class Meta:
        verbose_name = 'Room'
        verbose_name_plural = 'Rooms'
        ordering = ["id"]
        constraints = [
            models.UniqueConstraint(fields = ['id', 'room_type'], name='constraint_2')
        ]

    def __str__(self):
        return self.title

    hotel = models.ForeignKey(Hotel, default=0, on_delete=models.CASCADE)
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    floor = models.IntegerField(default=100, null=True, blank=True)
    is_available = models.BooleanField(default=True)

class Reservation(
    ActivatorModel,
    TimeStampedModel,
    ):
    """
    Reservation ORM for creation of Reservation database. 
    """
    class RoomTypeChoices(models.TextChoices):
        ROOM_TYPE_1 = 'single bedroom'
        ROOM_TYPE_2 = 'double bedroom'
        ROOM_TYPE_3 = 'queen size'
        ROOM_TYPE_4 = 'king size'
        ROOM_TYPE_5 = 'suite'
        ROOM_TYPE_6 = 'apartment'

    class MealType(models.TextChoices):
        DEFAULT_TYPE = 'no meal'
        MEAL_TYPE_1 = 'breakfast'
        MEAL_TYPE_2 = 'dinner'
        MEAL_TYPE_3 = 'breakfast and dinner'

    class ReservationStatus(models.TextChoices):
        NOT_CANCELLED = 'not cancelled'
        CANCELLED = 'cancelled'

    class Meta:
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservation'
        ordering = ['id']

    customer = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_type = models.TextField(
        max_length=14,
        choices=RoomTypeChoices.choices,
        default=RoomTypeChoices.ROOM_TYPE_1
    )

    no_of_children = models.PositiveIntegerField(default=0)
    no_of_adults = models.PositiveIntegerField(default=1)

    meal_type = models.TextField(
        max_length=20,
        choices=MealType.choices,
        default=MealType.DEFAULT_TYPE
    )
    has_parking_lot = models.BooleanField(default=False)
    special_requests = models.TextField(max_length=1000, default='', blank=True)

    status = models.TextField(
        max_length=13,
        choices=ReservationStatus.choices,
        default=ReservationStatus.NOT_CANCELLED
    )

    check_in = models.DateTimeField(null=True, blank=True)
    check_out = models.DateTimeField(null=True, blank=True)

    @property
    def date_diff(self):
        return (self.check_out - self.check_in).days
    
    @property
    def amount(self):
        price = RoomType.objects.get(hotel=self.hotel, description=self.room_type).rate
        return self.date_diff * price

    def __str__(self):
        return f'{str(self.customer)} - {self.hotel.title} - {self.room_type}'
    
class Bill(
    ActivatorModel,
    TimeStampedModel,
    ):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    customer = models.ForeignKey(Account, on_delete=models.CASCADE)
    payment_date = models.DateTimeField(blank=True)

    class PaymentType(models.TextChoices):
        ON_ARRIVAL = 'on arrival'
        ONLINE = 'online'

    payment_type = models.TextField(
        max_length=13,
        choices=PaymentType.choices,
        default=PaymentType.ONLINE
    )