from django.db import models
from django.contrib.auth.models import AbstractBaseUser
# from utils.model_abstracts import Model
from django_extensions.db.models import (
	TimeStampedModel, 
	ActivatorModel,
)

class Customer(
	TimeStampedModel, 
	ActivatorModel,
	AbstractBaseUser,
	# Model
	):

	class Meta:
		verbose_name_plural = "Customers"

	name = models.CharField(max_length=50, default="new user")
	email = models.EmailField(verbose_name="Email", unique=True, blank=True)

	is_active = True

	USERNAME_FIELD= "name"
	REQUIRED_FIELDS = []

	def __str__(self):
		return f'{self.name}'