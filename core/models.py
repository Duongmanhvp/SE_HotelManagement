from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# from utils.model_abstracts import Model
from django_extensions.db.models import (
	TimeStampedModel, 
	ActivatorModel,
)

# class CustomerManager(BaseUserManager):
# 	def create_user(self, email, name, password=None):
# 		if not email:
# 			raise ValueError("Must provide email address")

# 		email = self.nomalize_email(email)
# 		customer = self.model(email=email, name=name)
# 		customer.set_password(password)
# 		customer.save()
		
# 		return customer


class Customer(
	TimeStampedModel, 
	ActivatorModel,
	AbstractBaseUser,
	):

	class Meta:
		verbose_name_plural = "Customers"

	name = models.CharField(max_length=50, default="new user")
	email = models.EmailField(verbose_name="Email", unique=True, blank=True)

	is_active = True
	is_staff = models.BooleanField(default=False)

	USERNAME_FIELD= "email"
	REQUIRED_FIELDS = ["name"]

	def __str__(self):
		return f'{self.email}'
	
	def __get_full_name__(self):
		return f'{self.name}'