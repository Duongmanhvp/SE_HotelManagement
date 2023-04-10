from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import  HotelSerializer, RoomSerializer, ReservationSerializer
from .models import Hotel, Room , Reservation
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin,UpdateModelMixin,RetrieveModelMixin

class HotelViewSet(
        ListModelMixin,
        RetrieveModelMixin, 
        viewsets.GenericViewSet
        ):
    # permission_classes = (IsAuthenticated,)
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

class RoomViewSet(
        ListModelMixin,
        RetrieveModelMixin, 
        viewsets.GenericViewSet
        ):
    # permission_classes = (IsAuthenticated,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class ReservationViewSet(
        ListModelMixin,
        RetrieveModelMixin,
        UpdateModelMixin, 
        viewsets.GenericViewSet
        ):
    # permission_classes = (IsAuthenticated,)
    queryset = Room.objects.all()
    serializer_class = ReservationSerializer

    # def get_queryset(self):
    #     """
    #     This view should return a list of all the orders
    #     for the currently authenticated user.
    #     """
    #     user = self.request.user
    #     return Reservation.objects.filter(user = user)

    def create(self, request):
        try:
            data = JSONParser().parse(request)
            serializer = ReservationSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                room_ordered = Room.objects.get(pk = data["item"])
                order = room_ordered.make_reservation(request.user, data["quantity"])
                return Response(ReservationSerializer(order).data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JSONDecodeError:
            return JsonResponse({"result": "error","message": "Json decoding error"}, status= 400)