import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
  maxAlpha: number;
  pulseSpeed: number;
  phase: number;
  vx: number;
  vy: number;
  rays: 4 | 6 | 8;
}

interface AmbientGlowOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  pulsePhase: number;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

    let sparkles: SparkleParticle[] = [];
    let glowOrbs: AmbientGlowOrb[] = [];

    const SPARKLE_COLORS = [
      { core: '#FF85A2', glow: 'rgba(255, 133, 162, 0.35)' }, // Sakura Pink
      { core: '#5EEAD4', glow: 'rgba(94, 234, 212, 0.35)' },  // Mint
      { core: '#FEF08A', glow: 'rgba(254, 240, 138, 0.35)' }, // Gold
      { core: '#C084FC', glow: 'rgba(192, 132, 252, 0.35)' }, // Lavender
      { core: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.4)' }   // White
    ];

    const initCanvasElements = (w: number, h: number) => {
      const isMobile = w < 640;
      const numSparkles = isMobile ? 18 : 36;

      sparkles = [];
      for (let i = 0; i < numSparkles; i++) {
        const col = SPARKLE_COLORS[i % SPARKLE_COLORS.length];
        sparkles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * (isMobile ? 2 : 3) + 1.2,
          color: col.core,
          glowColor: col.glow,
          maxAlpha: Math.random() * 0.55 + 0.35,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          phase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
          vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
          rays: i % 3 === 0 ? 6 : i % 2 === 0 ? 8 : 4
        });
      }

      glowOrbs = [
        {
          x: w * 0.2,
          y: h * 0.3,
          radius: Math.min(w, h) * (isMobile ? 0.45 : 0.35),
          color: 'rgba(255, 133, 162, 0.05)',
          vx: 0.06,
          vy: 0.04,
          pulsePhase: 0
        },
        {
          x: w * 0.8,
          y: h * 0.25,
          radius: Math.min(w, h) * (isMobile ? 0.45 : 0.38),
          color: 'rgba(94, 234, 212, 0.04)',
          vx: -0.05,
          vy: 0.03,
          pulsePhase: 1.5
        },
        {
          x: w * 0.5,
          y: h * 0.75,
          radius: Math.min(w, h) * (isMobile ? 0.48 : 0.4),
          color: 'rgba(254, 240, 138, 0.03)',
          vx: 0.03,
          vy: -0.05,
          pulsePhase: 3.0
        },
        {
          x: w * 0.85,
          y: h * 0.8,
          radius: Math.min(w, h) * (isMobile ? 0.4 : 0.32),
          color: 'rgba(192, 132, 252, 0.04)',
          vx: -0.04,
          vy: -0.04,
          pulsePhase: 4.5
        }
      ];
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initCanvasElements(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Pause rendering when canvas is not in viewport (e.g. user scrolled down)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          render();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const drawSparkle = (
      x: number,
      y: number,
      size: number,
      color: string,
      glowColor: string,
      alpha: number,
      rays: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      // Soft ambient glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      grad.addColorStop(0, glowColor);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Sharp central star
      ctx.fillStyle = color;
      ctx.beginPath();
      const numPoints = rays;
      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? size * 1.8 : size * 0.45;
        const angle = (i * Math.PI) / numPoints;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Center bright white pin
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Ambient Glow Orbs
      for (let i = 0; i < glowOrbs.length; i++) {
        const orb = glowOrbs[i];
        orb.pulsePhase += 0.006;
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < width * 0.05 || orb.x > width * 0.95) orb.vx *= -1;
        if (orb.y < height * 0.05 || orb.y > height * 0.95) orb.vy *= -1;

        const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.08;
        const r = orb.radius * pulseScale;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.7, orb.color.replace(/[\d\.]+\)$/, '0.008)'));
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Twinkling Sparkles
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.phase += s.pulseSpeed;

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -20) s.x = width + 20;
        if (s.x > width + 20) s.x = -20;
        if (s.y < -20) s.y = height + 20;
        if (s.y > height + 20) s.y = -20;

        // Subtle mouse repulsion on desktop
        if (mouseRef.current.isInside) {
          const dx = mouseRef.current.x - s.x;
          const dy = mouseRef.current.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            s.x -= (dx / dist) * force * 1.2;
            s.y -= (dy / dist) * force * 1.2;
          }
        }

        const currentAlpha = (Math.sin(s.phase) * 0.5 + 0.5) * s.maxAlpha;
        drawSparkle(s.x, s.y, s.size, s.color, s.glowColor, Math.max(0.1, currentAlpha), s.rays);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
