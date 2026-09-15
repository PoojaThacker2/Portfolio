from rest_framework import serializers
from .models import Post, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class PostListSerializer(serializers.ModelSerializer):
    """Lighter payload for the list endpoint — omits `content` since a page
    of 10 full technical posts would be an unnecessarily large response for
    a view that only renders title/excerpt/tags/reading time."""
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'excerpt', 'cover_image', 'tags',
                   'reading_time_minutes', 'published_at']


class PostDetailSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'content', 'excerpt', 'cover_image',
                   'tags', 'reading_time_minutes', 'meta_description', 'published_at']
        # `content` is raw, unsanitized Markdown by design (see models.py).
        # The security boundary is the frontend renderer: it must render
        # this via a Markdown-to-React pipeline (e.g. react-markdown)
        # WITHOUT a raw-HTML passthrough plugin (no rehype-raw) and must
        # never use dangerouslySetInnerHTML on it. That's what makes fenced
        # code samples containing literal HTML/JSX safe to display as text
        # instead of being executed. Don't add backend HTML sanitization to
        # this field — it cannot distinguish "malicious tag in prose" from
        # "legitimate code sample" and would corrupt technical content.
