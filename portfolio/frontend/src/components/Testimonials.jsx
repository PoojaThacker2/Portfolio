import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { fetchTestimonials } from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  const defaultTestimonials = [
    {
      name: 'Randhir Kumar',
      title: 'Software Developer',
      company: 'Innovya Technologies',
      content:
        'I had the pleasure of working with Pooja Chande at Innovya, and she consistently impressed me with her strong technical skills and proactive approach. Pooja not only brought deep expertise in Python and related tools but also showed remarkable initiative in improving processes and taking full ownership of her work.',
      rating: 5,
    },
    {
      name: 'Tabish Chauhan',
      title: 'Senior Python Developer - GenAI',
      company: 'Innovya Technologies',
      content:
        "I had the pleasure of working with Pooja Chande at Innovya Technologies, where she consistently took full ownership of her tasks, especially in Python development and backend integration. Her ability to independently drive features from planning to execution was impressive. Pooja's proactive mindset, clean coding practices, and readiness to support others made her a true asset to our team.",
      rating: 5,
    },
    {
      name: 'Upinderjit Singh Chopra',
      title: 'Business Intelligence & Data Strategy Leader',
      company: 'Innovya Technologies',
      content:
        'I’ve had the pleasure of working with Pooja Chande at Innovya Technologies, and she stands out as a truly exceptional Solution Developer. Pooja brings deep expertise in Python, Django, FastAPI, and front-end development with Vue.js, backed by strong database skills across MySQL, PostgreSQL, and MS SQL Server. Her curiosity, structured thinking, and collaborative spirit make her a joy to work with.',
      rating: 5,
    },
    {
      name: 'Saloni Bhatnagar',
      title: 'Senior US Recruiter',
      company: 'Innovya Technologies',
      content:
        'I had the opportunity to bring Pooja on board and worked with her closely. From the start, she stood out for her adaptability and ownership mindset. Her willingness to take on unfamiliar tasks, learn quickly, and deliver effectively is truly commendable.',
      rating: 5,
    },
    {
      name: 'Archana Subramaniyam',
      title: 'Senior Technical Consultant / Module Lead',
      company: 'Innovya Technologies',
      content:
        "Pooja Chande is a highly skilled developer with a knack for turning complex ideas into elegant solutions. Her proficiency spans across various programming languages, frameworks, and technologies, including Python, JavaScript, and React.js. She thrives in fast-paced environments and excels in communicating effectively with cross-functional teams.",
      rating: 5,
    },
    {
      name: 'Smit M',
      title: 'Python Developer',
      company: 'Arkay Apps',
      content:
        "It was a pleasure collaborating with Pooja on several projects. Her exceptional problem-solving skills and quick learning ability were evident in every task she undertook. Pooja's proficiency in Python programming, coupled with her logical approach, consistently delivered outstanding results.",
      rating: 5,
    },
    {
      name: 'Mitalba Mokarshi',
      title: 'Python Developer',
      company: 'Arkay Apps',
      content:
        'I highly recommend Pooja Chande, who not only excels in her role but has also been instrumental in providing me with invaluable training. Her exceptional work ethic, attention to detail, and innovative problem-solving skills make her an outstanding team player.',
      rating: 5,
    },
    {
      name: 'Harsh Gor',
      title: 'Senior Python Developer',
      company: 'Arkay Apps',
      content:
        "Pooja, who I had the pleasure of managing directly in our dynamic software development team, is a highly skilled Python developer who has significantly contributed to our projects. Her coding skills and attention to detail have consistently resulted in high-quality, efficient, and scalable solutions.",
      rating: 5,
    },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          What People <span className="gradient-text">Say</span>
        </h2>
        <p className="section-subtitle">
          Testimonials from colleagues and managers
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {displayTestimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card relative"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <HiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating
                      ? 'text-yellow-400'
                      : 'text-gray-200 dark:text-gray-700'
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">
              "{testimonial.content}"
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {testimonial.title}{testimonial.company ? `, ${testimonial.company}` : ''}
                </p>
              </div>
            </div>

            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 text-primary-200 dark:text-primary-800 opacity-50">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
