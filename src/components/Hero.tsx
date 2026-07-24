/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowDown, MessageSquare, ArrowUpRight } from 'lucide-react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import Starfield from './Starfield';
import OrbitDiagram from './OrbitDiagram';
import { motion } from 'motion/react';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ currentLang, onExploreClick, onContactClick }: HeroProps) {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#05070d]"
    >
      {/* 1. Interactive Star Particle Field */}
      <Starfield />

      {/* Decorative ambient glowing grids/orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0dd20d]/3 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#131a2b]/30 rounded-full blur-[130px] pointer-events-none z-0"></div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Text Details Column */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center ${
            isRtl ? 'lg:order-2 text-right items-end' : 'lg:order-1 text-left items-start'
          }`}
        >
          {/* Sourcing Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 bg-[#0dd20d]/10 border border-[#0dd20d]/30 text-[#0dd20d] text-[10px] uppercase tracking-[0.3em] rounded-sm mb-6 font-bold"
          >
            {t.hero.badge}
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tighter mb-8 text-white uppercase"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            {t.hero.headingPrefix}
            <br />
            <span className="text-[#0dd20d]">{t.hero.headingHighlight}</span>
            <span className="font-light text-white/60">{t.hero.headingSuffix}</span>
          </motion.h1>

          {/* Subheading / Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-md mb-10 font-sans"
          >
            {t.hero.description}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className={`flex flex-wrap gap-4 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-start'}`}
          >
            {/* Primary Sourcing Button */}
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="px-8 py-4 bg-[#0dd20d] text-[#05070d] font-bold text-xs uppercase tracking-widest rounded-sm hover:shadow-[0_0_20px_rgba(13,210,13,0.4)] hover:scale-102 transition-all cursor-pointer flex items-center gap-2 group focus:outline-none"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Secondary Team Contact Button */}
            <button
              id="hero-contact-btn"
              onClick={onContactClick}
              className="px-8 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-white/5 hover:scale-102 transition-all cursor-pointer flex items-center gap-2 focus:outline-none"
            >
              <MessageSquare className="w-4 h-4 text-[#0dd20d]" />
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </motion.div>
        </div>

        {/* Orbit Diagram Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`lg:col-span-5 flex justify-center items-center ${
            isRtl ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <OrbitDiagram currentLang={currentLang} />
        </motion.div>
      </div>

      {/* Scroll Down Hint Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10">
        <span className="font-mono text-[9px] tracking-[0.25em] text-gray-500 uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-gray-800 flex items-center justify-center bg-[#05070d]/50 backdrop-blur-sm"
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#0dd20d]" />
        </motion.div>
      </div>
    </section>
  );
}
