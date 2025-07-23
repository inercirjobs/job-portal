



# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, ApplyJobView

router = DefaultRouter()
router.register(r'', JobViewSet, basename='job')  # empty string if base is /api/jobs/

urlpatterns = [
    path('', include(router.urls)),
    path('applications/apply/', ApplyJobView.as_view(), name='apply-job'), # gives GET/POST /api/jobs/
      # gives POST /api/jobs/apply/
]
router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')  # /jobs/









