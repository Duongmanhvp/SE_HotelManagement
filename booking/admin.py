from django.contrib import admin
from . import models

@admin.register(models.Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'country', 'city', 'star_rating')

@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_hotel_id', 'title', 'description', 'price')

    def get_hotel_id(self, obj):
        return obj.hotel.id

    get_hotel_id.admin_order_field  = 'hotel_id'  #Allows column order sorting
    get_hotel_id.short_description = 'Hotel ID'  #Renames column head

@admin.register(models.Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_customer_id', 'get_room_id', 'quantity')

    def get_room_id(self, obj):
            return obj.hotel.id
    get_room_id.admin_order_field  = 'room_id'  #Allows column order sorting
    get_room_id.short_description = 'room ID'  #Renames column head

    def get_customer_id(self, obj):
            return obj.hotel.id
    
    get_customer_id.admin_order_field  = 'customer_id'  #Allows column order sorting
    get_customer_id.short_description = 'Customer ID'  #Renames column head

