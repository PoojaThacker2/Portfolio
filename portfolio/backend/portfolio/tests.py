from datetime import date

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import (
    SkillCategory, Skill, Project, Testimonial, Profile, ContactMessage,
    calculate_experience_years,
)


class ExperienceYearsCalculationTests(APITestCase):
    """Fixed dates in, fixed dates out — independent of when the test
    suite actually runs, unlike testing the live property directly."""

    def test_exactly_two_years_floors_to_one_decimal(self):
        result = calculate_experience_years(date(2020, 1, 1), today=date(2022, 1, 1))
        self.assertEqual(result, '2.0+ Years Experience')

    def test_partial_year_floors_down_not_rounds(self):
        # 2020-01-01 -> 2022-11-01 is ~2.83 years; must read "2.8+", never
        # "2.9+" — the "+" promises "at least", so rounding up would lie.
        result = calculate_experience_years(date(2020, 1, 1), today=date(2022, 11, 1))
        self.assertEqual(result, '2.8+ Years Experience')


class ProfileEndpointTests(APITestCase):
    def test_returns_404_when_no_profile_exists(self):
        response = self.client.get(reverse('profile-detail'))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_returns_profile_fields(self):
        Profile.objects.create(name='Test Person', email='test@example.com')
        response = self.client.get(reverse('profile-detail'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Person')
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_experience_years_is_derived_from_career_start_date(self):
        Profile.objects.create(
            name='Test Person', email='test@example.com',
            career_start_date=date(2020, 1, 1),
        )
        response = self.client.get(reverse('profile-detail'))
        expected = calculate_experience_years(date(2020, 1, 1))
        self.assertEqual(response.data['experience_years'], expected)

    def test_career_start_date_is_not_exposed_on_the_public_api(self):
        Profile.objects.create(name='Test Person', email='test@example.com')
        response = self.client.get(reverse('profile-detail'))
        self.assertNotIn('career_start_date', response.data)


class SkillsEndpointTests(APITestCase):
    def test_skills_nest_under_their_category(self):
        category = SkillCategory.objects.create(name='Backend', order=0)
        Skill.objects.create(category=category, name='Python', order=0)
        Skill.objects.create(category=category, name='Django', order=1)

        response = self.client.get(reverse('skills-list'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Backend')
        self.assertEqual(
            [s['name'] for s in response.data[0]['skills']],
            ['Python', 'Django'],
        )


class ProjectsFilterTests(APITestCase):
    """Regression coverage for the featured=true/false query param filter."""

    def setUp(self):
        Project.objects.create(title='Featured Project', description='...', featured=True)
        Project.objects.create(title='Unfeatured Project', description='...', featured=False)

    def test_no_filter_returns_all_projects(self):
        response = self.client.get(reverse('projects-list'))
        self.assertEqual(len(response.data), 2)

    def test_featured_true_returns_only_featured(self):
        response = self.client.get(reverse('projects-list'), {'featured': 'true'})
        titles = [p['title'] for p in response.data]
        self.assertEqual(titles, ['Featured Project'])

    def test_featured_false_returns_only_unfeatured(self):
        response = self.client.get(reverse('projects-list'), {'featured': 'false'})
        titles = [p['title'] for p in response.data]
        self.assertEqual(titles, ['Unfeatured Project'])


class TestimonialsEndpointTests(APITestCase):
    def test_only_featured_testimonials_are_returned(self):
        Testimonial.objects.create(name='Shown', content='Great work.', featured=True)
        Testimonial.objects.create(name='Hidden', content='Not shown.', featured=False)

        response = self.client.get(reverse('testimonials-list'))
        names = [t['name'] for t in response.data]

        self.assertEqual(names, ['Shown'])


class ContactSubmitTests(APITestCase):
    def test_valid_submission_creates_message_and_returns_201(self):
        payload = {
            'name': 'Jane Recruiter',
            'email': 'jane@example.com',
            'subject': 'Job opportunity',
            'message': "Let's talk.",
        }
        response = self.client.post(reverse('contact-submit'), payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.first().email, 'jane@example.com')

    def test_missing_required_field_returns_400_and_no_message_saved(self):
        payload = {'name': 'Jane Recruiter', 'email': 'jane@example.com'}
        response = self.client.post(reverse('contact-submit'), payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)


class CaseStudyLookupTests(APITestCase):
    def test_case_study_is_retrieved_by_slug_not_id(self):
        from .models import CaseStudy
        CaseStudy.objects.create(title='A Deep Dive', slug='a-deep-dive')

        response = self.client.get(
            reverse('case-studies-detail', kwargs={'slug': 'a-deep-dive'})
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'A Deep Dive')
