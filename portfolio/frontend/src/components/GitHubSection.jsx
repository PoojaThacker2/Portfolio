import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { fetchProfile } from '../services/api';

export default function GitHubSection() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then((p) => {
        setProfile(p);
        if (p?.github_username) {
          fetch(`https://api.github.com/users/${p.github_username}/repos?sort=updated&per_page=6`)
            .then((res) => {
              if (!res.ok) throw new Error('GitHub API error');
              return res.json();
            })
            .then(setRepos)
            .catch(() => setError(true));
        }
      })
      .catch(() => {});
  }, []);

  const username = profile?.github_username || 'PoojaThacker2';

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <span className="gradient-text">GitHub</span> Activity
        </h2>
        <p className="section-subtitle">
          Latest open-source contributions and repositories
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {repos.map((repo, index) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="card group"
          >
            <div className="flex items-start gap-3 mb-3">
              <FaGithub className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <h3 className="font-semibold truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {repo.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {repo.description || 'No description'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FaStar className="w-3 h-3" />
                {repo.stargazers_count || 0}
              </span>
              <span className="flex items-center gap-1">
                <FaCodeBranch className="w-3 h-3" />
                {repo.forks_count || 0}
              </span>
            </div>
          </motion.a>
        ))}
        {error && (
          <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
            <FaGithub className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>GitHub repositories could not be loaded at this time.</p>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <a
          href={profile?.github_url || `https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex"
        >
          <FaGithub className="w-5 h-5" />
          View Full GitHub Profile
          <HiExternalLink className="w-4 h-4" />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <img
          src={`https://ghchart.rshah.org/${username}`}
          alt={`${username}'s GitHub contribution graph`}
          className="w-full rounded-2xl border border-gray-100 dark:border-gray-800"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </motion.div>
    </div>
  );
}
