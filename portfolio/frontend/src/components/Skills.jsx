import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiServer, HiDesktopComputer, HiDatabase, HiCloud,
  HiChartBar, HiBeaker, HiUserGroup,
} from 'react-icons/hi';
import { fetchSkills } from '../services/api';

const CATEGORY_ICONS = {
  'Backend & Frameworks': HiServer,
  'Frontend': HiDesktopComputer,
  'Databases': HiDatabase,
  'Cloud & DevOps': HiCloud,
  'Data & ML': HiChartBar,
  'Testing & Quality': HiBeaker,
  'Tools & Collaboration': HiUserGroup,
};

export default function Skills() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchSkills().then(setCategories).catch(() => {});
  }, []);

  const defaultCategories = [
    {
      name: 'Backend & Frameworks',
      skills: [
        { name: 'Python' }, { name: 'Django' }, { name: 'Django REST Framework (DRF)' },
        { name: 'FastAPI' }, { name: 'REST APIs' }, { name: 'Microservices' },
        { name: 'API Integration' }, { name: 'Celery' }, { name: 'Celery Beat' }, { name: 'Redis' },
      ],
    },
    {
      name: 'Frontend',
      skills: [
        { name: 'Vue.js' }, { name: 'Vuex' }, { name: 'Vue Router' }, { name: 'JavaScript' },
        { name: 'HTML5' }, { name: 'CSS3' }, { name: 'Bootstrap Vue' }, { name: 'React' },
      ],
    },
    {
      name: 'Databases',
      skills: [
        { name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'SQL' },
        { name: 'SQLAlchemy' }, { name: 'Alembic' },
      ],
    },
    {
      name: 'Cloud & DevOps',
      skills: [
        { name: 'AWS EC2' }, { name: 'AWS Lambda' }, { name: 'AWS SageMaker' }, { name: 'Docker' },
        { name: 'Kubernetes' }, { name: 'Jenkins' }, { name: 'CI/CD' }, { name: 'Kafka' }, { name: 'Nginx' },
      ],
    },
    {
      name: 'Data & ML',
      skills: [
        { name: 'Pandas' }, { name: 'NumPy' }, { name: 'Scikit-learn' }, { name: 'OpenCV' },
      ],
    },
    {
      name: 'Testing & Quality',
      skills: [
        { name: 'Pytest' }, { name: 'Unit Testing' }, { name: 'Code Review' }, { name: 'OWASP Security Standards' },
      ],
    },
    {
      name: 'Tools & Collaboration',
      skills: [
        { name: 'Agile' }, { name: 'Git' }, { name: 'GitHub' }, { name: 'GitLab' },
        { name: 'JIRA' }, { name: 'Postman' }, { name: 'Swagger/OpenAPI' }, { name: 'Mentoring' },
      ],
    },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Skills & <span className="gradient-text">Expertise</span>
        </h2>
        <p className="section-subtitle">
          Technologies and tools I work with across the stack
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map((category, catIndex) => {
          const Icon = CATEGORY_ICONS[category.name] || HiServer;
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 + skillIndex * 0.03 }}
                    className="badge"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
