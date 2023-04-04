from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer

# Create your views here.
@api_view(['GET'])
def apiOverviews(request):
    api_urls = {
        'Users': '/users/',
        'Hotel': '/hotel/',
        'Service': '/service/',
        'Booking': '/booking/',
    }
    return Response(api_urls)

@api_view(['GET'])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUser(request, pk):
    # id_request = request['id_number']
    users = User.objects.get(id_number=pk)
    serializer = UserSerializer(users, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)