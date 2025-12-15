from django.urls import path
from .views import (
    ItemListCreateView,
    ItemDetailView,
    recommendations,
)

urlpatterns = [
    path("items/", ItemListCreateView.as_view()),
    path("items/<int:pk>/", ItemDetailView.as_view()),
    path("recommendations/", recommendations),
]
