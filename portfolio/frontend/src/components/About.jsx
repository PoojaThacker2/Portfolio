import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProfile } from '../services/api';
import { HiAcademicCap, HiCode, HiChip } from 'react-icons/hi';

const highlights = [
  {
    icon: HiCode,
    title: 'Backend Engineering',
    description: '4.7 years building scalable APIs and microservices',
  },
  {
    icon: HiChip,
    title: 'AI Engineering',
    description: 'Passionate about Gen AI and intelligent systems',
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
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="section-subtitle">
          A journey from academia to building production-ready backend systems
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
                'Backend-focused Full Stack Python Developer with 4.7+ years of experience designing scalable web applications, REST APIs and microservices.\n\nExperienced in Django, FastAPI, PostgreSQL, Redis, Celery and Docker.\n\nPassionate about AI Engineering, Generative AI and building intelligent software solutions.\n\nPreviously worked as an Assistant Professor before transitioning into software engineering.'}
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
