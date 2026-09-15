import django_filters
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import Post
from .serializers import PostListSerializer, PostDetailSerializer


class PostPagination(PageNumberPagination):
    # Set per-ViewSet rather than as the project-wide
    # REST_FRAMEWORK['DEFAULT_PAGINATION_CLASS'] — flipping that globally
    # would wrap every existing endpoint's response (skills, projects, etc.)
    # in a paginated envelope, breaking the current frontend code that
    # expects flat arrays from those. This keeps the change scoped to the
    # one endpoint that actually needs it.
    page_size = 10


class PostFilter(django_filters.FilterSet):
    # ?tag= filters by the related Tag's slug, not a direct model field, so
    # this needs an explicit FilterSet rather than the `filterset_fields`
    # shorthand used elsewhere in this project (e.g. ProjectViewSet).
    tag = django_filters.CharFilter(field_name='tags__slug', lookup_expr='exact')

    class Meta:
        model = Post
        fields = ['tag']


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    # Filtered at the queryset level, not in a view conditional or left to
    # the frontend to hide — this is a public, unauthenticated API, so
    # drafts must never be reachable here regardless of how the endpoint is
    # called. ReadOnlyModelViewSet also means POST/PUT/PATCH/DELETE are
    # never registered as valid actions for this route at all (the router
    # only wires up the mixins this class actually includes), independent
    # of DEFAULT_PERMISSION_CLASSES = AllowAny — so this is read-only at the
    # routing level, not just by convention.
    queryset = Post.objects.filter(status=Post.Status.PUBLISHED).prefetch_related('tags')
    lookup_field = 'slug'
    pagination_class = PostPagination
    filterset_class = PostFilter

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer
