from django.urls import path
from .views import CreateGuestView, RetrieveGuestView, DeleteGuestView, cron_view

urlpatterns = [
    path("create/", CreateGuestView.as_view(), name="create-guest"),
    path("retrieve/<str:phone>/", RetrieveGuestView.as_view(), name="retrieve-guest"),
    path("delete/<str:phone>/", DeleteGuestView.as_view(), name="delete-guest"),
    path("cron_view/", cron_view, name="cron-view"),
]
