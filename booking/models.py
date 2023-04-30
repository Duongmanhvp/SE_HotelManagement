from django.db import models
from django.utils.translation import gettext_lazy as _
from django_extensions.db.models import (
    TimeStampedModel,
    ActivatorModel,
    TitleDescriptionModel,
)
from datetime import datetime

from core.models import Account

class Hotel(
    TitleDescriptionModel,
    ActivatorModel,
    TimeStampedModel,
    ):

    class Meta:
        verbose_name = 'Hotel'
        verbose_name_plural = 'Hotels'
        ordering = ["id"]

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
    class Meta:
        verbose_name = 'Room Type'
        verbose_name_plural = 'Room Types'
        constraints = [
            models.UniqueConstraint('id', 'hotel', name='constraint_1')
        ]
    
    hotel = models.ForeignKey(Hotel, default=0, unique=False, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    total_inventory = models.IntegerField(default=2)
    total_reserved = models.IntegerField(default=1)
    rate = models.DecimalField(max_digits=20,default=0, decimal_places=2)

    def check_availablity(self):
        return self.total_inventory > self.total_reserved

    def manage_available_rooms(self, qty):
        new_no_room_available = self.no_room_available - int(qty)
        self.no_room_available = new_no_room_available
        self.save()

    
    def make_reservation(self, user, qty):
        if self.check_availablity(qty):
            reservation = Reservation.objects.create(
                room= self, 
                quantity= qty, 
                user= user
            )
            self.manage_available_room(qty)
            return reservation
        else:
            return None
        
class Room(
    # ActivatorModel,
    TimeStampedModel,
    ):

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

    class Meta:
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservation'
        ordering = ['id']
    
    class MealType(models.TextChoices):
        DEFAULT_TYPE = 'na', _('no meal need')
        MEAL_TYPE_1 = 't1', _('breakfast')
        MEAL_TYPE_2 = 't2', _('dinner')
        MEAL_TYPE_3 = 't3', _('breakfast and dinner')

    class ReservationStatus(models.TextChoices):
        NOT_CANCELLED = 'nc', _('not canceled')
        CANCELLED = 'c', _('cancelled')
        ...

    customer = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    no_of_children = models.PositiveIntegerField(default=0)
    no_of_adults = models.PositiveIntegerField(default=1)
    meal_type = models.TextField(
        max_length=11,
        choices=MealType.choices,
        default=MealType.DEFAULT_TYPE
    )
    has_parking_lot = models.BooleanField(default=False)
    special_requests = models.TextField(max_length=1000, default='')
    status = models.TextField(
        max_length=2,
        choices=ReservationStatus.choices,
        default=ReservationStatus.NOT_CANCELLED
    )
    arrive_date = models.DateField()
    no_of_days_stay = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.customer.name} - {self.room.title} - {self.quantity}'
    
