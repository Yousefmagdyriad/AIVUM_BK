/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Language } from '../types';

interface StatsProps {
  currentLang: Language;
}

interface AnimatedValueProps {
  value: number;
  suffix: string;
  trigger: boolean;
}

// Sub-component to handle smooth requestAnimationFrame counting
function AnimatedValue({ value, suffix, trigger }: AnimatedValueProps) {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;
    hasAnimated.current = true;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrent(value);
      return;
    }

    const duration = 2000; // Total duration in ms
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // EaseOutQuad formula for natural deceleration
      const easeProgress = progress * (2 - progress);
      const currentVal = easeProgress * value;

      setCurrent(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCurrent(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value, trigger]);

  // Format decimal values or large values nicely
  const formatNumber = (num: number) => {
    if (value % 1 !== 0) {
      // Floating point number (like 99.8)
      return num.toFixed(1);
    }
    // Integer number
    return Math.floor(num).toLocaleString();
  };

  return (
    <span ref={elementRef} className="font-display text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter text-[#0dd20d] leading-none">
      {formatNumber(current)}
      <span className="text-white ml-0.5 not-italic">{suffix}</span>
    </span>
  );
}

export default function Stats({ currentLang }: StatsProps) {
  const t = TRANSLATIONS[currentLang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after triggering to avoid repetitive triggers on scroll up/down
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="stats-strip"
      className="relative bg-[#0a0f1c] py-16 border-y border-white/5"
    >
      {/* Background vector accents */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(13,210,13,0.015)_1px,transparent_1px)] [background-size:100%_12px] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
          {t.stats.items.map((item, idx) => (
            <div
              key={`stat-${idx}`}
              id={`stat-item-${idx}`}
              className="flex flex-col items-center justify-center p-6 border border-white/5 bg-[#05070d]/40 rounded-sm backdrop-blur-sm hover:border-[#0dd20d]/30 transition-all duration-300"
            >
              {/* Numeric Value */}
              <AnimatedValue
                value={item.value}
                suffix={item.suffix}
                trigger={isVisible}
              />
              {/* Short Label */}
              <span className="mt-3 text-xs sm:text-sm font-mono tracking-wider text-gray-400 uppercase font-medium max-w-[200px] leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
