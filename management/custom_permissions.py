from rest_framework import permissions

class IsHotelManagerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            user = request.user
            return user.is_hotel_manager
        else:
            return True