from django.db import models

# Create your models here.
class User(models.Model):
    id_number = models.IntegerField(null=False, default=0, unique=True)
    name = models.CharField(max_length=200, null=False)
    email = models.CharField(max_length=200, null=True)
    isAdmin = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name
    
class Hotel(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200, null=True)
    starRate = models.IntegerField(default=5)

    def __str__(self) -> str:
        return self.name
    
class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, default='standard')
    price = models.FloatField(default=0.00)
    description = models.CharField(max_length=200, default='')
    available = models.BooleanField(default=True)

class Service(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField(default=0.00)
    last_updated = models.DateTimeField(auto_now=True)
    
class ServiceList(models.Model):
    service_id = models.IntegerField(null=False)
    service_used = models.ForeignKey(Service, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)

class BookingDetail(models.Model):
    hotel_id = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    service_list_id = models.ForeignKey(ServiceList, on_delete=models.CASCADE)
    check_in_date = models.DateTimeField()
    check_out_date = models.DateTimeField()
    number_of_people = models.SmallIntegerField()

class Billing(models.Model):
    booking_detail_id = models.ForeignKey(BookingDetail, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.FloatField(default=0.00)
    payment_date = models.DateTimeField()
    payment_type = models.CharField(max_length=50)
    

class Comment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=256, default='')
    rating = models.IntegerField(default=5)

