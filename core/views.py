from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView

from .models import Account
from .serializers import AccountRegisterSerializer, AccountLoginSerializer, UserProfileSerializer

from django.shortcuts import get_object_or_404

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

@api_view(["GET"])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def get_routes(request):
    routes = [
        {
            "Endpoint": "/register/",
            "method": "POST",
            "header": None,
            "body": {
                "username": "str",
                "email": "str",
                "password": "str",
                "re_password": "str"
            },
            "description": "register new user"
        },
        {
            "Endpoint": "/login/",
            "method": "PUT",
            "header": None,
            "body": {
                "email": "str",
                "password": "str"
            },
            "description": "return jwt auth key for user login"
        },
        {
            "Endpoint": "/hotel/",
            "method": "GET",
            "header": None,
            "body": None,
            "description": "return a list of hotels"
        },
        {
            "Endpoint": "/hotel/<int:pk>/",
            "method": "GET",
            "header": None,
            "body": None,
            "description": "return a hotel details, including rooms for booking"
        },
        {
            "Endpoint": "/reservation/",
            "method": "GET",
            "header": {
                "Authorization": "Bearer ${JWT_TOKEN}",
            },
            "body": None,
            "description": "return list of reservations of an user"
        },
        {
            "Endpoint": "/reservation/",
            "method": "POST",
            "header": {
                "Authorization": "Bearer ${JWT_TOKEN}",
            },
            "body": {
                "hotel": "str",
                "room_type": "str",
                "check_in": "str",
                "check_out": "str",
                "no_of_children": "int",
                "no_of_adults": "int",
                "meal_type": "str",
                "has_parking_lot": "boolean",
                "special_requests": "str",
                "status": "str"
            },
            "description": "make reservations"
        },
        {
            "Endpoint": "/reservation/<int:pk>/",
            "method": "GET",
            "header": {
                "Authorization": "Bearer ${JWT_TOKEN}",
            },
            "body": None,
            "description": "return single reservation detail of an user"
        },
        {
            "Endpoint": "/reservation/<int:pk>/",
            "method": "PUT",
            "header": {
                "Authorization": "Bearer ${JWT_TOKEN}",
            },
            "body": {
                "status": None,
            },
            "description": "cancel a reservation"
        },
        {
            "Endpoint": "/hotel-management/",
            "method": "PUT",
            "header": {
                "Authorization": "Bearer ${JWT_TOKEN}",
            },
            "body": {
                "status": "str",
            },
            "description": "return reservations list of all users"
        },
    ]
    return Response(routes)
    
@api_view(["POST"])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def register(request, *args, **kwargs):
    serializer = AccountRegisterSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.data
        user = Account.objects.create_user(email=data["email"], username=data["username"], password=data["password"])
        token = get_tokens_for_user(user)
        return Response(token)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(
    TokenObtainPairView
    ):
    serializer_class = AccountLoginSerializer
    
class UserProfileView(
    RetrieveUpdateAPIView
):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer
    queryset = Account.objects.all()

    def get_object(self):
        return self.request.user