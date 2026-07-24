/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { Cpu, Wrench, Layers, Settings, Compass } from 'lucide-react';
import { Language } from '../types';

interface OrbitDiagramProps {
  currentLang: Language;
}

interface Satellite {
  id: string;
  name: Record<Language, string>;
  icon: any;
  a: number; // semi-major axis
  b: number; // semi-minor axis
  tilt: number; // angle in degrees
  speed: number; // speed coefficient
  phase: number; // initial phase offset in radians
}

export default function OrbitDiagram({ currentLang }: OrbitDiagramProps) {
  const [time, setTime] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const animationRef = useRef<number>(0);

  // Respect reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let lastTime = performance.now();
    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      // Increment time parameter based on delta
      setTime((prev) => prev + delta * 0.0005);
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationRef.current);
  }, [reducedMotion]);

  // Satellite configurations with distinct elliptical parameters, tilts, and speeds
  const satellites: Satellite[] = [
    {
      id: 'avionics',
      name: {
        en: 'Avionics',
        ar: 'أنظمة الملاحة',
        es: 'Aviónica',
        pt: 'Aviônicos',
      },
      icon: Cpu,
      a: 110,
      b: 45,
      tilt: -15,
      speed: 0.8,
      phase: 0,
    },
    {
      id: 'propulsion',
      name: {
        en: 'Propulsion',
        ar: 'المحركات النفاثة',
        es: 'Propulsión',
        pt: 'Propulsão',
      },
      icon: Settings,
      a: 160,
      b: 60,
      tilt: 20,
      speed: -0.6,
      phase: 1.5,
    },
    {
      id: 'landing_gear',
      name: {
        en: 'Landing Gear',
        ar: 'معدات الهبوط',
        es: 'Tren de Aterrizaje',
        pt: 'Trem de Pouso',
      },
      icon: Layers,
      a: 215,
      b: 75,
      tilt: -5,
      speed: 0.4,
      phase: 3.1,
    },
    {
      id: 'maintenance',
      name: {
        en: 'MRO Systems',
        ar: 'أعمال الصيانة',
        es: 'Sistemas MRO',
        pt: 'Sistemas MRO',
      },
      icon: Wrench,
      a: 265,
      b: 95,
      tilt: 15,
      speed: -0.3,
      phase: 4.5,
    },
    {
      id: 'logistics',
      name: {
        en: 'Supply Chain',
        ar: 'سلسلة التوريد',
        es: 'Cadena de Suministro',
        pt: 'Cadeia de Suprimentos',
      },
      icon: Compass,
      a: 315,
      b: 115,
      tilt: -30,
      speed: 0.25,
      phase: 5.8,
    },
  ];

  // Helper function to calculate current elliptical position
  const getPosition = (sat: Satellite) => {
    // If reduced motion is active, freeze satellite at initial phase
    const t = reducedMotion ? sat.phase : sat.phase + time * sat.speed;
    const tiltRad = (sat.tilt * Math.PI) / 180;

    // Standard ellipse trigonometry: x = a * cos(t), y = b * sin(t)
    const ex = sat.a * Math.cos(t);
    const ey = sat.b * Math.sin(t);

    // Apply rotation tilt matrix
    const x = ex * Math.cos(tiltRad) - ey * Math.sin(tiltRad);
    const y = ex * Math.sin(tiltRad) + ey * Math.cos(tiltRad);

    return { x, y };
  };

  return (
    <div
      id="orbit-container"
      className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center select-none"
    >
      {/* Background soft glowing circle for depth */}
      <div className="absolute w-[80%] h-[80%] rounded-full bg-[#0dd20d]/3 blur-[100px] pointer-events-none"></div>

      <svg
        id="orbit-svg"
        viewBox="-360 -360 720 720"
        className="w-full h-full overflow-visible"
      >
        {/* Render orbit paths with gentle signal green strokes */}
        <g id="orbit-paths">
          {satellites.map((sat) => (
            <ellipse
              key={`path-${sat.id}`}
              cx="0"
              cy="0"
              rx={sat.a}
              ry={sat.b}
              transform={`rotate(${sat.tilt})`}
              fill="none"
              stroke="#0dd20d"
              strokeWidth={hoveredId === sat.id ? '1.2' : '0.5'}
              className="transition-all duration-300"
              strokeDasharray={sat.id === 'logistics' ? '4 4' : 'none'}
              opacity={hoveredId === sat.id ? '0.6' : '0.15'}
            />
          ))}
        </g>

        {/* Central Hub: Aivum Platform */}
        <g id="orbit-hub">
          {/* External radar ripple rings */}
          <circle
            cx="0"
            cy="0"
            r="42"
            fill="none"
            stroke="#0dd20d"
            strokeWidth="0.5"
            opacity="0.3"
            className="animate-[ping_3s_infinite]"
          />
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="none"
            stroke="#0dd20d"
            strokeWidth="0.5"
            opacity="0.4"
          />
          {/* Inner solid hub */}
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="#05070d"
            stroke="#0dd20d"
            strokeWidth="2.5"
            className="shadow-[0_0_20px_#0dd20d]"
          />
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="#0dd20d"
            className="animate-pulse shadow-[0_0_12px_#0dd20d]"
          />
        </g>

        {/* Render Satellites */}
        {satellites.map((sat) => {
          const { x, y } = getPosition(sat);
          const Icon = sat.icon;
          const isHovered = hoveredId === sat.id;

          return (
            <g key={`sat-${sat.id}`}>
              {/* Optional: Render small trace path leading to central hub */}
              {isHovered && (
                <line
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke="#0dd20d"
                  strokeWidth="0.75"
                  strokeDasharray="3 3"
                  opacity="0.4"
                  className="animate-[dash_1s_linear_infinite]"
                />
              )}

              {/* Satellite Node containing HTML styled with Tailwind */}
              <foreignObject
                x={x - 26}
                y={y - 26}
                width="52"
                height="52"
                className="overflow-visible"
              >
                <div
                  id={`sat-node-${sat.id}`}
                  onMouseEnter={() => setHoveredId(sat.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative w-13 h-13 rounded-full bg-[#0a0f1c] border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? 'border-[#0dd20d] scale-115 shadow-[0_0_15px_#0dd20d] text-[#0dd20d]'
                      : 'border-[#0dd20d]/20 text-gray-300 hover:border-[#0dd20d]/50'
                  }`}
                >
                  <Icon className={`w-5.5 h-5.5 transition-transform duration-500 ${isHovered ? 'rotate-12' : ''}`} />

                  {/* Satellite Label (appears on hover) */}
                  <div
                    className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-200 ${
                      isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-1'
                    }`}
                  >
                    <span className="whitespace-nowrap px-2.5 py-1 text-[10px] font-mono tracking-wider font-semibold text-white bg-[#131a2b] border border-[#0dd20d]/30 rounded shadow-md shadow-black/80">
                      {sat.name[currentLang]}
                    </span>
                    {/* Small arrow */}
                    <div className="w-1.5 h-1.5 bg-[#131a2b] border-r border-b border-[#0dd20d]/30 rotate-45 -mt-1"></div>
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
