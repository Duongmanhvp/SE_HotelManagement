from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import permissions
from .serializers import AccountRegisterSerializer, MyTokenViewPairSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Account

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class MyTokenObtainPairView(
    TokenObtainPairView
):
    serializer_class = MyTokenViewPairSerializer

@api_view(['GET'])
def get_routes(request):
    routes = [
        'register/',
    ]
    return Response(routes)

@api_view(['POST'])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def register(request, *args, **kwargs):
    serializer = AccountRegisterSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.data
        user = Account.objects.create_user(email=data['email'], username=data['username'], password=data['password'])
        token = get_tokens_for_user(user)
        return Response(token)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
