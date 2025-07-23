


from django.urls import path
from .views import (
    JobSeekerRegisterView,
    HRRegisterView,
    LoginView,
    JobSeekerListView
)

urlpatterns = [
    path('register/jobseeker/', JobSeekerRegisterView.as_view(), name='register-jobseeker'),
    path('register/hr/', HRRegisterView.as_view(), name='register-hr'),
    path('login/', LoginView.as_view(), name='login'),
    path('jobseekers/', JobSeekerListView.as_view(), name='jobseeker-list'),


]
