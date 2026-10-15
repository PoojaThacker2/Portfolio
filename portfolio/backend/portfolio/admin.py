from django.contrib import admin
from .models import (SkillCategory, Skill, Experience, Project,
                     CaseStudy, Testimonial, ContactMessage,
                     SocialLink, Profile)


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    list_editable = ['order']
    search_fields = ['name']


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'order']
    list_filter = ['category']
    list_editable = ['proficiency', 'order']
    search_fields = ['name']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'start_date', 'end_date', 'current', 'order']
    list_filter = ['current', 'company']
    list_editable = ['order']
    search_fields = ['title', 'company']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'featured', 'order']
    list_filter = ['featured']
    list_editable = ['featured', 'order']
    search_fields = ['title', 'description']


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ['title', 'published_date', 'featured', 'order']
    list_filter = ['featured']
    list_editable = ['featured', 'order']
    prepopulated_fields = {'slug': ['title']}
    search_fields = ['title', 'excerpt']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'company', 'rating', 'featured', 'order']
    list_filter = ['featured', 'rating']
    list_editable = ['featured', 'rating', 'order']
    search_fields = ['name', 'content']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_date', 'read']
    list_filter = ['read', 'created_date']
    list_editable = ['read']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_date']


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['platform', 'url', 'order']
    list_editable = ['order']
    search_fields = ['platform']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'tagline', 'career_start_date', 'experience_years', 'email']
    readonly_fields = ['experience_years']
