from . import models
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Account
		fields = (
			'username',
			'email',
			'password'
		)