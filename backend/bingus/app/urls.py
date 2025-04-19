from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/wellness/", views.wellness_suggestions_api, name="wellness_suggestions_api"),
]
