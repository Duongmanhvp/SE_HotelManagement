from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase, APIClient, APIRequestFactory

from booking.models import Hotel, RoomType, Reservation
from core.views import Account

from random import randint
from faker import Faker

class HotelViewTestCase(
    APITestCase
    ):
    def setUp(self) -> None:
        faker = Faker()

        self.username = faker.user_name()
        self.email = faker.email()
        self.password = faker.password()

        self.user = Account.objects.create_user(
            username=self.username,
            email=self.email,
            password=self.password
        )
        self.user.is_active =True
        self.user.save()

        for _ in range(2):
            hotel, created = Hotel.objects.get_or_create(
                title = faker.name(),
                description = faker.paragraph(nb_sentences=5),
                country = 'US',
                city = 'florida',
                address = faker.address(),
                star_rating = randint(3, 5),
            )
            hotel.save()

            type, created = RoomType.objects.get_or_create(
                hotel = hotel,
                title = 'room_type_1',
                description = 'single bedroom',
                total_inventory = 10,
                total_reserved = 10,
                rate = 100,
            )
            type.save()

            reservation, created = Reservation.objects.get_or_create(
                hotel = hotel,
                customer= self.user,
                room_type = 'room_type_1',
                check_in = '2023-11-11 11:11:11',
                check_out = '2023-10-11 11:11:11'
            )
            reservation.save()


        self.client = APIClient()
        self.factory = APIRequestFactory()

    def test_list_hotel(self):
        url = reverse('hotel-list')

        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Hotel.objects.all().count(), 2)

    def test_detail_hotel_success(self):
        hotel_id = Hotel.objects.all()[0].id
        hotel = Hotel.objects.get(id=hotel_id)
        url = reverse('hotel-detail', args=(hotel_id,))
        response = self.client.get(url)        

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertTrue('name' in response.data)

    def test_detail_hotel_fail(self):
        hotel_id = 100000
        url = reverse('hotel-detail', args=(hotel_id,))
        response = self.client.get(url)        

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list_reservation_without_authentication(self):
        url = reverse('reservation-list')
        
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)