from rest_framework import serializers
from .models import (SkillCategory, Skill, Experience, Project,
                     CaseStudy, Testimonial, ContactMessage,
                     SocialLink, Profile)


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'proficiency', 'order']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = SkillCategory
        fields = ['id', 'name', 'order', 'skills']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'title', 'company', 'location', 'start_date',
                  'end_date', 'current', 'description', 'achievements', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title', 'subtitle', 'description', 'highlights',
                  'technologies', 'github_url', 'live_url', 'image',
                  'featured', 'order']


class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = ['id', 'title', 'slug', 'excerpt', 'content',
                  'technologies', 'published_date', 'featured', 'order']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'title', 'company', 'avatar',
                  'content', 'rating', 'featured', 'order']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_date', 'read']
        read_only_fields = ['created_date', 'read']


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'url', 'icon', 'order']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'tagline', 'experience_years', 'summary',
                  'about_text', 'resume_file', 'github_username',
                  'linkedin_url', 'github_url', 'email']
