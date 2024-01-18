from django.urls import path
from .views import password
urlpatterns = [
    path("", password, name="password"),
]