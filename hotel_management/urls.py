from django.urls import path, include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# from core import urls
from booking import views as booking_views
from core import views as core_views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from core.views import MyTokenObtainPairView

router = routers.DefaultRouter()

router.register(r'room',booking_views.RoomViewSet, basename='room')
router.register(r'hotel',booking_views.HotelViewSet, basename='hotel')
router.register(r'reservation', booking_views.ReservationViewSet, basename='reservation')

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('api-token-auth/', obtain_auth_token), # access to token
    path('api/token/', core_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('register/', include('core.urls'), name='register')
]

urlpatterns += staticfiles_urlpatterns()