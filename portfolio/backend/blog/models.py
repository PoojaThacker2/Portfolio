from math import ceil

from django.db import models
from django.utils import timezone
from django.utils.text import slugify

WORDS_PER_MINUTE = 200


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(max_length=60, unique=True, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'draft', 'Draft'
        PUBLISHED = 'published', 'Published'

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)

    # Raw Markdown, intentionally unsanitized here — see serializers.py for
    # why: sanitizing this field on the backend would corrupt legitimate
    # code samples (e.g. literal <div> in a fenced code block). The security
    # boundary for this field lives in the frontend's renderer, not here.
    content = models.TextField(help_text='Markdown')

    excerpt = models.CharField(max_length=300, help_text='Short summary shown on the list page')
    cover_image = models.ImageField(upload_to='blog/covers/', blank=True)
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.DRAFT)
    published_at = models.DateTimeField(null=True, blank=True)
    reading_time_minutes = models.PositiveIntegerField(default=1, editable=False)
    meta_description = models.CharField(max_length=160, blank=True, help_text='For SEO/social previews')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._generate_unique_slug()
        self.reading_time_minutes = self._calculate_reading_time()
        if self.status == self.Status.PUBLISHED and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def _generate_unique_slug(self):
        base_slug = slugify(self.title)
        slug = base_slug
        counter = 2
        while Post.objects.exclude(pk=self.pk).filter(slug=slug).exists():
            slug = f'{base_slug}-{counter}'
            counter += 1
        return slug

    def _calculate_reading_time(self):
        word_count = len(self.content.split())
        return max(1, ceil(word_count / WORDS_PER_MINUTE))
