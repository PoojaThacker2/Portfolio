import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EngineeringSnapshot from './components/EngineeringSnapshot';
import About from './components/About';
import Specialization from './components/Specialization';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CaseStudies from './components/CaseStudies';
import GitHubSection from './components/GitHubSection';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <EngineeringSnapshot />
        <section id="about"><About /></section>
        <section id="specialization"><Specialization /></section>
        <section id="case-studies"><CaseStudies /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="skills"><Skills /></section>
        <section id="github"><GitHubSection /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
