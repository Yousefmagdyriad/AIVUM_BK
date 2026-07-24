/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TRANSLATIONS } from '../data';
import { Language } from '../types';
import { ClipboardList, Search, FileCheck2, PlaneTakeoff } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessProps {
  currentLang: Language;
}

export default function Process({ currentLang }: ProcessProps) {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  // Map step numbers to representative lucide icons
  const getStepIcon = (id: number) => {
    const iconClass = "w-6 h-6 text-[#0dd20d]";
    switch (id) {
      case 1:
        return <ClipboardList className={iconClass} />;
      case 2:
        return <Search className={iconClass} />;
      case 3:
        return <FileCheck2 className={iconClass} />;
      case 4:
        return <PlaneTakeoff className={iconClass} />;
      default:
        return <ClipboardList className={iconClass} />;
    }
  };

  return (
    <section id="process" className="relative py-24 bg-[#05070d] overflow-hidden scroll-mt-20">
      {/* Background aesthetics */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      <div className="absolute left-12 bottom-12 w-64 h-64 bg-[#0dd20d]/2 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`mb-20 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div className="inline-block px-3 py-1 bg-[#0dd20d]/10 border border-[#0dd20d]/30 text-[#0dd20d] text-[10px] uppercase tracking-[0.3em] rounded-sm mb-4 font-bold">
            {t.process.eyebrow}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            {t.process.heading}
          </h2>
        </div>

        {/* Horizontal (Desktop) / Vertical (Mobile) Stepper Grid */}
        <div className="relative mt-12">
          {/* DESKTOP CONNECTING FLIGHT PATH SVG LINE (Hidden on mobile) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 w-full h-[2px] pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" fill="none">
              <line
                x1="4%"
                y1="1"
                x2="96%"
                y2="1"
                stroke="rgba(13, 210, 13, 0.15)"
                strokeWidth="2"
              />
              <line
                x1={isRtl ? "96%" : "4%"}
                y1="1"
                x2={isRtl ? "4%" : "96%"}
                y2="1"
                stroke="#0dd20d"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="animate-[dash_20s_linear_infinite]"
              />
            </svg>
          </div>

          {/* Steps list container */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10 ${
              isRtl ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {t.process.steps.map((step, idx) => {
              return (
                <motion.div
                  key={step.id}
                  id={`process-step-${step.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`relative flex flex-col items-center lg:items-start text-center lg:text-left ${
                    isRtl ? 'lg:text-right lg:items-end' : ''
                  }`}
                >
                  {/* MOBILE CONNECTING VERTICAL LINE (Visible only on mobile, drawn between nodes) */}
                  {idx < t.process.steps.length - 1 && (
                    <div className="lg:hidden absolute top-24 bottom-[-48px] left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#0dd20d]/40 to-transparent z-0"></div>
                  )}

                  {/* Node Circle Frame */}
                  <div className="relative flex items-center justify-center mb-6">
                    {/* Ring glow */}
                    <div className="absolute -inset-2 rounded-sm border border-[#0dd20d]/5 bg-[#0dd20d]/1 transition-all duration-300 group-hover:scale-110"></div>

                    {/* Outer sharp box */}
                    <div className="w-24 h-24 rounded-sm bg-[#0a0f1c] border-2 border-white/10 flex flex-col items-center justify-center text-white shadow-xl shadow-black relative z-10 hover:border-[#0dd20d] hover:shadow-[0_0_15px_rgba(13,210,13,0.3)] transition-all duration-300">
                      {/* Step Number Badge */}
                      <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] bg-[#131a2b] border border-[#0dd20d]/30 text-[#0dd20d] px-1.5 py-0.5 rounded-sm font-bold">
                        {step.number}
                      </span>
                      {/* Icon */}
                      <div className="mb-1">{getStepIcon(step.id)}</div>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div className="px-4 lg:px-0 mt-2 max-w-sm">
                    <h3 className="font-display text-lg font-bold text-white mb-2 tracking-wide hover:text-[#0dd20d] transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Embedded CSS for custom infinite dash keyframe */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </section>
  );
}
