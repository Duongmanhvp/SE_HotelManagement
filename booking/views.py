from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import  HotelSerializer, RoomSerializer, ReservationSerializer, MyTokenObtainPairSerializer
from .models import Hotel, Room , Reservation
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.mixins import ListModelMixin,UpdateModelMixin,RetrieveModelMixin

from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class HotelViewSet(
        ListModelMixin,
        RetrieveModelMixin, 
        viewsets.GenericViewSet
        ):
    # permission_classes = (IsAuthenticated,)
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

    def get(self, request, *args, **kwargs):
        model_data = Hotel.objects.all
        try:
            ...
        except:
            pass


class RoomViewSet(
        ListModelMixin,
        RetrieveModelMixin, 
        viewsets.GenericViewSet
        ):
    # permission_classes = (IsAuthenticated,)
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = 'id'

class ReservationViewSet(
        ListModelMixin,
        RetrieveModelMixin,
        UpdateModelMixin, 
        viewsets.GenericViewSet
        ):
    
    permission_classes = (IsAuthenticated,)
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user = self.request.user
        return Reservation.objects.filter(user=user)

    def create(self, request):
        try:
            data = JSONParser().parse(request)
            serializer = ReservationSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                room = Room.objects.get(pk = data["room"])
                reservation = room.place_order(request.user, data["quantity"])
                return Response(ReservationSerializer(reservation).data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JSONDecodeError:
            return JsonResponse({"result": "error","message": "Json decoding error"}, status= 400)