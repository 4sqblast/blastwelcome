from django.contrib import admin

from .models import Guest

@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = (
    "first_name", "last_name", "phone", "email",
    "street_address","state", "country","country_code",
    "age_group", "gender","relationship", "born_again",
    "membership","heard_from","occupation","school",
    "status","date_submitted", 
    )
    readonly_fields = ("date_submitted",)