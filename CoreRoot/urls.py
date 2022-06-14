from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from core.views import front

urlpatterns = [
    path('api/', include(('core.routers', 'core'), namespace='core-api')),
    path('api/', include('api.urls')),
    path("", front, name='front'),
    path("main/", front, name='front'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)