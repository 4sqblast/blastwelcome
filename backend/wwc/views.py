from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from django.http import JsonResponse


from .serializers import WWCAttendeeSerializer
from .models import WWCAttendee

class CreateWWCAttendeeView(generics.CreateAPIView):
    serializer_class = WWCAttendeeSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED) 

class RetrieveWWCAttendeeView(generics.RetrieveAPIView):
    serializer_class = WWCAttendeeSerializer
    queryset = WWCAttendee.objects.all()
    lookup_field = "phone"

class UpdateWWCAttendeeView(generics.UpdateAPIView):
    serializer_class = WWCAttendeeSerializer
    queryset = WWCAttendee.objects.all()
    lookup_field = "phone"

class DeleteWWCAttendeeView(generics.DestroyAPIView):
    serializer_class = WWCAttendeeSerializer
    queryset = WWCAttendee.objects.all()
    lookup_field = "phone"