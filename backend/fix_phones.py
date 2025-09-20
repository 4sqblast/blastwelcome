import os
import django
from django.db.utils import IntegrityError

# Setup Django environment (adjust your project name)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from wwc.models import WWCAttendee

def fix_phone_numbers():
    guests = WWCAttendee.objects.exclude(phone__startswith='+234')
    updated_count = 0
    skipped_count = 0

    for guest in guests:
        original = guest.phone.strip() if guest.phone else ''

        if original.startswith('0'):
            new_phone = '+234' + original[1:]
        elif original.startswith('234'):
            new_phone = '+' + original
        else:
            continue  # skip if it doesn't match known patterns

        if new_phone != original:
            guest.phone = new_phone
            try:
                guest.save()  # Save individually to catch duplicates
                print(f"✅ Updated {original} → {new_phone}")
                updated_count += 1
            except IntegrityError:
                print(f"⚠ Skipped duplicate phone: {new_phone}")
                skipped_count += 1

    print(f"\nSummary: {updated_count} updated, {skipped_count} skipped.")

if __name__ == "__main__":
    fix_phone_numbers()
