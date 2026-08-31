import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiBriefcase, HiCalendar, HiLocationMarker } from 'react-icons/hi';
import { fetchExperiences } from '../services/api';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetchExperiences().then(setExperiences).catch(() => {});
  }, []);

  const defaultExperiences = [
    {
      title: 'Senior Python Developer',
      company: 'MSBC Group',
      location: 'Ahmedabad, Gujarat',
      current: false,
      start_date: '2025-08-01',
      end_date: '2026-05-31',
      achievements:
        'Owned end-to-end backend development for a multi-tenant hospitality platform built on Django microservices architecture, independently delivering 5 production-grade microservices and 70+ REST APIs\nDesigned and developed scalable microservices for authentication, hotel operations, notifications, workflow automation, and API integrations, ensuring secure tenant isolation and maintainable architecture\nEngineered asynchronous processing using Celery, Celery Beat, Redis, and Kafka to automate weather integrations, notifications, and scheduled workflows\nManaged QA and production deployment support with Jenkins across Kubernetes-based QA environments and AWS EC2 production servers, including troubleshooting, deployment validation, and issue resolution\nEnforced OWASP security standards, optimized backend performance, collaborated with AI engineers to integrate chatbot services via REST APIs, and built CLI scaffolding tools for Django/FastAPI to accelerate engineering productivity',
    },
    {
      title: 'Solution Developer',
      company: 'Innovya Technologies',
      location: 'US (Remote)',
      current: false,
      start_date: '2023-04-01',
      end_date: '2025-06-30',
      achievements:
        "Owned the Facilities, Chains, Services, Appeals, and Cases modules end-to-end on RevKeep, a US healthcare audit and monitoring platform — building reusable Vue.js components with Vuex for state management, Vue Router for navigation, and props/emit plus provide/inject for component communication\nWorked across both Options API (legacy modules) and Composition API (modernized modules) while contributing to backend modernization of RevKeep's legacy CakePHP application, designing and deploying 30+ REST APIs using FastAPI and Django REST Framework\nIntegrated machine learning models into backend applications through scalable REST APIs, reducing prediction latency by 40% while supporting production business workflows\nImproved code quality by refactoring legacy codebases and raising test coverage by 25% through modularization and Pytest-based unit testing; maintained GitHub repositories and CI/CD pipeline configuration\nBuilt a US financial-market prediction application with Python-based data visualization interfaces; collaborated with frontend and cross-functional teams to deliver end-to-end product features in Agile environments",
    },
    {
      title: 'Python Developer',
      company: 'Arkay Apps',
      location: 'Kutch, Gujarat',
      current: false,
      start_date: '2022-01-01',
      end_date: '2023-03-31',
      achievements:
        'Developed scalable backend applications using Django and FastAPI, delivering CRUD APIs for web and mobile platforms with optimized database performance\nBuilt 10+ modular API modules using FastAPI and SQLAlchemy ORM, integrating third-party services (email, SMS, payments) across construction/property, trust/event, and maritime-industry workflows\nOptimized PostgreSQL/MySQL queries and ORM models, reducing database call time by 30%; implemented JWT authentication, role/operation-level authorization, and Alembic migrations\nWrote and maintained technical documentation for internal APIs and data workflows; conducted peer code reviews and mentored junior developers on Django best practices and Git workflows',
    },
    {
      title: 'Assistant Professor',
      company: 'KSKV Kachchh University',
      location: 'Kutch, Gujarat',
      current: false,
      start_date: '2014-02-01',
      end_date: '2021-07-31',
      achievements:
        'Delivered undergraduate courses in Python, C++, DBMS, Networking, and Software Engineering; mentored 3,000+ students and guided 20+ full-stack/Python academic projects\nServed as Head of Department (BCA), managing academic operations, examinations, and professional development for 300+ students',
    },
  ];

  const displayExperiences = experiences.length > 0 ? experiences : defaultExperiences;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="section-subtitle">
          My professional journey in software engineering
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />

        <div className="space-y-12">
          {displayExperiences.map((exp, index) => (
            <motion.div
              key={`${exp.title}-${exp.company}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                <div className="card">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 shrink-0 hidden md:block">
                      <HiBriefcase className="w-5 h-5" />
                    </div>
                    <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">
                        {exp.company}
                      </p>
                      <div
                        className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mt-1 ${
                          index % 2 === 0 ? 'md:justify-end' : 'justify-start'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <HiCalendar className="w-4 h-4" />
                          {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-2">
                            <HiLocationMarker className="w-4 h-4" />
                            {exp.location}
                          </span>
                        )}
                        {exp.current && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {exp.achievements && (
                    <ul className="space-y-2 mt-4 text-left">
                      {exp.achievements.split('\n').filter(Boolean).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-950 -translate-x-1/2 mt-6 z-10" />

              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
