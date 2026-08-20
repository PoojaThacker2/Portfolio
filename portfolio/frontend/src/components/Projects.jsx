import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiExternalLink, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { fetchProjects } from '../services/api';

const INITIAL_VISIBLE = 3;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => {});
  }, []);

  const defaultProjects = [
    {
      title: 'AI-Based Real Estate Valuation System',
      subtitle: 'ML-Powered Property Price Predictor',
      highlights:
        'Built a Django-based prediction system estimating property values from location, area, materials, and cost parameters\nApplied feature engineering with Pandas, StandardScaler, and PolynomialFeatures; evaluated Random Forest, SVR, Ridge, Lasso, and KNN models\nIntegrated the ML workflow with Django ORM and REST APIs for application-level valuation predictions',
      technologies: 'Python, Django, PostgreSQL, Scikit-learn, Pandas',
      github_url: 'https://github.com/PoojaThacker2',
    },
    {
      title: 'Temple Trust, Events & Resource Management Platform',
      subtitle: 'Trust & Membership Operations Backend',
      highlights:
        'Developed backend services covering trusts, trustees, memberships, services, donations, and operational resources\nBuilt REST APIs with FastAPI and SQLAlchemy for CRUD, search, filtering, pagination, and sorting; implemented JWT auth and role-based authorization\nAdded document/media handling and PDF generation, supporting a React frontend via REST APIs',
      technologies: 'Python, FastAPI, SQLAlchemy, MySQL, Alembic, React',
      github_url: 'https://github.com/PoojaThacker2',
    },
    {
      title: 'Image-Based Painting Recommendation System (SOAL)',
      subtitle: 'CNN-Powered Artwork Similarity Engine',
      highlights:
        'Contributed to backend development of an image-similarity recommendation system for an artwork marketplace using CNN-based image feature analysis\nDeveloped and deployed serverless APIs on AWS Lambda, supporting model inference workflows via AWS SageMaker',
      technologies: 'Python, CNN, AWS SageMaker, AWS Lambda',
      github_url: 'https://github.com/PoojaThacker2',
    },
    {
      title: 'US Capital Market Prediction Application',
      subtitle: 'Financial Market Visualization Suite',
      highlights:
        'Built Python desktop and web interfaces for a US financial-market prediction application, including candlestick-chart visualizations of market data\nExplored multiple Python GUI/visualization frameworks (Tkinter, PyQt, Kivy, Streamlit) to prototype and compare data-presentation approaches',
      technologies: 'Python, Tkinter, PyQt, Kivy, Streamlit',
      github_url: 'https://github.com/PoojaThacker2',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const visibleProjects = showAll ? displayProjects : displayProjects.slice(0, INITIAL_VISIBLE);
  const hasMore = displayProjects.length > INITIAL_VISIBLE;

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle">
          Real-world applications I've built and contributed to
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card group flex flex-col"
          >
            <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 w-fit mb-4">
              <HiCode className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
            {project.subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{project.subtitle}</p>
            )}

            <ul className="space-y-2 mb-6 flex-1">
              {(project.highlights || '')
                .split('\n')
                .filter(Boolean)
                .slice(0, 5)
                .map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
            </ul>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(project.technologies || '')
                  .split(',')
                  .filter(Boolean)
                  .slice(0, 4)
                  .map((tech) => (
                    <span key={tech.trim()} className="badge text-xs">
                      {tech.trim()}
                    </span>
                  ))}
              </div>

              <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <FaGithub className="w-4 h-4" />
                    Source
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="btn-outline inline-flex"
          >
            {showAll ? (
              <>
                Show Less <HiChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                See More Projects <HiChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
