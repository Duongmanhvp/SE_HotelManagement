from django.db import models
from django.contrib.auth.models import User
# from utils.model_abstracts import Model
from core.models import Customer
from django_extensions.db.models import (
    TimeStampedModel,
    ActivatorModel,
    TitleDescriptionModel,
    TitleSlugDescriptionModel
)

class Hotel(
    TimeStampedModel,
    ActivatorModel,
    TitleSlugDescriptionModel,
    # Model
    ):

    class Meta:
        verbose_name = 'Hotel'
        verbose_name_plural = 'Hotels'
        ordering = ["id"]

    star_rating = models.IntegerField(default=1, blank= False)
    country = models.CharField(max_length=100, default='country', blank=False)
    city = models.CharField(max_length=100, default='city', blank=False)

    def __str__(self):
        return self.title

class Room(
    TimeStampedModel,
    ActivatorModel,
    TitleDescriptionModel,
    # Model
    ):


    class Meta:
        verbose_name = 'Room'
        verbose_name_plural = 'Rooms'
        ordering = ["id"]

    def __str__(self):
        return self.title

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    no_room_available = models.IntegerField(default=1)
    price = models.IntegerField(default=0)

    USERNAME_FIELD= "email"
    REQUIRED_FIELDS = ["name"]

    def amount(self):
        amount = float(self.price / 100)
        return amount

    def manage_available_room(self, qty):
        new_no_room_available = self.no_room_available - int(qty)
        self.no_room_available = new_no_room_available
        self.save()

    def check_availablity(self, qty):
        if int(qty) > self.no_room_available:
            return False
        return True

    def make_reservation(self, user, qty):
        if self.check_available_rooms(qty):
            reservation = Reservation.objects.create(
                room= self, 
                quantity= qty, 
                user= user
            )
            self.manage_available_room(qty)
            return reservation
        else:
            return None

class Reservation(
    TimeStampedModel,
    ActivatorModel ,
    # Model
    ):

    class Meta:
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservation'
        ordering = ["id"]
    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    room = models.ForeignKey(Room, null=True, blank=True, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.customer.name} - {self.room.title} - {self.quantity}'