from django.db import models

class Item(models.Model):
    TYPE_CHOICES = (
        ("movie", "Movie"),
        ("tv", "TV Show"),
    )

    STATUS_CHOICES = (
        ("watching", "Watching"),
        ("completed", "Completed"),
        ("wishlist", "Wishlist"),
    )

    title = models.CharField(max_length=200)
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    director = models.CharField(max_length=200, blank=True)
    genre = models.CharField(max_length=100)
    platform = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    total_episodes = models.IntegerField(null=True, blank=True)
    episodes_watched = models.IntegerField(default=0)

    rating = models.IntegerField(null=True, blank=True)
    review = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
