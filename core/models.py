from django.db import models
from django.contrib.auth.models import AbstractBaseUser
# from utils.model_abstracts import Model
from django_extensions.db.models import (
	TimeStampedModel, 
	ActivatorModel,
	TitleDescriptionModel
)

class Customer(
	TimeStampedModel, 
	ActivatorModel,
	AbstractBaseUser,
	TitleDescriptionModel
	# Model
	):

	class Meta:
		verbose_name_plural = "Customers"

	name = models.CharField(max_length=50, default="new user")
	email = models.EmailField(verbose_name="Email", unique=True, blank=True)
	password = models.CharField(max_length=128)

	is_active = True

	REQUIRED_FIELDS = []

	def __str__(self):
		return f'{self.title}'