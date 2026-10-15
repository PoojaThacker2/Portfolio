from datetime import date

from django.core.management.base import BaseCommand
from portfolio.models import (
    Profile, SkillCategory, Skill, Experience,
    Project, CaseStudy, Testimonial, SocialLink
)


class Command(BaseCommand):
    help = 'Seed the database with initial portfolio data'

    def handle(self, *args, **options):
        self._create_profile()
        self._create_skills()
        self._create_experiences()
        self._create_projects()
        self._create_case_studies()
        self._create_testimonials()
        self._create_social_links()
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    def _create_profile(self):
        Profile.objects.update_or_create(
            name='Pooja Chande',
            defaults={
                'tagline': 'Senior Python Backend Engineer',
                'career_start_date': date(2022, 1, 1),
                'summary': 'Building scalable APIs, microservices and production-grade backend systems with Python.',
                'about_text': (
                    "I'm a Python Backend Engineer with hands-on experience designing and "
                    'building scalable APIs, microservices and backend systems for production '
                    'applications.\n\n'
                    'My work spans Django, FastAPI, PostgreSQL, Redis, Celery and Docker, with a '
                    'focus on system design, performance, reliability and maintainable architecture.\n\n'
                    'I enjoy solving problems involving distributed systems, asynchronous '
                    'processing, caching, multi-tenant architecture and API scalability.\n\n'
                    'Previously worked as an Assistant Professor before transitioning into '
                    'software engineering.'
                ),
                'github_username': 'PoojaThacker2',
                'linkedin_url': 'https://www.linkedin.com/in/poojachande',
                'github_url': 'https://github.com/PoojaThacker2',
                'email': 'poojachande22@gmail.com',
            }
        )

    def _create_skills(self):
        categories_data = {
            'Backend & Frameworks': [
                'Python', 'Django', 'Django REST Framework (DRF)', 'FastAPI', 'REST APIs',
                'Microservices', 'API Integration', 'Celery', 'Celery Beat', 'Redis',
            ],
            'Frontend': [
                'Vue.js', 'Vuex', 'Vue Router', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap Vue', 'React',
            ],
            'Databases': [
                'PostgreSQL', 'MySQL', 'SQL', 'SQLAlchemy', 'Alembic',
            ],
            'Cloud & DevOps': [
                'AWS EC2', 'AWS Lambda', 'AWS SageMaker', 'Docker', 'Kubernetes',
                'Jenkins', 'CI/CD', 'Kafka', 'Nginx',
            ],
            'Data & ML': [
                'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV',
            ],
            'Testing & Quality': [
                'Pytest', 'Unit Testing', 'Code Review', 'OWASP Security Standards',
            ],
            'Tools & Collaboration': [
                'Agile', 'Git', 'GitHub', 'GitLab', 'JIRA', 'Postman', 'Swagger/OpenAPI', 'Mentoring',
            ],
        }

        # Existing categories/skills are wiped and recreated on every run so stale
        # entries from earlier seed versions never linger alongside the current set.
        SkillCategory.objects.exclude(name__in=categories_data.keys()).delete()

        for order, (cat_name, skills) in enumerate(categories_data.items()):
            category, _ = SkillCategory.objects.update_or_create(
                name=cat_name,
                defaults={'order': order}
            )
            category.skills.exclude(name__in=skills).delete()
            for skill_order, skill_name in enumerate(skills):
                Skill.objects.update_or_create(
                    name=skill_name,
                    category=category,
                    defaults={'order': skill_order},
                )

    def _create_experiences(self):
        experiences = [
            {
                'title': 'Senior Python Developer',
                'company': 'MSBC Group',
                'location': 'Ahmedabad, Gujarat',
                'start_date': '2025-08-01',
                'end_date': '2026-05-31',
                'current': False,
                'achievements': (
                    'Owned end-to-end backend development for a multi-tenant hospitality platform built on '
                    'Django microservices architecture, independently delivering 5 production-grade '
                    'microservices and 70+ REST APIs\n'
                    'Designed and developed scalable microservices for authentication, hotel operations, '
                    'notifications, workflow automation, and API integrations, ensuring secure tenant '
                    'isolation and maintainable architecture\n'
                    'Engineered asynchronous processing using Celery, Celery Beat, Redis, and Kafka to '
                    'automate weather integrations, notifications, and scheduled workflows\n'
                    'Managed QA and production deployment support with Jenkins across Kubernetes-based QA '
                    'environments and AWS EC2 production servers, including troubleshooting, deployment '
                    'validation, and issue resolution\n'
                    'Enforced OWASP security standards, optimized backend performance, collaborated with AI '
                    'engineers to integrate chatbot services via REST APIs, and built CLI scaffolding tools '
                    'for Django/FastAPI to accelerate engineering productivity'
                ),
            },
            {
                'title': 'Solution Developer',
                'company': 'Innovya Technologies',
                'location': 'US (Remote)',
                'start_date': '2023-04-01',
                'end_date': '2025-06-30',
                'achievements': (
                    'Owned the Facilities, Chains, Services, Appeals, and Cases modules end-to-end on '
                    'RevKeep, a US healthcare audit and monitoring platform — building reusable Vue.js '
                    'components with Vuex for state management, Vue Router for navigation, and props/emit '
                    'plus provide/inject for component communication\n'
                    "Worked across both Options API (legacy modules) and Composition API (modernized "
                    "modules) while contributing to backend modernization of RevKeep's legacy CakePHP "
                    'application, designing and deploying 30+ REST APIs using FastAPI and Django REST '
                    'Framework\n'
                    'Integrated machine learning models into backend applications through scalable REST '
                    'APIs, reducing prediction latency by 40% while supporting production business workflows\n'
                    'Improved code quality by refactoring legacy codebases and raising test coverage by 25% '
                    'through modularization and Pytest-based unit testing; maintained GitHub repositories '
                    'and CI/CD pipeline configuration\n'
                    'Built a US financial-market prediction application with Python-based data visualization '
                    'interfaces; collaborated with frontend and cross-functional teams to deliver end-to-end '
                    'product features in Agile environments'
                ),
            },
            {
                'title': 'Python Developer',
                'company': 'Arkay Apps',
                'location': 'Kutch, Gujarat',
                'start_date': '2022-01-01',
                'end_date': '2023-03-31',
                'achievements': (
                    'Developed scalable backend applications using Django and FastAPI, delivering CRUD '
                    'APIs for web and mobile platforms with optimized database performance\n'
                    'Built 10+ modular API modules using FastAPI and SQLAlchemy ORM, integrating '
                    'third-party services (email, SMS, payments) across construction/property, trust/event, '
                    'and maritime-industry workflows\n'
                    'Optimized PostgreSQL/MySQL queries and ORM models, reducing database call time by 30%; '
                    'implemented JWT authentication, role/operation-level authorization, and Alembic '
                    'migrations\n'
                    'Wrote and maintained technical documentation for internal APIs and data workflows; '
                    'conducted peer code reviews and mentored junior developers on Django best practices '
                    'and Git workflows'
                ),
            },
            {
                'title': 'Assistant Professor',
                'company': 'KSKV Kachchh University',
                'location': 'Kutch, Gujarat',
                'start_date': '2014-02-01',
                'end_date': '2021-07-31',
                'achievements': (
                    'Delivered undergraduate courses in Python, C++, DBMS, Networking, and Software '
                    'Engineering; mentored 3,000+ students and guided 20+ full-stack/Python academic '
                    'projects\n'
                    'Served as Head of Department (BCA), managing academic operations, examinations, and '
                    'professional development for 300+ students'
                ),
            },
        ]

        current_keys = [(exp['title'], exp['company']) for exp in experiences]
        for old in Experience.objects.all():
            if (old.title, old.company) not in current_keys:
                old.delete()

        for order, exp in enumerate(experiences):
            Experience.objects.update_or_create(
                title=exp['title'],
                company=exp['company'],
                defaults={**exp, 'order': order},
            )

    def _create_projects(self):
        projects = [
            {
                'title': 'AI-Based Real Estate Valuation System',
                'subtitle': 'ML-Powered Property Price Predictor',
                'description': (
                    'A Django-based prediction system estimating property values from '
                    'location, area, materials, and cost parameters.'
                ),
                'highlights': (
                    'Built a Django-based prediction system estimating property values from '
                    'location, area, materials, and cost parameters\n'
                    'Applied feature engineering with Pandas, StandardScaler, and '
                    'PolynomialFeatures; evaluated Random Forest, SVR, Ridge, Lasso, and KNN models\n'
                    'Integrated the ML workflow with Django ORM and REST APIs for '
                    'application-level valuation predictions'
                ),
                'technologies': 'Python, Django, PostgreSQL, Scikit-learn, Pandas',
                'featured': True,
                'order': 0,
            },
            {
                'title': 'Temple Trust, Events & Resource Management Platform',
                'subtitle': 'Trust & Membership Operations Backend',
                'description': (
                    'Backend services covering trusts, trustees, memberships, services, '
                    'donations, and operational resources, with a React frontend.'
                ),
                'highlights': (
                    'Developed backend services covering trusts, trustees, memberships, '
                    'services, donations, and operational resources\n'
                    'Built REST APIs with FastAPI and SQLAlchemy for CRUD, search, filtering, '
                    'pagination, and sorting; implemented JWT auth and role-based authorization\n'
                    'Added document/media handling and PDF generation, supporting a React '
                    'frontend via REST APIs'
                ),
                'technologies': 'Python, FastAPI, SQLAlchemy, MySQL, Alembic, React',
                'featured': True,
                'order': 1,
            },
            {
                'title': 'Image-Based Painting Recommendation System (SOAL)',
                'subtitle': 'CNN-Powered Artwork Similarity Engine',
                'description': (
                    'An image-similarity recommendation system for an artwork marketplace '
                    'using CNN-based image feature analysis.'
                ),
                'highlights': (
                    'Contributed to backend development of an image-similarity recommendation '
                    'system for an artwork marketplace using CNN-based image feature analysis\n'
                    'Developed and deployed serverless APIs on AWS Lambda, supporting model '
                    'inference workflows via AWS SageMaker'
                ),
                'technologies': 'Python, CNN, AWS SageMaker, AWS Lambda',
                'featured': True,
                'order': 2,
            },
            {
                'title': 'US Capital Market Prediction Application',
                'subtitle': 'Financial Market Visualization Suite',
                'description': (
                    'Python desktop and web interfaces for a US financial-market prediction '
                    'application, including candlestick-chart visualizations of market data.'
                ),
                'highlights': (
                    'Built Python desktop and web interfaces for a US financial-market '
                    'prediction application, including candlestick-chart visualizations of '
                    'market data\n'
                    'Explored multiple Python GUI/visualization frameworks (Tkinter, PyQt, '
                    'Kivy, Streamlit) to prototype and compare data-presentation approaches'
                ),
                'technologies': 'Python, Tkinter, PyQt, Kivy, Streamlit',
                'featured': True,
                'order': 3,
            },
        ]

        current_titles = [p['title'] for p in projects]
        Project.objects.exclude(title__in=current_titles).delete()

        for project in projects:
            Project.objects.update_or_create(
                title=project['title'],
                defaults=project,
            )

    def _create_case_studies(self):
        case_studies = [
            {
                'title': 'How I Optimized Django APIs for High Traffic',
                'slug': 'optimize-django-apis',
                'excerpt': 'Techniques to reduce API response times by 87% using select_related, prefetch_related, database indexing and Redis caching.',
                'content': (
                    '## Problem\n\n'
                    "Our hotel management platform's REST APIs slowed down significantly under "
                    'load — some endpoints took over 3 seconds to respond, most of it from Django '
                    'ORM N+1 query patterns and unindexed lookups.\n\n'
                    '## Context\n\n'
                    'The platform serves 70+ REST APIs across 5+ Django microservices for a '
                    'multi-tenant hospitality product, so a slow endpoint compounds across every '
                    'tenant hitting it concurrently.\n\n'
                    '## Engineering Challenge\n\n'
                    'Nested serializers were triggering a database query per related object, and '
                    'several list endpoints had no pagination, so response size and query count '
                    'both grew with data volume.\n\n'
                    '## Approach\n\n'
                    '1. **Query Optimization**: Replaced implicit related-object lookups with '
                    'select_related and prefetch_related to collapse N+1 patterns into a fixed '
                    'number of queries\n'
                    '2. **Database Indexing**: Added composite indexes on the fields most '
                    'frequently used in filters and ordering\n'
                    '3. **Redis Caching**: Cached expensive, infrequently-changing query results '
                    'with a defined TTL\n'
                    '4. **Pagination**: Replaced full-table responses with cursor-based '
                    'pagination\n\n'
                    '## Result\n\n'
                    'Average response time dropped from 3.2s to 0.4s — an 87% improvement — '
                    "without changing the API's response shape for existing clients.\n\n"
                    '## Lessons Learned\n\n'
                    'Query optimization and caching solve different problems: indexing and '
                    'select_related/prefetch_related fix the query pattern itself, while caching '
                    'only helps once the query is already efficient. Fixing the N+1 pattern first '
                    "made the caching layer far more effective, since it wasn't compensating for "
                    'wasted work.'
                ),
                'technologies': 'Django, PostgreSQL, Redis',
                'featured': True,
                'order': 0,
            },
            {
                'title': 'Redis Caching Strategy for Microservices',
                'slug': 'redis-caching-microservices',
                'excerpt': 'Implementing a shared caching layer across 5 Django microservices, cutting database load by 70%.',
                'content': (
                    '## Problem\n\n'
                    '5 Django microservices each ran independent database queries for the same '
                    'frequently-requested data (hotel and tenant configuration, mostly-static '
                    'lookups), creating redundant database load across the platform.\n\n'
                    '## Context\n\n'
                    "As a multi-tenant hospitality platform, static reference data doesn't change "
                    'often per tenant, but is read on nearly every request — a textbook case for '
                    'a shared caching layer rather than per-service query optimization alone.\n\n'
                    '## Architecture\n\n'
                    'Introduced Redis as a shared caching layer sitting between each Django '
                    'service and PostgreSQL, so a cache hit in one service benefits from a write '
                    'made by another.\n\n'
                    '## Key Technical Decisions\n\n'
                    '1. **Cache-Aside**: Each service checks Redis before querying PostgreSQL, '
                    'and populates the cache on a miss — kept the caching logic explicit rather '
                    'than transparent, so cache behavior stays easy to reason about per '
                    'endpoint\n'
                    '2. **Write-Through Invalidation**: Writes invalidate the relevant cache keys '
                    'immediately rather than waiting for TTL expiry, to avoid serving stale '
                    'tenant configuration after an update\n'
                    '3. **TTL Management**: Configurable expiration per data type, so highly '
                    'static data (e.g. tenant settings) gets a longer TTL than data that changes '
                    'more often\n\n'
                    '## Result\n\n'
                    'Reduced database load by 70% and improved API response times by 65% across '
                    'the affected endpoints.\n\n'
                    '## Lessons Learned\n\n'
                    'Cache invalidation is the harder half of caching — the read path is '
                    'straightforward, but getting invalidation right (especially across multiple '
                    'services sharing one cache) is what actually determines whether the cache is '
                    'trustworthy. Being deliberate about TTL per data type turned out to matter '
                    'as much as the caching layer itself.'
                ),
                'technologies': 'Redis, Django, Docker',
                'featured': True,
                'order': 1,
            },
            {
                'title': 'Building Celery for Background Job Processing',
                'slug': 'celery-background-jobs',
                'excerpt': 'Decoupling notifications, scheduled syncs and background work from the request/response cycle with Celery and Redis.',
                'content': (
                    '## Problem\n\n'
                    'Email notifications, report generation, and data synchronization were '
                    "running synchronously inside the request/response cycle, blocking API "
                    "responses on work that didn't need to happen immediately.\n\n"
                    '## Context\n\n'
                    "The platform's asynchronous workloads span automated weather integrations, "
                    'notifications, and scheduled workflows — a mix of one-off background jobs '
                    'and work that needs to run on a schedule.\n\n'
                    '## Architecture\n\n'
                    'Introduced Celery with Redis as the message broker, decoupling background '
                    'work from the request/response cycle: the API enqueues a task and returns '
                    'immediately, while a separate worker process executes it.\n\n'
                    '## Key Technical Decisions\n\n'
                    '1. **Celery + Redis**: Chose Redis as the broker since it was already in '
                    'place for caching, avoiding an additional piece of infrastructure to '
                    'operate\n'
                    "2. **Task Queues**: Separated queues by priority so time-sensitive "
                    "notifications aren't stuck behind longer-running report generation jobs\n"
                    '3. **Celery Beat**: Used for scheduled/periodic tasks (e.g. recurring '
                    'weather integration syncs) rather than hand-rolled cron plus manual '
                    'triggering\n\n'
                    '## Result\n\n'
                    'API endpoints no longer block on notification, report, or sync work — '
                    'request latency for those endpoints stopped being coupled to the duration '
                    'of the background job itself.\n\n'
                    '## Lessons Learned\n\n'
                    'Separating task queues by priority early avoided a real failure mode: '
                    'without it, a burst of report-generation jobs would have delayed '
                    'time-sensitive notifications behind them in the same queue.'
                ),
                'technologies': 'Celery, Redis, Django, Docker',
                'featured': True,
                'order': 2,
            },
        ]

        for cs in case_studies:
            CaseStudy.objects.update_or_create(
                slug=cs['slug'],
                defaults=cs,
            )

    def _create_testimonials(self):
        testimonials = [
            {
                'name': 'Randhir Kumar',
                'title': 'Software Developer',
                'company': 'Innovya Technologies',
                'content': (
                    'I had the pleasure of working with Pooja Chande at Innovya, and she '
                    'consistently impressed me with her strong technical skills and proactive '
                    'approach. Pooja not only brought deep expertise in Python and related '
                    'tools but also showed remarkable initiative in improving processes and '
                    'taking full ownership of her work.'
                ),
                'rating': 5,
                'order': 0,
            },
            {
                'name': 'Tabish Chauhan',
                'title': 'Senior Python Developer - GenAI',
                'company': 'Innovya Technologies',
                'content': (
                    'I had the pleasure of working with Pooja Chande at Innovya Technologies, '
                    'where she consistently took full ownership of her tasks, especially in '
                    'Python development and backend integration. Her ability to independently '
                    "drive features from planning to execution was impressive. Pooja's "
                    'proactive mindset, clean coding practices, and readiness to support '
                    'others made her a true asset to our team.'
                ),
                'rating': 5,
                'order': 1,
            },
            {
                'name': 'Upinderjit Singh Chopra',
                'title': 'Business Intelligence & Data Strategy Leader',
                'company': 'Innovya Technologies',
                'content': (
                    'I’ve had the pleasure of working with Pooja Chande at Innovya '
                    'Technologies, and she stands out as a truly exceptional Solution '
                    'Developer. Pooja brings deep expertise in Python, Django, FastAPI, and '
                    'front-end development with Vue.js, backed by strong database skills '
                    'across MySQL, PostgreSQL, and MS SQL Server. What makes her truly unique '
                    'is her ability to bridge technical excellence with clear and confident '
                    'communication. Her curiosity, structured thinking, and collaborative '
                    'spirit make her a joy to work with. Pooja consistently delivers '
                    'high-quality solutions while also mentoring and uplifting those around '
                    'her — a true asset to any team.'
                ),
                'rating': 5,
                'order': 2,
            },
            {
                'name': 'Saloni Bhatnagar',
                'title': 'Senior US Recruiter',
                'company': 'Innovya Technologies',
                'content': (
                    'I had the opportunity to bring Pooja on board and worked with her '
                    'closely. From the start, she stood out for her adaptability and '
                    'ownership mindset. Whether it was picking up new responsibilities or '
                    'switching between roles across multiple projects, she approached '
                    'everything with a learning mindset and a strong sense of accountability.\n\n'
                    'Her willingness to take on unfamiliar tasks, learn quickly, and deliver '
                    'effectively is truly commendable. She brings maturity to the table and '
                    'handles situations with professionalism and clarity, which makes her a '
                    'reliable team player.\n\n'
                    'While her technical skills are developing well, it’s her curiosity, '
                    'dedication, and eagerness to grow that truly set her apart. She would '
                    'definitely be a great addition to any team.'
                ),
                'rating': 5,
                'order': 3,
            },
            {
                'name': 'Archana Subramaniyam',
                'title': 'Senior Technical Consultant / Module Lead',
                'company': 'Innovya Technologies',
                'content': (
                    'I am happy to recommend Pooja Chande for her outstanding contribution as '
                    'a developer in the field of Information Technology. It’s been a '
                    'pleasure collaborating closely with Pooja Chande at Innovya Technologies, '
                    "and throughout our time together, I've consistently been impressed by "
                    'her expertise, professionalism, and dedication to her craft.\n\n'
                    'Pooja Chande is a highly skilled developer with a knack for turning '
                    'complex ideas into elegant solutions. Her proficiency spans across '
                    'various programming languages, frameworks, and technologies, including '
                    "technologies like Python, JavaScript, React.js. Whether it's building "
                    'robust web applications, designing efficient algorithms, or '
                    'troubleshooting intricate bugs, Pooja Chande approaches each task with '
                    'precision and creativity.\n\n'
                    'In addition to her technical prowess, Pooja Chande is also an '
                    'exceptional team player and collaborator. She thrives in fast-paced '
                    'environments and excels in communicating effectively with '
                    'cross-functional teams. Her proactive approach to problem-solving, '
                    'willingness to mentor junior developers, and eagerness to learn from '
                    'others make her a valuable asset to any development team.'
                ),
                'rating': 5,
                'order': 4,
            },
            {
                'name': 'Smit M',
                'title': 'Python Developer',
                'company': 'Arkay Apps',
                'content': (
                    'It was a pleasure collaborating with Pooja on several projects. Her '
                    'exceptional problem-solving skills and quick learning ability were '
                    "evident in every task she undertook. Pooja's proficiency in Python "
                    'programming, coupled with her logical approach, consistently delivered '
                    "outstanding results. Her strong communication skills further enhanced "
                    "our team's efficiency and effectiveness. I highly recommend Pooja for "
                    'her remarkable talents and contributions.'
                ),
                'rating': 5,
                'order': 5,
            },
            {
                'name': 'Mitalba Mokarshi',
                'title': 'Python Developer',
                'company': 'Arkay Apps',
                'content': (
                    'I highly recommend Pooja Chande, who not only excels in her role but '
                    'has also been instrumental in providing me with invaluable training. Her '
                    'exceptional work ethic, attention to detail, and innovative '
                    'problem-solving skills make her an outstanding team player. Her '
                    'patience, expertise, and willingness to share knowledge have '
                    'significantly contributed to my professional growth. I highly '
                    'appreciate her mentorship and the positive impact it has had on my '
                    'skills and performance.'
                ),
                'rating': 5,
                'order': 6,
            },
            {
                'name': 'Harsh Gor',
                'title': 'Senior Python Developer',
                'company': 'Arkay Apps',
                'content': (
                    'Pooja, who I had the pleasure of managing directly in our dynamic '
                    'software development team, is a highly skilled Python developer who has '
                    'significantly contributed to our projects.\n\n'
                    'During her time with us, Pooja demonstrated exceptional expertise in '
                    'creating robust backend APIs and web applications. Her coding skills '
                    'and attention to detail have consistently resulted in high-quality, '
                    "efficient, and scalable solutions. Pooja's ability to navigate complex "
                    'technical challenges and deliver results promptly has greatly benefited '
                    'our team and projects.\n\n'
                    "One of Pooja's standout qualities is her quick learning ability. She has "
                    'consistently shown a remarkable aptitude for picking up new technologies '
                    'and concepts swiftly. This speaks to her intelligence and reflects her '
                    'commitment to staying at the forefront of industry trends.\n\n'
                    "Pooja's positive attitude, collaborative nature, and strong "
                    'communication skills make her a valuable team member. Her dedication to '
                    'producing high-quality work and her enthusiasm for learning and growing '
                    'in her role make her an asset to any organization.\n\n'
                    'I highly recommend Pooja for any Python development role and am '
                    'confident she will continue to excel and contribute significantly to '
                    'any team she joins.'
                ),
                'rating': 5,
                'order': 7,
            },
        ]

        for testimonial in testimonials:
            Testimonial.objects.update_or_create(
                name=testimonial['name'],
                defaults=testimonial,
            )

    def _create_social_links(self):
        links = [
            {'platform': 'GitHub', 'url': 'https://github.com/PoojaThacker2', 'icon': 'FaGithub', 'order': 0},
            {'platform': 'LinkedIn', 'url': 'https://www.linkedin.com/in/poojachande', 'icon': 'FaLinkedin', 'order': 1},
        ]

        for link in links:
            SocialLink.objects.update_or_create(
                platform=link['platform'],
                defaults=link,
            )
