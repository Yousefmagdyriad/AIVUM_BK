/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Globe, Menu, X, Check } from 'lucide-react';
import { LANGUAGES, TRANSLATIONS } from '../data';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function Navbar({
  currentLang,
  onLangChange,
  activeSection,
  onNavClick,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.lang-switcher-container')) {
          setLangOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  const navItems = [
    { id: 'hero', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'process', label: t.nav.howItWorks },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleLangSelect = (langCode: Language) => {
    onLangChange(langCode);
    setLangOpen(false);
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#05070d]/80 backdrop-blur-md border-b border-gray-800/40 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <button
            id="nav-logo-btn"
            onClick={() => onNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
            aria-label="Aivum Home"
          >
            {/* Artistic Flair Logo with orbiting dot */}
            <div className="w-8 h-8 relative flex-shrink-0">
              <div className="absolute inset-0 border border-[#0dd20d] rounded-full animate-pulse"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#0dd20d] rounded-full shadow-[0_0_8px_#0dd20d]"></div>
            </div>
            <span className="font-display text-xl font-bold tracking-[2px] uppercase text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              AIVUM
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavClick(item.id)}
                  className={`relative px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-250 cursor-pointer focus:outline-none ${
                    isActive ? 'text-[#0dd20d]' : 'text-white/80 hover:text-[#0dd20d]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#0dd20d] shadow-[0_0_8px_#0dd20d]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Controls (Language Switcher) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative lang-switcher-container">
              <button
                id="lang-switcher-btn"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-[#0dd20d]/30 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-white/90 hover:text-white transition-all cursor-pointer focus:outline-none"
                title="Switch Language"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <Globe className="w-3.5 h-3.5 opacity-60" />
                <span>{LANGUAGES.find(l => l.code === currentLang)?.name}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    id="lang-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute mt-2 w-48 bg-[#0a0f1c] border border-gray-800 rounded-lg shadow-xl shadow-black/50 py-1 overflow-hidden z-50 ${
                      isRtl ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
                    }`}
                    role="listbox"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        id={`lang-opt-${lang.code}`}
                        onClick={() => handleLangSelect(lang.code)}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between cursor-pointer transition-colors duration-150 ${
                          currentLang === lang.code
                            ? 'bg-[#131a2b] text-[#0dd20d] font-medium'
                            : 'text-gray-400 hover:bg-gray-800/40 hover:text-white'
                        } ${isRtl ? 'text-right flex-row-reverse' : 'text-left'}`}
                        role="option"
                        aria-selected={currentLang === lang.code}
                      >
                        <span className="font-sans">{lang.nativeName}</span>
                        {currentLang === lang.code && (
                          <Check className="w-3.5 h-3.5 text-[#0dd20d]" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu & Lang triggers */}
          <div className="flex md:hidden items-center gap-2">
            {/* Lang switcher on mobile */}
            <div className="relative lang-switcher-container">
              <button
                id="mobile-lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 bg-[#0a0f1c] text-gray-400 hover:text-white transition-all cursor-pointer focus:outline-none"
                aria-expanded={langOpen}
              >
                <Globe className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    id="mobile-lang-dropdown"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={`absolute mt-1 w-36 bg-[#0a0f1c] border border-gray-800 rounded-md shadow-lg py-1 z-50 ${
                      isRtl ? 'left-0' : 'right-0'
                    }`}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        id={`mobile-lang-opt-${lang.code}`}
                        onClick={() => handleLangSelect(lang.code)}
                        className={`w-full px-3 py-1.5 text-xs flex items-center justify-between cursor-pointer ${
                          currentLang === lang.code ? 'text-[#0dd20d] bg-[#131a2b]' : 'text-gray-400'
                        } ${isRtl ? 'text-right flex-row-reverse' : 'text-left'}`}
                      >
                        <span>{lang.nativeName}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-800 bg-[#0a0f1c] text-gray-400 hover:text-white cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile navigation overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#05070d] z-40 flex flex-col justify-center items-center px-6"
          >
            {/* Background glowing space orb */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#0dd20d]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <nav id="mobile-nav-menu" className="flex flex-col gap-6 text-center z-10">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    onClick={() => {
                      onNavClick(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-display font-medium tracking-wide cursor-pointer focus:outline-none ${
                      isActive ? 'text-[#0dd20d]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-xs text-gray-500 font-mono tracking-wider">AIVUM ORBITAL PLATFORM v1.4</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
