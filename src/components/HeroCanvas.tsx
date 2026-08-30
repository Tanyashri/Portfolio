import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  glowColor: string;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  phase: number;
  vx: number;
  vy: number;
  twinkle: boolean;
  rays: 4 | 6 | 8;
  type: 'sparkle' | 'orb' | 'star';
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
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCanvasElements();
    };

    window.addEventListener('resize', handleResize);

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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Glowing sparkles color palette
    const COLORS = [
      { core: '#FF85A2', glow: 'rgba(255, 133, 162, 0.4)' }, // Pink
      { core: '#5EEAD4', glow: 'rgba(94, 234, 212, 0.4)' },  // Mint
      { core: '#FEF08A', glow: 'rgba(254, 240, 138, 0.4)' }, // Gold
      { core: '#C084FC', glow: 'rgba(192, 132, 252, 0.4)' }, // Lavender
      { core: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.45)' } // White
    ];

    let sparkles: SparkleParticle[] = [];
    let glowOrbs: AmbientGlowOrb[] = [];

    const initCanvasElements = () => {
      sparkles = [];
      glowOrbs = [
        {
          x: width * 0.2,
          y: height * 0.3,
          radius: Math.min(width, height) * 0.35,
          color: 'rgba(255, 133, 162, 0.05)',
          vx: 0.08,
          vy: 0.05,
          pulsePhase: 0
        },
        {
          x: width * 0.8,
          y: height * 0.25,
          radius: Math.min(width, height) * 0.38,
          color: 'rgba(94, 234, 212, 0.04)',
          vx: -0.06,
          vy: 0.04,
          pulsePhase: 1.5
        },
        {
          x: width * 0.5,
          y: height * 0.75,
          radius: Math.min(width, height) * 0.4,
          color: 'rgba(254, 240, 138, 0.03)',
          vx: 0.04,
          vy: -0.06,
          pulsePhase: 3.0
        },
        {
          x: width * 0.85,
          y: height * 0.8,
          radius: Math.min(width, height) * 0.32,
          color: 'rgba(192, 132, 252, 0.04)',
          vx: -0.05,
          vy: -0.05,
          pulsePhase: 4.5
        }
      ];
    };

    initCanvasElements();

    // Draw sparkle / star
    const drawSparkle = (
      ctx: CanvasRenderingContext2D,
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

      // Soft radial glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 3.5);
      grad.addColorStop(0, glowColor);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Sharp central star
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = size * 2.5;

      ctx.beginPath();
      const numPoints = rays;
      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? size * 2 : size * 0.4;
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
      ctx.arc(x, y, size * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // Draw glowing orb
    const drawOrb = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      glowColor: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      grad.addColorStop(0, color);
      grad.addColorStop(0.4, glowColor);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Ambient Glow Orbs
      glowOrbs.forEach((orb) => {
        orb.pulsePhase += 0.008;
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < width * 0.05 || orb.x > width * 0.95) orb.vx *= -1;
        if (orb.y < height * 0.05 || orb.y > height * 0.95) orb.vy *= -1;

        const pulseScale = 1 + Math.sin(orb.pulsePhase) * 0.1;
        const r = orb.radius * pulseScale;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r);
        grad.addColorStop(0, orb.color);
        grad.addColorStop(0.7, orb.color.replace(/[\d\.]+\)$/, '0.01)'));
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Twinkling Sparkles
      sparkles.forEach((s) => {
        s.phase += s.pulseSpeed;

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -20) s.x = width + 20;
        if (s.x > width + 20) s.x = -20;
        if (s.y < -20) s.y = height + 20;
        if (s.y > height + 20) s.y = -20;

        if (mouseRef.current.isInside) {
          const dx = mouseRef.current.x - s.x;
          const dy = mouseRef.current.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            s.x -= (dx / dist) * force * 1.2;
            s.y -= (dy / dist) * force * 1.2;
          }
        }

        const currentAlpha = s.twinkle
          ? (Math.sin(s.phase) * 0.5 + 0.5) * s.maxAlpha
          : s.maxAlpha;

        if (s.type === 'sparkle' || s.type === 'star') {
          drawSparkle(ctx, s.x, s.y, s.size, s.color, s.glowColor, Math.max(0.1, currentAlpha), s.rays);
        } else {
          drawOrb(ctx, s.x, s.y, s.size, s.color, s.glowColor, Math.max(0.1, currentAlpha));
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
