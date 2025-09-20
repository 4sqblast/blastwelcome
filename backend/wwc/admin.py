from django.contrib import admin
from .models import WWCAttendee

@admin.register(WWCAttendee)
class WWCAttendeeAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "gender",
                    "membership","attendance_mode",
                    "category","days","heard_from",
                    "timestamp","day1","day2","day3",)
    readonly_fields = ("timestamp",)
    # ordering = ["-timestamp"]