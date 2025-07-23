
from rest_framework import serializers
from .models import CustomUser

#  JobSeeker GET Serializer
class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'full_name', 'email', 'phone', 'skills', 'experience']

# Common Base (for both registrations)
class BaseRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        return CustomUser.objects.create_user(**validated_data)

#  JobSeeker Registration
class JobSeekerRegisterSerializer(BaseRegisterSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'full_name', 'email', 'password', 'confirm_password',
            'role', 'phone', 'skills', 'experience'
        ]

    def validate(self, data):
        data = super().validate(data)
        if data.get('role') != 'JobSeeker':
            raise serializers.ValidationError("Role must be JobSeeker.")
        if not data.get('skills') or not data.get('experience'):
            raise serializers.ValidationError("Skills and experience are required for job seekers.")
        return data

#  HR Registration
class HRRegisterSerializer(BaseRegisterSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'full_name', 'email', 'password', 'confirm_password',
            'role', 'phone', 'company_name', 'company_website', 'company_description'
        ]

    def validate(self, data):
        data = super().validate(data)
        if data.get('role') != 'HR':
            raise serializers.ValidationError("Role must be HR.")
        if not data.get('company_name') or not data.get('company_description'):
            raise serializers.ValidationError("Company name and description are required for HR.")
        return data
