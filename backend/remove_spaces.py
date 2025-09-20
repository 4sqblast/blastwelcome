import os
import django
from django.db.utils import IntegrityError

# Setup Django environment (adjust your project name)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from wwc.models import WWCAttendee

def remove_phone_spaces():
    # Only fetch phones that actually have spaces
    guests = WWCAttendee.objects.filter(phone__contains=' ')
    updated_count = 0
    skipped_count = 0

    for guest in guests:
        original = guest.phone.strip() if guest.phone else ''
        new_phone = original.replace(' ', '')  # remove all spaces

        if new_phone != original:
            guest.phone = new_phone
            try:
                guest.save()
                print(f"✅ Updated {original} → {new_phone}")
                updated_count += 1
            except IntegrityError:
                print(f"⚠ Skipped duplicate phone: {new_phone}")
                skipped_count += 1

    print(f"\nSummary: {updated_count} updated, {skipped_count} skipped.")

if __name__ == "__main__":
    remove_phone_spaces()
