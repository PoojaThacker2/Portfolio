from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (SkillCategory, Skill, Experience, Project,
                     CaseStudy, Testimonial, ContactMessage,
                     SocialLink, Profile)
from .serializers import (SkillCategorySerializer, SkillSerializer,
                          ExperienceSerializer, ProjectSerializer,
                          CaseStudySerializer, TestimonialSerializer,
                          ContactMessageSerializer, SocialLinkSerializer,
                          ProfileSerializer)


class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.prefetch_related('skills').all()
    serializer_class = SkillCategorySerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ['featured']


class CaseStudyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer
    lookup_field = 'slug'


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(featured=True)
    serializer_class = TestimonialSerializer


class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer


@api_view(['GET'])
def profile_detail(request):
    profile = Profile.objects.first()
    if not profile:
        return Response({'error': 'Profile not found'}, status=404)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['POST'])
def contact_submit(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Thank you for your message! I will get back to you soon.',
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
