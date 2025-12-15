from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer


class ItemListCreateView(generics.ListCreateAPIView):
    queryset = Item.objects.all().order_by("-created_at")
    serializer_class = ItemSerializer


class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

# ai logic
@api_view(['GET'])
def recommendations(request):
    # 1. Get completed & rated items
    watched_items = Item.objects.filter(
        status='completed',
        rating__isnull=False
    )

    if not watched_items.exists():
        return Response([])

    # 2. Find most liked genre (simple logic)
    genre_scores = {}
    for item in watched_items:
        genre_scores[item.genre] = genre_scores.get(item.genre, 0) + item.rating

    top_genre = max(genre_scores, key=genre_scores.get)

    # 3. Recommend items of same genre not yet completed
    recommended = Item.objects.filter(
        genre=top_genre
    ).exclude(status='completed')[:5]

    serializer = ItemSerializer(recommended, many=True)
    return Response(serializer.data)
