import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { HiMail, HiCode } from 'react-icons/hi';
import { fetchProfile, fetchSocialLinks, apiDocsUrl } from '../services/api';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetchProfile().then(setProfile).catch(() => {});
    fetchSocialLinks().then(setSocialLinks).catch(() => {});
  }, []);

  const getSocialIcon = (icon) => {
    switch (icon) {
      case 'FaGithub': return <FaGithub className="w-5 h-5" />;
      case 'FaLinkedin': return <FaLinkedin className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xl font-bold gradient-text">
              {profile?.name || 'Pooja Chande'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {profile?.tagline || 'Senior Python Backend Engineer'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                aria-label={link.platform}
              >
                {getSocialIcon(link.icon) || link.icon}
              </a>
            ))}
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
                aria-label="Email"
              >
                <HiMail className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center space-y-3">
          <a
            href={apiDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            <HiCode className="w-4 h-4" />
            This portfolio is powered by a Django REST API — explore the docs →
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} {profile?.name || 'Pooja Chande'}. Built with
            <FaHeart className="w-3.5 h-3.5 text-red-500 mx-0.5" />
            using React, Django REST Framework and Python.
          </p>
        </div>
      </div>
    </footer>
  );
}
