/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { Cpu, RotateCw, Layers, ShieldCheck, Wrench, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesProps {
  currentLang: Language;
}

export default function Services({ currentLang }: ServicesProps) {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Maps custom icon name to styled vector structures with micro-motions
  const renderInteractiveIcon = (iconName: string, isHovered: boolean) => {
    const iconBaseClass = `w-8 h-8 transition-all duration-500 ${
      isHovered ? 'text-[#0dd20d] filter drop-shadow-[0_0_8px_rgba(13,210,13,0.6)]' : 'text-gray-400'
    }`;

    switch (iconName) {
      case 'sourcing': // Avionics & Flight Systems
        return (
          <div className="relative">
            <Cpu className={`${iconBaseClass} ${isHovered ? 'scale-110' : ''}`} />
            {isHovered && (
              <span className="absolute -inset-1 rounded-full bg-[#0dd20d]/10 animate-ping"></span>
            )}
          </div>
        );
      case 'import': // Turbofan Engines & Rotors (Propeller spins)
        return (
          <RotateCw
            className={`${iconBaseClass} ${isHovered ? 'rotate-[360deg] scale-110' : ''}`}
            style={{ transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          />
        );
      case 'maintenance': // Landing Gear & Hydraulics (Bars lift / slide)
        return (
          <div className="relative flex items-center justify-center">
            <Layers className={`${iconBaseClass} ${isHovered ? '-translate-y-1 scale-110' : ''}`} />
            {isHovered && (
              <div className="absolute bottom-0 w-6 h-[2px] bg-[#0dd20d] shadow-[0_0_4px_#0dd20d] animate-pulse"></div>
            )}
          </div>
        );
      case 'export': // Custom Logistics & Customs (Slide/Shift transport)
        return (
          <div className="overflow-hidden p-1">
            <ShieldCheck
              className={`${iconBaseClass} ${
                isHovered ? 'translate-x-0.5 -translate-y-0.5 scale-110' : ''
              }`}
            />
          </div>
        );
      case 'logistics': // Cabin Systems & Overhaul (Wrench tilts)
        return (
          <Wrench
            className={`${iconBaseClass} ${isHovered ? 'rotate-[-45deg] scale-115' : ''}`}
            style={{ transition: 'transform 0.4s ease-in-out' }}
          />
        );
      default:
        return <Cpu className={iconBaseClass} />;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#0a0f1c] overflow-hidden scroll-mt-20">
      {/* Structural ambient details */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      <div className="absolute -right-24 top-1/3 w-80 h-80 bg-[#0dd20d]/2 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="inline-block px-3 py-1 bg-[#0dd20d]/10 border border-[#0dd20d]/30 text-[#0dd20d] text-[10px] uppercase tracking-[0.3em] rounded-sm mb-4 font-bold">
            {t.services.eyebrow}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            {t.services.heading}
          </h2>
        </div>

        {/* Bento Grid layout for square cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            return (
              <motion.div
                key={item.id}
                id={`service-card-${item.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative group h-full rounded-sm bg-[#05070d]/60 border p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isHovered
                    ? 'border-[#0dd20d]/40 -translate-y-2 shadow-[0_0_20px_rgba(13,210,13,0.15)] bg-[#05070d]'
                    : 'border-white/5 bg-[#05070d]/30'
                }`}
              >
                {/* Background grid texture overlay on hover */}
                <div
                  className={`absolute inset-0 rounded-sm bg-[radial-gradient(#0dd20d_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none transition-opacity duration-300 ${
                    isHovered ? 'opacity-3' : 'opacity-0'
                  }`}
                ></div>

                <div>
                  {/* Square icon frame with rounded corner & inner glow */}
                  <div
                    className={`w-14 h-14 rounded-sm flex items-center justify-center transition-all duration-300 mb-8 border ${
                      isHovered
                        ? 'border-[#0dd20d] bg-[#0dd20d]/5 shadow-[inset_0_0_12px_rgba(13,210,13,0.2)]'
                        : 'border-white/10 bg-[#0a0f1c]/80 shadow-[inset_0_0_8px_rgba(255,255,255,0.02)]'
                    }`}
                  >
                    {renderInteractiveIcon(item.iconName, isHovered)}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-white tracking-wide mb-3 transition-colors duration-200 group-hover:text-[#0dd20d]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow hint indicator */}
                <div className="mt-8 flex justify-end">
                  <span
                    className={`text-xs font-mono font-bold tracking-widest flex items-center gap-1 transition-all duration-300 ${
                      isHovered ? 'text-[#0dd20d]' : 'text-gray-600'
                    }`}
                  >
                    {isRtl ? (
                      <>
                        <ArrowLeft
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isHovered ? '-translate-x-1' : ''
                          }`}
                        />
                        <span>عقد</span>
                      </>
                    ) : (
                      <>
                        <span>DEAL</span>
                        <ArrowRight
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isHovered ? 'translate-x-1' : ''
                          }`}
                        />
                      </>
                    )}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
