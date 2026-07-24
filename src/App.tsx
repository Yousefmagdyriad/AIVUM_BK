/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Language } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Stats from './components/Stats';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('hero');

  // Page Load Sequence (Logo Draw Animation)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // Sync HTML lang and dir attributes on language change (Arabic RTL support)
  useEffect(() => {
    const isRtl = currentLang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Scroll Tracking for Active Section and Navbar Indicators
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'process', 'about', 'contact'];
      const scrollPosition = window.scrollY + 180; // offset for sticky header

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div id="aivum-app" className="bg-[#05070d] text-white min-h-screen relative font-sans">
      {loading ? (
          // 3.1 Loading / Boot Moment
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#05070d] z-50 flex flex-col items-center justify-center"
          >
            {/* Embedded custom CSS for line draw keyframes */}
            <style>{`
              @keyframes drawCircle {
                from { stroke-dashoffset: 283; }
                to { stroke-dashoffset: 0; }
              }
              @keyframes floatParticle {
                0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.3; }
                50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
              }
            `}</style>

            {/* Drifting star particles behind loader */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(13,210,13,0.02)_1px,transparent_1.2px)] [background-size:20px_20px] pointer-events-none"></div>
            <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse opacity-40"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-[#0dd20d] rounded-full animate-pulse opacity-60"></div>

            <div className="flex flex-col items-center gap-6 relative z-10">
              {/* Dynamic Logo Stroke Animation */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute inset-0 border-2 border-[#0dd20d]/5 rounded-full animate-ping"></div>

                <svg viewBox="0 0 100 100" className="w-full h-full text-[#0dd20d]">
                  {/* Elliptical track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0dd20d"
                    strokeWidth="1.5"
                    strokeDasharray="283"
                    strokeDashoffset="283"
                    style={{
                      animation: 'drawCircle 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                    }}
                  />
                  {/* Inner Core node */}
                  <circle
                    cx="50"
                    cy="50"
                    r="8"
                    fill="#0dd20d"
                    className="shadow-[0_0_15px_#0dd20d]"
                  />
                </svg>
                {/* Orbit satellite dot */}
                <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#fff] animate-[spin_1.5s_linear_infinite] origin-[50%_50%] top-0 left-1/2 -ml-1"></div>
              </div>

              {/* Title & telemetry system diagnostics */}
              <div className="text-center mt-2 flex flex-col items-center">
                <span className="font-display text-xl font-bold tracking-[0.25em] text-white">AIVUM</span>
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#0dd20d] mt-2 uppercase">Systems Initializing</span>
              </div>
            </div>
          </motion.div>
        ) : (
          // Main Website Structure (Staggered Fade-in)
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col min-h-screen"
          >
            {/* Sticky Navigation */}
            <Navbar
              currentLang={currentLang}
              onLangChange={(lang) => setCurrentLang(lang)}
              activeSection={activeSection}
              onNavClick={handleNavClick}
            />

            {/* Site Sections */}
            <main className="flex-grow">
              {/* Hero Section */}
              <Hero
                currentLang={currentLang}
                onExploreClick={() => handleNavClick('services')}
                onContactClick={() => handleNavClick('contact')}
              />

              {/* Services Section */}
              <Services currentLang={currentLang} />

              {/* Process Section */}
              <Process currentLang={currentLang} />

              {/* Stats & Numbers Section */}
              <Stats currentLang={currentLang} />

              {/* About Us Section */}
              <About currentLang={currentLang} />

              {/* Contact Form Section */}
              <Contact currentLang={currentLang} />
            </main>

            {/* Detailed Footer */}
            <Footer
              currentLang={currentLang}
              onLangChange={(lang) => setCurrentLang(lang)}
              onNavClick={handleNavClick}
            />
          </motion.div>
        )}
    </div>
  );
}
