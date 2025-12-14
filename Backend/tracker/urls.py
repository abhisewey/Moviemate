from django.urls import path
from .views import ItemListCreateView, ItemDetailView

urlpatterns = [
    path("items/", ItemListCreateView.as_view()),
    path("items/<int:pk>/", ItemDetailView.as_view()),
]
