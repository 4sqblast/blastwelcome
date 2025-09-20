from rest_framework import serializers
from .models import Guest

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = "__all__"
        read_only_fields = ("date_submitted",)  # ✅ frontend can’t override

    def validate_phone(self, value):
        if Guest.objects.filter(phone=value).exists():
            raise serializers.ValidationError("Guest with this phone already exists.")
        return value