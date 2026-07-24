/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutProps {
  currentLang: Language;
}

export default function About({ currentLang }: AboutProps) {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  return (
    <section id="about" className="relative py-24 bg-[#05070d] overflow-hidden scroll-mt-20">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#131a2b]/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Narrative Details Column */}
        <div
          className={`lg:col-span-7 flex flex-col justify-center ${
            isRtl ? 'lg:order-2 text-right items-end' : 'lg:order-1 text-left items-start'
          }`}
        >
          {/* Section Eyebrow */}
          <div className="inline-block px-3 py-1 bg-[#0dd20d]/10 border border-[#0dd20d]/30 text-[#0dd20d] text-[10px] uppercase tracking-[0.3em] rounded-sm mb-4 font-bold">
            {t.about.eyebrow}
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
            {t.about.heading}
          </h2>

          {/* Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base text-gray-400 font-sans leading-relaxed max-w-2xl">
            <p>{t.about.paragraph1}</p>
            <p>{t.about.paragraph2}</p>
          </div>

          {/* Mission/Tagline Callout */}
          <div
            className={`mt-8 border-l-2 border-[#0dd20d]/60 pl-4 py-2 italic text-white/90 font-sans text-sm sm:text-base ${
              isRtl ? 'border-l-0 border-r-2 pl-0 pr-4 text-right' : 'text-left'
            }`}
          >
            {t.about.tagline}
          </div>
        </div>

        {/* Global Route Vector Column */}
        <div
          className={`lg:col-span-5 flex justify-center items-center ${
            isRtl ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <motion.div
            id="about-visual-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-square max-w-[380px] flex items-center justify-center"
          >
            {/* Ambient Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-gray-800/40 scale-105 pointer-events-none"></div>

            {/* Glowing Globe Vector (Slowly Rotating) */}
            <div className="w-full h-full rounded-full border border-gray-800/80 bg-[#0a0f1c]/40 shadow-2xl p-6 flex items-center justify-center relative group overflow-hidden">
              {/* Spinning grid canvas */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-[#0dd20d] opacity-15 group-hover:opacity-25 transition-opacity duration-500 animate-[spin_60s_linear_infinite]"
              >
                {/* Latitudes */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                {/* Longitudes / Meridians */}
                <ellipse cx="100" cy="100" rx="90" ry="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="90" ry="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="25" ry="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <ellipse cx="100" cy="100" rx="50" ry="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" />
                <line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" />
              </svg>

              {/* Fixed Flight Path Overlays & Center Hub */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full absolute">
                  {/* Flight path 1 */}
                  <path
                    d="M 30 100 Q 100 20 170 100"
                    fill="none"
                    stroke="#0dd20d"
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                    opacity="0.4"
                    className="animate-[dash_8s_linear_infinite]"
                  />
                  {/* Flight path 2 */}
                  <path
                    d="M 50 140 Q 100 180 150 140"
                    fill="none"
                    stroke="#0dd20d"
                    strokeWidth="0.75"
                    strokeDasharray="3 3"
                    opacity="0.3"
                  />
                  {/* Flight path 3 (Vertical elliptic arc) */}
                  <path
                    d="M 100 30 Q 170 100 100 170"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.75"
                    strokeDasharray="5 5"
                    opacity="0.2"
                  />

                  {/* Pulsing airports / hubs */}
                  <circle cx="30" cy="100" r="3" fill="#0dd20d" className="animate-pulse shadow-[0_0_8px_#0dd20d]" />
                  <circle cx="170" cy="100" r="3" fill="#0dd20d" className="animate-pulse shadow-[0_0_8px_#0dd20d]" />
                  <circle cx="100" cy="30" r="2.5" fill="#ffffff" />
                  <circle cx="100" cy="170" r="2.5" fill="#ffffff" />
                </svg>

                {/* Central solid Core */}
                <div className="w-14 h-14 rounded-full bg-[#05070d] border border-gray-800 flex items-center justify-center shadow-lg shadow-black/80">
                  <Globe className="w-6 h-6 text-[#0dd20d] animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
