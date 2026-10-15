import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProfile } from '../services/api';
import { HiAcademicCap, HiCode, HiServer, HiCog } from 'react-icons/hi';

const highlights = [
  {
    icon: HiCode,
    title: 'Backend Engineering',
    description: 'Designing REST APIs and microservices with Django and FastAPI',
  },
  {
    icon: HiServer,
    title: 'Distributed Systems',
    description: 'Multi-tenant architecture, async processing with Celery/Redis, and service-to-service integration',
  },
  {
    icon: HiCog,
    title: 'Production Engineering',
    description: 'CI/CD with Jenkins, containerized deployments with Docker, Kubernetes-based QA environments',
  },
  {
    icon: HiAcademicCap,
    title: 'Teaching Background',
    description: 'Former Assistant Professor turned software engineer',
  },
];

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(setProfile).catch(() => {});
  }, []);

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Engineering <span className="gradient-text">Summary</span>
        </h2>
        <p className="section-subtitle">
          How I think about backend systems, architecture and production engineering
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {profile?.about_text ||
                "I'm a Python Backend Engineer with hands-on experience designing and building scalable APIs, microservices and backend systems for production applications.\n\nMy work spans Django, FastAPI, PostgreSQL, Redis, Celery and Docker, with a focus on system design, performance, reliability and maintainable architecture.\n\nI enjoy solving problems involving distributed systems, asynchronous processing, caching, multi-tenant architecture and API scalability.\n\nPreviously worked as an Assistant Professor before transitioning into software engineering."}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="card flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
