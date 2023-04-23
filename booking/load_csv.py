import csv
from django.contrib.auth.hashers import make_password

def create_bulk_user(request):
    with open(os.path.join(settings.BASE_DIR, 'media', 'core', 'employees.csv')) as f:
        reader = csv.reader(f)
        for row in reader:
            user, created = User.objects.get_or_create(
                username=str(row[0]),

                defaults={
                    'password': make_password('ddff123#'),
                    'first_name': ' '.join(row[1].split()[:-1]),
                    'last_name': str(row[1].split()[-1])
                }
            )
            designation, created = Designation.objects.get_or_create(
                name=str(row[4]), defaults={}
            )
            department, created = Department.objects.get_or_create(
                name=str(row[3])
            )
            user.profile.designation = designation
            user.profile.department = department
            user.profile.proximity_id = str(row[2])
            user.profile.save()

    context = {}
    return render(request, "core/create_bulk_user.html", context)
