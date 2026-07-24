/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LANGUAGES, TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Globe, Github, Twitter, Linkedin, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface FooterProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  onNavClick: (sectionId: string) => void;
}

export default function Footer({ currentLang, onLangChange, onNavClick }: FooterProps) {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';
  const [langOpen, setLangOpen] = useState(false);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest('.footer-lang-switcher')) {
          setLangOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [langOpen]);

  return (
    <footer id="footer-section" className="bg-[#05070d] border-t border-gray-800/40 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle bottom space particles overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0dd20d]/2 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-800/40 ${isRtl ? 'text-right' : 'text-left'}`}>
          {/* Column 1: Branding & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start md:pr-8">
            <button
              onClick={() => onNavClick('hero')}
              className="flex items-center gap-3 cursor-pointer group focus:outline-none mb-6"
            >
              <div className="w-8 h-8 relative flex-shrink-0">
                <div className="absolute inset-0 border border-[#0dd20d] rounded-full animate-pulse"></div>
                <div className="absolute top-1 right-1 w-2 h-2 bg-[#0dd20d] rounded-full shadow-[0_0_8px_#0dd20d]"></div>
              </div>
              <span className="font-display text-xl font-bold tracking-[2px] uppercase text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>AIVUM</span>
            </button>
            <p className="text-sm text-gray-400 font-sans max-w-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            {/* Social handles */}
            <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a
                href="#github"
                className="w-9 h-9 rounded-sm border border-white/10 bg-[#0a0f1c] flex items-center justify-center text-gray-400 hover:text-[#0dd20d] hover:border-[#0dd20d]/40 hover:shadow-[0_0_8px_rgba(13,210,13,0.3)] transition-all"
                aria-label="Aivum GitHub Link"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                className="w-9 h-9 rounded-sm border border-white/10 bg-[#0a0f1c] flex items-center justify-center text-gray-400 hover:text-[#0dd20d] hover:border-[#0dd20d]/40 hover:shadow-[0_0_8px_rgba(13,210,13,0.3)] transition-all"
                aria-label="Aivum LinkedIn Link"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-sm border border-white/10 bg-[#0a0f1c] flex items-center justify-center text-gray-400 hover:text-[#0dd20d] hover:border-[#0dd20d]/40 hover:shadow-[0_0_8px_rgba(13,210,13,0.3)] transition-all"
                aria-label="Aivum Twitter Link"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation / Company */}
          <div className="md:col-span-2 flex flex-col">
            <span className="font-mono text-xs tracking-widest text-[#0dd20d] uppercase font-bold mb-5">
              {t.footer.companyTitle}
            </span>
            <ul className="space-y-3.5 text-sm text-gray-400 font-sans">
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-white transition-colors duration-150 cursor-pointer">
                  {t.footer.links.about}
                </button>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors duration-150">
                  {t.footer.links.careers}
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors duration-150">
                  {t.footer.links.press}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="md:col-span-2 flex flex-col">
            <span className="font-mono text-xs tracking-widest text-[#0dd20d] uppercase font-bold mb-5">
              {t.footer.servicesTitle}
            </span>
            <ul className="space-y-3.5 text-sm text-gray-400 font-sans">
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-white transition-colors duration-150 cursor-pointer text-left">
                  {isRtl ? 'أنظمة الملاحة' : 'Avionics Systems'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-white transition-colors duration-150 cursor-pointer text-left">
                  {isRtl ? 'المحركات النفاثة' : 'Turbofan Engines'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('services')} className="hover:text-white transition-colors duration-150 cursor-pointer text-left">
                  {isRtl ? 'التوريد واللوجستيات' : 'Customs Logistics'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Switcher */}
          <div className="md:col-span-3 flex flex-col">
            <span className="font-mono text-xs tracking-widest text-[#0dd20d] uppercase font-bold mb-5">
              {t.footer.legalTitle}
            </span>
            <ul className="space-y-3.5 text-sm text-gray-400 font-sans mb-8">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors duration-150">
                  {t.footer.links.privacy}
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors duration-150">
                  {t.footer.links.terms}
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-white transition-colors duration-150">
                  {t.footer.links.cookies}
                </a>
              </li>
            </ul>

            {/* Repeated Language Switcher for convenience */}
            <div className="relative footer-lang-switcher mt-auto">
              <button
                id="footer-lang-switcher-btn"
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-2 bg-white/5 border border-white/10 hover:border-[#0dd20d]/30 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-white/90 hover:text-white transition-all cursor-pointer focus:outline-none ${isRtl ? 'flex-row-reverse' : ''}`}
                aria-expanded={langOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#0dd20d]" />
                <span>{LANGUAGES.find((l) => l.code === currentLang)?.nativeName}</span>
              </button>

              {langOpen && (
                  <motion.div
                    id="footer-lang-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute bottom-full mb-2 w-44 bg-[#0a0f1c] border border-gray-800 rounded shadow-xl py-1 z-50 ${isRtl ? 'right-0' : 'left-0'}`}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        id={`footer-lang-opt-${lang.code}`}
                        onClick={() => {
                          onLangChange(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between cursor-pointer ${
                          currentLang === lang.code ? 'text-[#0dd20d] bg-[#131a2b]' : 'text-gray-400'
                        } ${isRtl ? 'text-right flex-row-reverse' : 'text-left'}`}
                      >
                        <span>{lang.nativeName}</span>
                        {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#0dd20d]" />}
                      </button>
                    ))}
                  </motion.div>
                )}
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className={`pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-500 font-mono tracking-wider ${isRtl ? 'text-right md:flex-row-reverse' : 'text-left'}`}>
          <span>{t.footer.copyright}</span>
          <span className="text-gray-600">AIVUM FLIGHT LOGISTICS CO.</span>
        </div>
      </div>
    </footer>
  );
}
