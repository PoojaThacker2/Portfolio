from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'skills', views.SkillCategoryViewSet, basename='skills')
router.register(r'experiences', views.ExperienceViewSet, basename='experiences')
router.register(r'projects', views.ProjectViewSet, basename='projects')
router.register(r'case-studies', views.CaseStudyViewSet, basename='case-studies')
router.register(r'testimonials', views.TestimonialViewSet, basename='testimonials')
router.register(r'social-links', views.SocialLinkViewSet, basename='social-links')

urlpatterns = [
    path('', include(router.urls)),
    path('profile/', views.profile_detail, name='profile-detail'),
    path('contact/', views.contact_submit, name='contact-submit'),
]
