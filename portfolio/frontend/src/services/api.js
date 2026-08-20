import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProfile = () => api.get('/profile/').then(res => res.data);

export const fetchSkills = () => api.get('/skills/').then(res => res.data);

export const fetchExperiences = () => api.get('/experiences/').then(res => res.data);

export const fetchProjects = () => api.get('/projects/').then(res => res.data);

export const fetchCaseStudies = () => api.get('/case-studies/').then(res => res.data);

export const fetchTestimonials = () => api.get('/testimonials/').then(res => res.data);

export const fetchSocialLinks = () => api.get('/social-links/').then(res => res.data);

export const submitContact = (data) => api.post('/contact/', data).then(res => res.data);

export default api;
