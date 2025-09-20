from django.db import models
from django.utils import timezone

class WWCAttendee(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, null=True, blank=True) 
    gender = models.CharField(max_length=20)
    membership = models.CharField(default="No")
    attendance_mode = models.CharField(max_length=100, default="In Person")
    category = models.CharField(max_length=50, default="Already a member")
    days = models.CharField(max_length=100,null=True, blank=True)
    heard_from = models.CharField(max_length=100, null=True, blank=True) 
    timestamp = models.DateTimeField(default=timezone.now)
    day1 = models.BooleanField(default=False)
    day2 = models.BooleanField(default=False)
    day3 = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.phone}"