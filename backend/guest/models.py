from django.db import models
from django.utils import timezone

class Guest(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(max_length=50, null=True, blank=True) 
    street_address = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    country_code = models.CharField(max_length=10, default="NG")
    age_group = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=20)
    relationship = models.CharField(max_length=20, default="Single")
    born_again = models.CharField(default="No")
    membership = models.CharField(default="No")
    heard_from = models.CharField(max_length=100, null=True, blank=True) 
    occupation = models.CharField(max_length=100, null=True, blank=True)
    school = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(default="Submitted")
    date_submitted = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
