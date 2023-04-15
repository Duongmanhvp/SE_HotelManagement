from django.urls import path
from django.contrib import admin
from core import views as core_views
from booking import views as booking_views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()

router.register(r'room',booking_views.RoomViewSet, basename='room')
router.register(r'hotel',booking_views.HotelViewSet, basename='hotel')
router.register(r'reservation', booking_views.ReservationViewSet, basename='reservation')

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('users/', core_views.CustomerAPIView.as_view()),
    path('api-token-auth/', obtain_auth_token), # access to token
]