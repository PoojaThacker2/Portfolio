import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProfile } from '../services/api';

const CORE_STACK = [
  'Python', 'Django', 'FastAPI', 'REST APIs',
  'Microservices', 'PostgreSQL', 'Redis', 'Celery', 'Docker',
];

export default function EngineeringSnapshot() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(setProfile).catch(() => {});
  }, []);

  return (
    <div className="section-container !py-8 sm:!py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40"
      >
        <div className="shrink-0">
          <p className="text-3xl sm:text-4xl font-bold gradient-text leading-none">
            {profile?.experience_years || '4.7+ Years'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Backend Engineering Experience
          </p>
        </div>

        <div className="hidden md:block w-px self-stretch bg-gray-200 dark:bg-gray-800" />

        <div className="flex flex-wrap gap-2">
          {CORE_STACK.map((tech) => (
            <span key={tech} className="badge">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
