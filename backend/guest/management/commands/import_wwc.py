import pandas as pd
from django.core.management.base import BaseCommand
from django.utils import timezone
from wwc.models import WWCAttendee

class Command(BaseCommand):
    help = "Import WWCAttendees from Excel file"

    def add_arguments(self, parser):
        parser.add_argument("file_path", type=str, help="Path to Excel file")

    def handle(self, *args, **options):
        file_path = options["file_path"]
        df = pd.read_excel(file_path)

        for _, row in df.iterrows():
            # Parse Excel date → timezone aware
            raw_date = row.get("timestamp")

            if pd.notna(raw_date):
                if not timezone.is_aware(raw_date):
                    parsed_date = timezone.make_aware(pd.to_datetime(raw_date))
                else:
                    parsed_date = raw_date
            else:
                parsed_date = timezone.now()

            WWCAttendee.objects.update_or_create(
                phone=row["phone"],
                defaults={
                    "name": row["name"],
                    "phone": row["phone"],
                    "email": row["email"],
                    "gender": row["gender"],
                    "membership": row.get("membership", "No"),
                    "attendance_mode": row.get("attendance_mode"),
                    "category": row.get("category"),
                    "days": row.get("days"),
                    "heard_from": row.get("heard_from"),
                    "timestamp": parsed_date,  # ✅ respect Excel’s date
                },
            )