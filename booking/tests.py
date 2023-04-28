# from django.contrib.auth.models import User

# from rest_framework import status
# from rest_framework.authtoken.models import Token
# from rest_framework.test import APIClient
# from rest_framework.test import APITestCase

# from booking.models import Room, Reservation

# class EcommerceTestCase(APITestCase):
#     """
#     Test suite for Rooms and Reservations
#     """
#     def setUp(self):

#         Room.objects.create(title= "Demo Room 1",description= "This is a description for demo 1",price= 500,stock= 20)
#         Room.objects.create(title= "Demo Room 2",description= "This is a description for demo 2",price= 700,stock= 15)
#         Room.objects.create(title= "Demo Room 3",description= "This is a description for demo 3",price= 300,stock= 18)
#         Room.objects.create(title= "Demo Room 4",description= "This is a description for demo 4",price= 400,stock= 14)
#         Room.objects.create(title= "Demo Room 5",description= "This is a description for demo 5",price= 500,stock= 30)
#         self.Rooms = Room.objects.all()
#         self.user = User.objects.create_user(
#             username='testuser1', 
#             password='this_is_a_test',
#             email='testuser1@test.com'
#         )
#         Reservation.objects.create(Room = Room.objects.first(), user = User.objects.first(), quantity=1)
#         Reservation.objects.create(Room = Room.objects.first(), user = User.objects.first(), quantity=2)
        
#         #The app uses token authentication
#         self.token = Token.objects.get(user = self.user)
#         self.client = APIClient()
        
#         #We pass the token in all calls to the API
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)


#     def test_get_all_rooms(self):
#         '''
#         test RoomsViewSet list method
#         '''
#         self.assertEqual(self.rooms.count(), 5)
#         response = self.client.get('/room/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_get_one_room(self):
#         '''
#         test RoomsViewSet retrieve method
#         '''
#         for room in self.rooms:
#             response = self.client.get(f'/room/{room.id}/')
#             self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_reservation_is_more_than_stock(self):
#         '''
#         test Room.check_stock when order.quantity > room.stock
#         '''
#         for i in self.rooms:
#             current_available = i.available_room
#             self.assertEqual(i.check_no_available_room(current_stock + 1), False)

#     def test_reservation_equals_available_room(self):
#         '''
#         test Room.check_stock when order.quantity == room.stock
#         '''
#         for i in self.rooms:
#             current_stock = i.stock
#             self.assertEqual(i.check_no_available_room(current_stock), True)

#     def test_order_is_less_than_stock(self):
#         '''
#         test Room.check_stock when order.quantity < room.stock
#         '''
#         for i in self.rooms:
#             current_stock = i.stock
#             self.assertTrue(i.check_stock(current_stock - 1), True)
    
#     def test_create_order_with_more_than_stock(self):
#         '''
#         test ReservationsViewSet create method when order.quantity > room.stock
#         '''
#         for i in self.rooms:
#             stock = i.stock
#             data = {"room": str(i.id), "quantity": str(stock+1)}
#             response = self.client.post(f'/order/', data)
#             self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_create_order_with_less_than_stock(self):
#         '''
#         test ReservationsViewSet create method when order.quantity < room.stock
#         '''
#         for i in self.rooms:
#             data = {"room": str(i.id), "quantity": 1}
#             response = self.client.post(f'/order/',data)
#             self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_create_order_with_equal_stock(self):
#         '''
#         test ReservationsViewSet create method when order.quantity == room.stock
#         '''
#         for i in self.rooms:
#             stock = i.stock
#             data = {"room": str(i.id), "quantity": str(stock)}
#             response = self.client.post(f'/order/',data)
#             self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_get_all_orders(self):
#         '''
#         test ReservationsViewSet list method
#         '''
#         self.assertEqual(Reservation.objects.count(), 2)
#         response = self.client.get('/order/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
        

#     def test_get_one_order(self):
#         '''
#         test ReservationsViewSet retrieve method
#         '''
#         orders = Reservation.objects.filter(user = self.user)
#         for o in orders:
#             response = self.client.get(f'/order/{o.id}/')
#             self.assertEqual(response.status_code, status.HTTP_200_OK)