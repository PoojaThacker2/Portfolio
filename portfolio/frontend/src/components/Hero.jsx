import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { fetchProfile, fetchSocialLinks } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const STATIC_RESUME_PATH = '/Pooja_Chande_Resume.pdf';

export default function Hero() {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    fetchProfile().then(setProfile).catch(() => {});
    fetchSocialLinks().then(setSocialLinks).catch(() => {});
  }, []);

  useEffect(() => {
    if (profile?.resume_file) {
      setResumeUrl(profile.resume_file);
      return;
    }
    // The static file may not exist yet; a missing path can resolve to the
    // SPA's index.html with a 200 status instead of a real 404, so check the
    // actual content type before offering it as a download.
    fetch(STATIC_RESUME_PATH, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('pdf')) {
          setResumeUrl(STATIC_RESUME_PATH);
        }
      })
      .catch(() => {});
  }, [profile]);

  const getSocialIcon = (icon) => {
    switch (icon) {
      case 'FaGithub': return <FaGithub className="w-5 h-5" />;
      case 'FaLinkedin': return <FaLinkedin className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-container relative z-10 w-full"
      >
        <div className="max-w-3xl">
          <motion.p
            variants={itemVariants}
            className="text-base font-medium text-gray-500 dark:text-gray-400 mb-3"
          >
            {profile?.name || 'Pooja Chande'}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
          >
            <span className="gradient-text">Senior Python Backend Engineer</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-xl leading-relaxed"
          >
            {profile?.summary || 'Building scalable APIs, microservices and production-grade backend systems with Python.'}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm font-mono text-primary-600 dark:text-primary-400 mb-8 tracking-tight"
          >
            Python · Django · FastAPI · REST APIs · PostgreSQL · Redis · Celery · Docker
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <a
              href="#case-studies"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#case-studies')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              View Case Studies
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline"
            >
              <HiMail className="w-5 h-5" />
              Contact Me
            </a>

            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                aria-label={link.platform}
              >
                {getSocialIcon(link.icon) || link.icon}
              </a>
            ))}

            {resumeUrl && (
              <a
                href={resumeUrl}
                download
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <HiDownload className="w-4 h-4" />
                Resume
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
