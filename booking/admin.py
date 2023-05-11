from django.contrib import admin

from . import models

@admin.register(models.Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'country', 'city', 'star_rating')

@admin.register(models.RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'total_inventory', 'total_reserved', 'rate')

    def get_hotel_id(self, obj):
        return obj.hotel.id

    get_hotel_id.admin_order_field  = 'hotel_id'
    get_hotel_id.short_description = 'Hotel ID'

@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_room_type_id', 'is_available')

    def get_room_type_id(self, obj):
        return obj.hotel.id

    get_room_type_id.admin_order_field  = 'room_type_id'
    get_room_type_id.short_description = 'Room type ID'

@admin.register(models.Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_customer_name', 'get_hotel_name', 'room_type', 'check_in', 'check_out')

    def get_hotel_name(self, obj):
            return obj.hotel.title
    get_hotel_name.admin_order_field  = 'hotel_id'
    get_hotel_name.short_description = 'hotel name'

    def get_customer_name(self, obj):
            return obj.customer
    
    get_customer_name.admin_order_field  = 'customer_id'
    get_customer_name.short_description = 'Customer name'

