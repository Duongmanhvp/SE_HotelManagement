from django.urls import path, include
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import TemplateView

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from booking import views as booking_views
from management import views as management_views

from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

schema_view = get_schema_view(
    openapi.Info(
        title="Hotel Management API",
        default_version="1.0.0",
        description="API for hotel management"
    ),
    public=True
)

router = routers.SimpleRouter()

# viewsets
router.register(r'hotel',booking_views.HotelViewSet, basename='hotel')
router.register(r'reservation', booking_views.ReservationViewSet, basename='reservation')
router.register(r'hotel-manager', management_views.HotelManagerView, basename='hotel-manager')

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    path('swagger-ui/', schema_view.with_ui('swagger', cache_timeout=0), name='swagger_schema'),

    # view routing
    path('', include('core.urls'), name='core'),
    path('management/', include('management.urls'), name='management'),

    # jwt token api
    path('api-token-auth/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]

urlpatterns += staticfiles_urlpatterns()