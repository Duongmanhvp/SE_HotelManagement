import json
from .models import Account
from .exceptions import PasswordMismatchException, EmailExistedException
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.fields import CharField

class MyTokenViewPairSerializer(
    TokenObtainPairSerializer,
    ):   
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_hotel_manager'] = user.is_hotel_manager
        # ...

        return token
    
class AccountRegisterSerializer(
    serializers.ModelSerializer
    ):

    re_password = CharField(required=True)

    class Meta:
        model = Account
        fields = (
            'email',
            'username',
            'password', 
            're_password',
        )

    def validate_email(self, value):
        if value and Account.objects.filter(email__exact=value).exists():
            raise serializers.ValidationError("Name already exists!")
        # You need to return the value in after validation.
        return value
        
    def validate(self, data):
        # password validation
        password = data.get('password')
        re_password = data.get('re_password')

        if password != re_password:
            raise PasswordMismatchException
        return data