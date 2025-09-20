from rest_framework import serializers
from .models import WWCAttendee

class WWCAttendeeSerializer(serializers.ModelSerializer):
    # day1 = serializers.BooleanField(required=False)
    # day2 = serializers.BooleanField(required=False)
    # day3 = serializers.BooleanField(required=False)
    
    class Meta:
        model = WWCAttendee
        fields = "__all__"
        read_only_fields = ("timestamp",)  # ✅ frontend can’t override
