from django.contrib import admin
from .models import Post, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ['name']}
    search_fields = ['name']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'published_at', 'reading_time_minutes']
    list_editable = ['status']
    list_filter = ['status', 'tags']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ['title']}
    autocomplete_fields = ['tags']
    readonly_fields = ['reading_time_minutes', 'created_at', 'updated_at']
