import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiEye, HiMail } from 'react-icons/hi';
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
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
            <span className="badge">Backend Developer</span>
            <span className="badge">Python Expert</span>
            <span className="badge">AI Enthusiast</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Hi, I'm{' '}
            <span className="gradient-text">
              {profile?.name || 'Pooja Chande'}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mb-3"
          >
            {profile?.tagline || 'Backend-heavy Full Stack Python Developer'}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-primary-600 dark:text-primary-400 font-mono font-medium mb-4"
          >
            {profile?.experience_years || '4.7+ Years Experience'}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl leading-relaxed"
          >
            {profile?.summary || 'Building scalable backend systems using Python, Django, FastAPI and PostgreSQL.'}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            {resumeUrl ? (
              <a
                href={resumeUrl}
                download
                className="btn-primary group"
              >
                <HiDownload className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="btn-primary group opacity-50 cursor-not-allowed"
                title="Resume coming soon"
              >
                <HiDownload className="w-5 h-5" />
                Resume Coming Soon
              </button>
            )}
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline"
            >
              <HiEye className="w-5 h-5" />
              View Projects
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
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-4 mt-8">
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
