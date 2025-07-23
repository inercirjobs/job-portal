from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from .models import CustomUser
from .serializers import (
    JobSeekerRegisterSerializer,
    HRRegisterSerializer,
    JobSeekerSerializer
)

#  JobSeeker Registration (POST only)
class JobSeekerRegisterView(APIView):
    def post(self, request):
        serializer = JobSeekerRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Job Seeker registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  HR Registration (POST only)
class HRRegisterView(APIView):
    def post(self, request):
        serializer = HRRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "HR registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#  Login API (POST)
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role")

        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if role and user.role != role:
                return Response({"error": f"User is not a {role}."}, status=status.HTTP_403_FORBIDDEN)

            return Response({
                "message": "Login successful",
                "user": {
                    "email": user.email,
                    "role": user.role,
                    "full_name": user.full_name
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

# JobSeeker List API (GET)
class JobSeekerListView(ListAPIView):
    queryset = CustomUser.objects.filter(role='JobSeeker')
    serializer_class = JobSeekerSerializer


