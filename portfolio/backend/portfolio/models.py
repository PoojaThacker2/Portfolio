from django.db import models

class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = 'Skill Categories'

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(default=80, help_text='0-100')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']

    def __str__(self):
        return f'{self.name} ({self.category.name})'


class Experience(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    achievements = models.TextField(blank=True, help_text='Bullet points separated by newline')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-start_date', 'order']

    def __str__(self):
        return f'{self.title} at {self.company}'


class Project(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    highlights = models.TextField(blank=True, help_text='Bullet points separated by newline')
    technologies = models.CharField(max_length=500, blank=True, help_text='Comma separated')
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True)
    featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-featured']

    def __str__(self):
        return self.title


class CaseStudy(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    technologies = models.CharField(max_length=500, blank=True)
    published_date = models.DateField(auto_now_add=True)
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-published_date', 'order']
        verbose_name_plural = 'Case Studies'

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=200, blank=True)
    company = models.CharField(max_length=200, blank=True)
    avatar = models.ImageField(upload_to='testimonials/', blank=True)
    content = models.TextField()
    rating = models.IntegerField(default=5, help_text='1-5')
    featured = models.BooleanField(default=True)
    created_date = models.DateField(auto_now_add=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-created_date']

    def __str__(self):
        return f'Testimonial from {self.name}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=300)
    message = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_date']

    def __str__(self):
        return f'Message from {self.name}: {self.subject}'


class SocialLink(models.Model):
    platform = models.CharField(max_length=100)
    url = models.URLField()
    icon = models.CharField(max_length=50, blank=True, help_text='Icon class name')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.platform


class Profile(models.Model):
    name = models.CharField(max_length=200, default='Pooja Chande')
    tagline = models.CharField(max_length=300, default='Backend-heavy Full Stack Python Developer')
    experience_years = models.CharField(max_length=50, default='4.5+ Years Experience')
    summary = models.TextField(default='Building scalable backend systems using Python, Django, FastAPI and PostgreSQL.')
    about_text = models.TextField(blank=True)
    resume_file = models.FileField(upload_to='resume/', blank=True)
    github_username = models.CharField(max_length=100, blank=True, default='PoojaThacker2')
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    email = models.EmailField(blank=True)

    class Meta:
        verbose_name_plural = 'Profile'

    def __str__(self):
        return self.name
