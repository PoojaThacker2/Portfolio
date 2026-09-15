from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Post, Tag


class DraftVisibilityTests(APITestCase):
    """The one that actually matters: drafts must never be reachable
    through the public API, in list or detail, regardless of how the
    endpoint is queried."""

    def setUp(self):
        self.published = Post.objects.create(
            title='Published Post', content='word ' * 50, excerpt='...',
            status=Post.Status.PUBLISHED,
        )
        self.draft = Post.objects.create(
            title='Draft Post', content='word ' * 50, excerpt='...',
            status=Post.Status.DRAFT,
        )

    def test_draft_excluded_from_list(self):
        response = self.client.get(reverse('blog-posts-list'))
        titles = [p['title'] for p in response.data['results']]
        self.assertIn('Published Post', titles)
        self.assertNotIn('Draft Post', titles)

    def test_draft_not_reachable_by_slug(self):
        response = self.client.get(
            reverse('blog-posts-detail', kwargs={'slug': self.draft.slug})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_published_post_reachable_by_slug(self):
        response = self.client.get(
            reverse('blog-posts-detail', kwargs={'slug': self.published.slug})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Published Post')


class SlugTests(APITestCase):
    def test_slug_auto_generated_from_title(self):
        post = Post.objects.create(
            title='Scaling Django with Redis', content='word ' * 10, excerpt='...',
        )
        self.assertEqual(post.slug, 'scaling-django-with-redis')

    def test_duplicate_title_gets_unique_slug(self):
        first = Post.objects.create(title='Same Title', content='x', excerpt='...')
        second = Post.objects.create(title='Same Title', content='y', excerpt='...')
        self.assertEqual(first.slug, 'same-title')
        self.assertEqual(second.slug, 'same-title-2')
        self.assertNotEqual(first.slug, second.slug)

    def test_explicit_slug_is_not_overwritten(self):
        post = Post.objects.create(
            title='Some Title', slug='custom-slug', content='x', excerpt='...',
        )
        self.assertEqual(post.slug, 'custom-slug')


class ReadingTimeTests(APITestCase):
    def test_reading_time_calculated_from_word_count(self):
        post = Post.objects.create(
            title='Long Post', content='word ' * 400, excerpt='...',
        )
        self.assertEqual(post.reading_time_minutes, 2)  # 400 words / 200 wpm

    def test_reading_time_minimum_is_one(self):
        post = Post.objects.create(
            title='Tiny Post', content='word', excerpt='...',
        )
        self.assertEqual(post.reading_time_minutes, 1)


class PublishedAtTests(APITestCase):
    def test_published_at_set_on_first_publish(self):
        post = Post.objects.create(
            title='Draft Then Published', content='x', excerpt='...',
            status=Post.Status.DRAFT,
        )
        self.assertIsNone(post.published_at)

        post.status = Post.Status.PUBLISHED
        post.save()
        self.assertIsNotNone(post.published_at)

    def test_republishing_does_not_move_published_at(self):
        post = Post.objects.create(
            title='Stable Date', content='x', excerpt='...',
            status=Post.Status.PUBLISHED,
        )
        original_published_at = post.published_at

        post.title = 'Stable Date Edited'
        post.save()

        post.refresh_from_db()
        self.assertEqual(post.published_at, original_published_at)


class PaginationTests(APITestCase):
    def setUp(self):
        for i in range(15):
            Post.objects.create(
                title=f'Post {i}', content='x', excerpt='...',
                status=Post.Status.PUBLISHED,
            )

    def test_list_is_paginated_at_page_size_10(self):
        response = self.client.get(reverse('blog-posts-list'))
        self.assertEqual(len(response.data['results']), 10)
        self.assertEqual(response.data['count'], 15)
        self.assertIsNotNone(response.data['next'])

    def test_second_page_returns_remainder(self):
        response = self.client.get(reverse('blog-posts-list'), {'page': 2})
        self.assertEqual(len(response.data['results']), 5)
        self.assertIsNone(response.data['next'])


class TagFilterTests(APITestCase):
    def setUp(self):
        self.django_tag = Tag.objects.create(name='Django')
        self.redis_tag = Tag.objects.create(name='Redis')

        self.django_post = Post.objects.create(
            title='Django Post', content='x', excerpt='...',
            status=Post.Status.PUBLISHED,
        )
        self.django_post.tags.add(self.django_tag)

        self.redis_post = Post.objects.create(
            title='Redis Post', content='x', excerpt='...',
            status=Post.Status.PUBLISHED,
        )
        self.redis_post.tags.add(self.redis_tag)

    def test_filtering_by_tag_slug_returns_only_matching_posts(self):
        response = self.client.get(reverse('blog-posts-list'), {'tag': 'django'})
        titles = [p['title'] for p in response.data['results']]
        self.assertEqual(titles, ['Django Post'])

    def test_unknown_tag_returns_empty_results(self):
        response = self.client.get(reverse('blog-posts-list'), {'tag': 'nonexistent'})
        self.assertEqual(response.data['results'], [])
