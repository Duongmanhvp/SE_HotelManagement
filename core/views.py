from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView

from .models import Account
from .serializers import AccountRegisterSerializer, AccountLoginSerializer, UserProfileSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

@api_view(["GET"])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def get_routes(request):
    routes = [{
        "end point documentation" : "https://hotel-backend-qpwd.onrender.com/swagger-ui/",
    }]
    return Response(routes)
    
@api_view(["POST"])
@authentication_classes([])
@permission_classes([permissions.AllowAny])
def register(request, *args, **kwargs):
    serializer = AccountRegisterSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.data
        user = Account.objects.create_user(email=data["email"], username=data["username"], password=data["password"])
        token = get_tokens_for_user(user)
        return Response(token)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(
    TokenObtainPairView
    ):
    serializer_class = AccountLoginSerializer
    permission_classes = (permissions.AllowAny, )
    authentication_classes = []
    
class UserProfileView(
    RetrieveUpdateAPIView
):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer
    queryset = Account.objects.all()

    def get_object(self):
        return self.request.user