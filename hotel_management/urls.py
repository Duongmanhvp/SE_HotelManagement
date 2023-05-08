from django.urls import path, include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from core import views as core_views
from booking import views as booking_views
from management import views as management_views

from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

router = routers.SimpleRouter()

# viewsets
# router.register(r'user', core_views.UserProfileSerializer, basename='user')
router.register(r'hotel',booking_views.HotelViewSet, basename='hotel')
router.register(r'reservation', booking_views.ReservationViewSet, basename='reservation')
router.register(r'hotel-manager', management_views.HotelManagerView, basename='management')

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),

    # view routing
    path('', include('core.urls'), name='core'),
    path('hotel-manager/', include('management.urls'), name='management'),

    # jwt token api
    path('api-token-auth/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]

urlpatterns += staticfiles_urlpatterns()