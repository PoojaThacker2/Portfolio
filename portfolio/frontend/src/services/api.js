import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Swagger UI lives alongside the API on the backend (/api/docs/), so derive
// it from the same configured base URL instead of hardcoding the production
// host anywhere in the frontend.
export const apiDocsUrl = `${API_BASE_URL.replace(/\/api\/?$/, '')}/api/docs/`;

export const fetchProfile = () => api.get('/profile/').then(res => res.data);

export const fetchSkills = () => api.get('/skills/').then(res => res.data);

export const fetchExperiences = () => api.get('/experiences/').then(res => res.data);

export const fetchProjects = () => api.get('/projects/').then(res => res.data);

export const fetchCaseStudies = () => api.get('/case-studies/').then(res => res.data);

export const fetchTestimonials = () => api.get('/testimonials/').then(res => res.data);

export const fetchSocialLinks = () => api.get('/social-links/').then(res => res.data);

export const submitContact = (data) => api.post('/contact/', data).then(res => res.data);

export default api;
