

from rest_framework import serializers
from .models import Job, Application  # 👈 import Application model

#  Existing JobSerializer (already present)
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

#  New: Application Serializer
class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'job', 'message']

