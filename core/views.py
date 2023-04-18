from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import AccountSerializer
from .models import Account
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated, IsAdminUser

class AccountAPIView(
    ListModelMixin,
    RetrieveModelMixin, 
    viewsets.GenericViewSet,
    views.APIView
):
    permission_classes = (IsAuthenticated, IsAdminUser)
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }
    
    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        return self.serializer_class(*args, **kwargs)

    def post(self, request):
        try:
            data = JSONParser().parse(request)
            serializer = AccountSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({
                    "user": AccountSerializer(data=data, context=self.get_serializer_context()).data,  # Get serialized User data
                })
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JSONDecodeError:
            return JsonResponse({"result": "error","message": "Json decoding error"}, status= 400)

    def get_renderers(self):
        return super().get_renderers()
    
