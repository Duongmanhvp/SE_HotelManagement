from json import JSONDecodeError
from django.http import JsonResponse
from .serializers import CustomerSerializer
from rest_framework.parsers import JSONParser
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework import viewsets


class CustomerAPIView(views.APIView):
    """
    A simple APIView for creating contact entires.
    """
    serializer_class = CustomerSerializer

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
            serializer = CustomerSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                token = AuthToken.objects.create(user)[1]
                return Response({
                    "user": CustomerSerializer(fdaf, context=self.get_serializer_context()).data,  # Get serialized User data
                    "token": Customer.objects.get(token=token)
                })
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except JSONDecodeError:
            return JsonResponse({"result": "error","message": "Json decoding error"}, status= 400)

    def get_renderers(self):
        return super().get_renderers()