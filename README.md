# Pooja Chande — Portfolio

Full-stack portfolio site: a Django REST Framework API serving content (profile, skills, experience, projects, testimonials) to a React/Vite frontend.

**Live:** _add your deployed URL here once live_
**API docs:** `/api/docs/` (Swagger UI) or `/api/redoc/` (ReDoc)

## Tech stack

| Layer | Stack |
|---|---|
| Backend | Django 5, Django REST Framework, django-filter, drf-spectacular (OpenAPI/Swagger) |
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Axios |
| Database | SQLite (dev) — MySQL/PostgreSQL via `DATABASE_URL` (prod) |

## Project structure

```
portfolio/
├── backend/            # Django project
│   ├── config/          # settings, root urls, wsgi/asgi
│   └── portfolio/       # the one app: models, serializers, views, urls, admin, tests
└── frontend/           # React/Vite app
    └── src/
        ├── components/   # one component per page section
        ├── context/      # ThemeContext (dark mode)
        ├── hooks/        # useTheme
        └── services/     # api.js — the only file that talks to the backend
```

## Local setup

### Backend

```bash
cd portfolio/backend
python -m venv ../../venv          # or reuse an existing venv
../../venv/Scripts/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py seed_data         # populates demo/real content
python manage.py runserver         # http://127.0.0.1:8000
```

### Frontend

```bash
cd portfolio/frontend
npm install
npm run dev                        # http://localhost:5173, proxies /api to :8000
```

## Running tests

```bash
cd portfolio/backend
python manage.py test portfolio
```

## Environment variables

The backend reads everything from the environment so the same code runs unmodified in dev and production:

| Variable | Purpose | Local default |
|---|---|---|
| `DJANGO_SECRET_KEY` | Django secret key | insecure dev key |
| `DEBUG` | `True`/`False` | `True` |
| `ALLOWED_HOSTS` | comma-separated hostnames | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | extra comma-separated allowed frontend origins | localhost origins only |
| `DATABASE_URL` | e.g. `mysql://user:pass@host/dbname` | falls back to SQLite |

The frontend reads one build-time variable:

| Variable | Purpose | Local default |
|---|---|---|
| `VITE_API_URL` | Base URL the frontend calls for the API | `/api` (proxied to `:8000` in dev) |

## API overview

All endpoints are under `/api/`, read-only except the contact form:

- `GET /api/profile/`
- `GET /api/skills/` — categories with nested skills
- `GET /api/experiences/`
- `GET /api/projects/` — supports `?featured=true`
- `GET /api/case-studies/` — lookup by slug
- `GET /api/testimonials/` — featured only
- `GET /api/social-links/`
- `POST /api/contact/`

Full interactive documentation (request/response schemas, try-it-out) is generated automatically at `/api/docs/`.

## Deployment

- **Frontend** — deploy `portfolio/frontend` to Vercel/Netlify; set `VITE_API_URL` to the deployed backend's `/api` URL.
- **Backend** — deploy `portfolio/backend`; set `DJANGO_SECRET_KEY`, `DEBUG=False`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and `DATABASE_URL` as environment variables, then run `migrate` and `seed_data`.
