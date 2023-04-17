from . import models
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class AccountSerializer(
       TokenObtainPairSerializer, 
       serializers.ModelSerializer,
    ):
    class Meta:
        model = models.Account
        fields = (
			'username',
			'email',
			'password',
		)
    def validate_password(self, value: str) -> str:
        """
		Hash value passed by user.

		:param value: password of a user
		:return: a hashed version of the password
		"""
        return make_password(value)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_hotel_manager'] = user.is_hotel_manager
        # ...

        return token
    
