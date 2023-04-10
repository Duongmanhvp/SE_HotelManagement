from . import models
from rest_framework import serializers
from rest_framework.fields import CharField, EmailField



class CustomerSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Customer
		fields = (
			'name',
			'email',
			'password'
		)