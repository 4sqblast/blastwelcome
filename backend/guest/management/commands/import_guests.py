import pandas as pd
from django.core.management.base import BaseCommand
from django.utils import timezone
from guest.models import Guest

class Command(BaseCommand):
    help = "Import guests from Excel file"

    def add_arguments(self, parser):
        parser.add_argument("file_path", type=str, help="Path to Excel file")

    def handle(self, *args, **options):
        file_path = options["file_path"]
        df = pd.read_excel(file_path)

        for _, row in df.iterrows():
            # Parse Excel date → timezone aware
            raw_date = row.get("date_submitted")

            if pd.notna(raw_date):
                if not timezone.is_aware(raw_date):
                    parsed_date = timezone.make_aware(pd.to_datetime(raw_date))
                else:
                    parsed_date = raw_date
            else:
                parsed_date = timezone.now()

            Guest.objects.update_or_create(
                phone=row["phone"],
                defaults={
                    "first_name": row["first_name"],
                    "last_name": row["last_name"],
                    "email": row["email"],
                    "street_address": row.get("street_address"),
                    "state": row.get("state"),
                    "country": row.get("country"),
                    "country_code": row.get("country_code", "NG"),
                    "age_group": row.get("age_group"),
                    "gender": row["gender"],
                    "relationship": row.get("relationship", "Single"),
                    "born_again": row.get("born_again", "No"),
                    "membership": row.get("membership", "No"),
                    "heard_from": row.get("heard_from"),
                    "occupation": row.get("occupation"),
                    "school": row.get("school"),
                    "status": row.get("status", "Submitted"),
                    "date_submitted": parsed_date,  # ✅ respect Excel’s date
                },
            )