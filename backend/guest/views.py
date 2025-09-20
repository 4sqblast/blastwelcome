from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from django.http import JsonResponse


from .serializers import GuestSerializer
from .models import Guest

class CreateGuestView(generics.CreateAPIView):
    serializer_class = GuestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

class RetrieveGuestView(generics.RetrieveAPIView):
    serializer_class = GuestSerializer
    queryset = Guest.objects.all()
    lookup_field = "phone"

class DeleteGuestView(generics.DestroyAPIView):
    serializer_class = GuestSerializer
    queryset = Guest.objects.all()
    lookup_field = "phone"

def cron_view(request):
    return JsonResponse({'status': 'ok'})