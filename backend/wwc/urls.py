from django.urls import path
from .views import CreateWWCAttendeeView, RetrieveWWCAttendeeView, UpdateWWCAttendeeView, DeleteWWCAttendeeView

urlpatterns = [
    path("create/", CreateWWCAttendeeView.as_view(), name="create-wwc-attendee"),
    path("retrieve/<str:phone>/", RetrieveWWCAttendeeView.as_view(), name="retrieve-wwc-attendee"),
    path("update/<str:phone>/", UpdateWWCAttendeeView.as_view(), name="update-wwc-attendee"),
    path("delete/<str:phone>/", DeleteWWCAttendeeView.as_view(), name="delete-wwc-attendee"),
]