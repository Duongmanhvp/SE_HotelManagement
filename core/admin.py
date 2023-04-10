from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'password', 'email')