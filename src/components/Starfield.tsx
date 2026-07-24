/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create stars
    const numStars = Math.min(200, Math.floor((width * height) / 8000));
    const stars: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      alpha: number;
      twinkleSpeed: number;
    }[] = [];

    const colors = [
      'rgba(255, 255, 255, ',
      'rgba(220, 245, 220, ', // Greenish-white
      'rgba(190, 255, 190, ', // Accent green-white
    ];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        alpha: Math.random(),
        twinkleSpeed: 0.005 + Math.random() * 0.015,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates around the center of the viewport (-0.5 to 0.5)
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates for fluid parallax inertia
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      stars.forEach((star) => {
        // Star movement with drift and mouse parallax
        let sx = star.x;
        let sy = star.y;

        if (!prefersReducedMotion) {
          sx += star.speedX;
          sy += star.speedY;

          // Parallax displacement based on star size (farther stars move less)
          const parallaxFactor = star.size * 15;
          sx -= mouse.x * parallaxFactor * 0.05;
          sy -= mouse.y * parallaxFactor * 0.05;

          // Wrap around edges
          if (sx < 0) sx = width;
          if (sx > width) sx = 0;
          if (sy < 0) sy = height;
          if (sy > height) sy = 0;

          // Twinkle alpha
          star.alpha += star.twinkleSpeed;
          if (star.alpha > 1 || star.alpha < 0.2) {
            star.twinkleSpeed = -star.twinkleSpeed;
          }
        }

        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
