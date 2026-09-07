import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Copy, Check, Github, Linkedin, Code, ArrowUpRight, MessageSquare, Sparkles, Heart, Pin, Layers, Move } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AnimatedDecoderText } from './AnimatedDecoderText';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

interface UnevenPaperCard {
  id: string;
  name: string;
  handle: string;
  recipient: string;
  handwrittenNote: string;
  url: string;
  icon: React.ElementType;
  paperType: 'spiral' | 'ruled' | 'postit' | 'receipt' | 'airmail';
  paperBg: string;
  borderColor: string;
  tapeColor: string;
  tapeStyle: 'pink' | 'mint' | 'yellow' | 'lavender' | 'peach';
  tapePosition: 'top-center' | 'top-left' | 'top-right' | 'corner';
  tapeAngle: number;
  hasPaperClip?: boolean;
  hasPushPin?: boolean;
  clipPathStyle: string;
  inkColor: string;
  accentColor: string;
  emoji: string;
  stampText: string;
  baseRotation: number;
  scatterX: number;
  scatterY: number;
  scatterRotate: number;
  doodle: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyCard = (e: React.MouseEvent, handle: string, cardId: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(handle);
    setCopiedCardId(cardId);
    setTimeout(() => setCopiedCardId(null), 1800);
  };

  // 5 Unevenly Cut Hand-Torn Paper Slips
  const UNEVEN_PAPER_CARDS: UnevenPaperCard[] = [
    {
      id: 'github',
      name: 'GitHub',
      handle: '@Tanyashri',
      recipient: 'Dear builder & dev,',
      handwrittenNote: 'Peek at my open-source repos & late-night commits! ✨',
      url: PERSONAL_INFO.github,
      icon: Github,
      paperType: 'spiral',
      paperBg: '#FFF0F5',
      borderColor: '#FDA4AF',
      tapeColor: '#FDA4AF',
      tapeStyle: 'pink',
      tapePosition: 'top-left',
      tapeAngle: -6,
      clipPathStyle: 'polygon(0% 2%, 3% 0%, 97% 1%, 100% 4%, 99% 96%, 96% 100%, 4% 98%, 0% 95%)',
      inkColor: '#4C0519',
      accentColor: '#E11D48',
      emoji: '🐙',
      stampText: 'AIR MAIL ✦',
      baseRotation: -6,
      scatterX: -360,
      scatterY: 20,
      scatterRotate: -12,
      doodle: '🐾'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'in/tanyashri-m',
      recipient: 'Hey recruiter & friend,',
      handwrittenNote: "Let's connect & chat about software internships! 💬",
      url: PERSONAL_INFO.linkedin,
      icon: Linkedin,
      paperType: 'ruled',
      paperBg: '#F0FDFA',
      borderColor: '#99F6E4',
      tapeColor: '#5EEAD4',
      tapeStyle: 'mint',
      tapePosition: 'top-right',
      tapeAngle: 7,
      hasPaperClip: true,
      clipPathStyle: 'polygon(2% 0%, 98% 2%, 100% 97%, 95% 100%, 3% 99%, 0% 95%, 1% 4%)',
      inkColor: '#042F2E',
      accentColor: '#0D9488',
      emoji: '💼',
      stampText: 'VERIFIED POST',
      baseRotation: 4,
      scatterX: -180,
      scatterY: -24,
      scatterRotate: -4,
      doodle: '☕'
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      handle: 'u/tanyashrim2005',
      recipient: 'Fellow graph solver,',
      handwrittenNote: 'Daily grind: trees, graphs, and dynamic programming ⚡',
      url: PERSONAL_INFO.leetcode,
      icon: Code,
      paperType: 'postit',
      paperBg: '#FEFCE8',
      borderColor: '#FDE047',
      tapeColor: '#FACC15',
      tapeStyle: 'yellow',
      tapePosition: 'top-center',
      tapeAngle: -2,
      hasPushPin: true,
      clipPathStyle: 'polygon(1% 1%, 99% 0%, 100% 94%, 97% 99%, 4% 100%, 0% 96%)',
      inkColor: '#422006',
      accentColor: '#D97706',
      emoji: '💡',
      stampText: 'DAILY STREAK',
      baseRotation: -2,
      scatterX: 0,
      scatterY: -42,
      scatterRotate: 1,
      doodle: '⭐'
    },
    {
      id: 'discord',
      name: 'Discord',
      handle: 'tanyashri',
      recipient: 'Hey cozy coder,',
      handwrittenNote: 'Drop a voice/text hi anytime for chill tech talk 🎧',
      url: PERSONAL_INFO.discord,
      icon: MessageSquare,
      paperType: 'receipt',
      paperBg: '#FAF5FF',
      borderColor: '#E9D5FF',
      tapeColor: '#C084FC',
      tapeStyle: 'lavender',
      tapePosition: 'corner',
      tapeAngle: -9,
      clipPathStyle: 'polygon(2% 0%, 98% 1%, 100% 95%, 97% 100%, 2% 98%, 0% 94%)',
      inkColor: '#3B0764',
      accentColor: '#9333EA',
      emoji: '👾',
      stampText: 'COMMUNITY',
      baseRotation: 6,
      scatterX: 180,
      scatterY: -22,
      scatterRotate: 6,
      doodle: '🎀'
    },
    {
      id: 'email',
      name: 'Direct Mail',
      handle: 'tanyashrim2005@gmail.com',
      recipient: 'To: You! 💌',
      handwrittenNote: 'My inbox is always open for ideas, collab & boba tea 📮',
      url: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
      paperType: 'airmail',
      paperBg: '#FFF7ED',
      borderColor: '#FED7AA',
      tapeColor: '#FB923C',
      tapeStyle: 'peach',
      tapePosition: 'top-center',
      tapeAngle: 4,
      hasPaperClip: true,
      clipPathStyle: 'polygon(1% 3%, 99% 0%, 98% 97%, 95% 100%, 2% 98%, 0% 94%)',
      inkColor: '#431407',
      accentColor: '#EA580C',
      emoji: '📮',
      stampText: 'SPECIAL POST',
      baseRotation: -5,
      scatterX: 360,
      scatterY: 22,
      scatterRotate: 12,
      doodle: '🌸'
    }
  ];

  // Helper to render realistic washi tape with jagged torn edge
  const renderWashiTape = (tapeStyle: UnevenPaperCard['tapeStyle'], position: UnevenPaperCard['tapePosition'], angle: number) => {
    const styleClass = `washi-tape-${tapeStyle}`;
    let posClass = 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2';
    if (position === 'top-left') posClass = 'top-0 left-6 -translate-y-1/2';
    if (position === 'top-right') posClass = 'top-0 right-6 -translate-y-1/2';
    if (position === 'corner') posClass = '-top-2 -left-3';

    return (
      <div
        className={`absolute ${posClass} z-20 w-16 h-5 ${styleClass} rounded-xs shadow-md opacity-95 pointer-events-none`}
        style={{
          transform: `rotate(${angle}deg)`,
          clipPath: 'polygon(0% 15%, 4% 0%, 96% 0%, 100% 15%, 96% 100%, 4% 100%, 0% 85%)'
        }}
      >
        <div className="w-full h-full border-y border-white/40" />
      </div>
    );
  };

  // Helper to render cute metallic paper clip
  const renderPaperClip = (color = '#94A3B8') => (
    <div className="absolute -top-3 right-8 z-30 pointer-events-none">
      <svg width="20" height="34" viewBox="0 0 20 34" fill="none" className="drop-shadow-sm">
        <path
          d="M6 8V24C6 26.7614 8.23858 29 11 29C13.7614 29 16 26.7614 16 24V6C16 3.23858 13.7614 1 11 1C8.23858 1 6 3.23858 6 6V22C6 23.6569 7.34315 25 9 25C10.6569 25 12 23.6569 12 22V8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  // Helper to render push pin
  const renderPushPin = () => (
    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-md">
      <div className="w-4 h-4 rounded-full bg-[#EF4444] border-2 border-[#B91C1C] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
      </div>
    </div>
  );

  // Background Paper Textures with Realistic Grid/Lines/Serrations
  const getPaperBackgroundStyle = (card: UnevenPaperCard) => {
    if (card.paperType === 'spiral') {
      return {
        backgroundColor: card.paperBg,
        backgroundImage: `linear-gradient(to right, rgba(255, 133, 162, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 133, 162, 0.14) 1px, transparent 1px)`,
        backgroundSize: '16px 16px',
        backgroundPosition: '0 10px'
      };
    }
    if (card.paperType === 'ruled') {
      return {
        backgroundColor: card.paperBg,
        backgroundImage: `repeating-linear-gradient(transparent, transparent 20px, rgba(94, 234, 212, 0.22) 20px, rgba(94, 234, 212, 0.22) 21px)`,
        backgroundPosition: '0 24px'
      };
    }
    if (card.paperType === 'postit') {
      return {
        backgroundColor: card.paperBg,
        backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.45) 0%, transparent 40%)`
      };
    }
    if (card.paperType === 'receipt') {
      return {
        backgroundColor: card.paperBg,
        backgroundImage: `radial-gradient(rgba(192, 132, 252, 0.18) 1px, transparent 0)`,
        backgroundSize: '13px 13px'
      };
    }
    return {
      backgroundColor: card.paperBg,
      backgroundImage: `repeating-linear-gradient(transparent, transparent 22px, rgba(251, 146, 60, 0.18) 22px, rgba(251, 146, 60, 0.18) 23px)`,
      backgroundPosition: '0 26px'
    };
  };

  return (
    <footer id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 overflow-hidden relative">
      {/* Section Tag */}
      <div className="flex items-center gap-2 font-mono text-xs text-[#FF85A2] mb-6 uppercase tracking-[0.2em]">
        <span>// 09 LET'S CONNECT & BUILD</span>
        <span>—</span>
        <AnimatedDecoderText text="GET IN TOUCH & SAY HI" />
      </div>

      {/* 1. MAIN EDITORIAL BANNER */}
      <div className="relative p-8 sm:p-12 bg-white/[0.02] border border-white/10 hover:border-[#FF85A2]/30 rounded-3xl overflow-hidden mb-16 shadow-lg">
        <div className="w-32 h-4 washi-tape-pink rounded-sm absolute -top-2 left-12 opacity-90 -rotate-1 shadow-sm" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-[#FDFCFB] leading-tight">
              Got an idea worth breaking? <span className="text-stroke-pink font-bold">Let's build it.</span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 mt-4 max-w-2xl leading-relaxed font-sans">
              Always open to discussing machine learning infrastructure, graph databases, distributed systems, open-source repositories, and software engineering internship opportunities.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={handleCopyEmail}
              data-cursor="CONTACT"
              className="w-full py-4 px-6 bg-[#FF85A2] hover:bg-[#ff7092] text-black font-mono text-xs font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF85A2]/20 hover:shadow-[#FF85A2]/40 uppercase tracking-wider cursor-pointer hover:scale-[1.02]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>EMAIL COPIED: {PERSONAL_INFO.email} ✨</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY EMAIL ADDRESS 💌</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              data-cursor="CONTACT"
              className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-semibold rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#5EEAD4]" />
              <span>SEND AN EMAIL DIRECTLY</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. THE SINGLE STACK OF UNEVENLY CUT PAPERS THAT SCATTERS ON HOVER */}
      <div className="mb-16 relative">
        {/* Cute Desk Header with Interaction Hint */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF85A2] animate-spin" style={{ animationDuration: '8s' }} />
              <span className="font-handwritten text-2xl sm:text-3xl text-[#FEF08A] font-bold">
                Tanyashri's Desk Paper Stack 💌
              </span>
            </div>
            <p className="font-handwritten text-base sm:text-lg text-white/70 mt-1">
              Hand-torn stationery & taped slips stacked in one pile — <span className="text-[#FF85A2] font-bold">hover or tap the pile to scatter them!</span> 🌸
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
              <Move className="w-3.5 h-3.5 text-[#5EEAD4] animate-bounce" />
              <span>{isHovered ? '✨ DECK SCATTERED' : 'HOVER PILE TO SCATTER'}</span>
            </div>
          </div>
        </div>

        {/* THE INTERACTIVE STACK & SCATTER DESK AREA */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveCardId(null);
          }}
          onClick={() => setIsHovered((prev) => !prev)}
          className="relative w-full min-h-[460px] flex items-center justify-center py-12 select-none cursor-pointer"
        >
          {/* Subtle Desk Felt Mat / Shadow Base */}
          <div className="absolute w-72 h-80 rounded-3xl bg-white/[0.02] border border-white/5 shadow-2xl pointer-events-none" />

          {/* Desktop & Tablet: Silky Spring Paper Scatter with Uneven Cute Cards */}
          <div className="hidden sm:block relative w-72 h-96">
            {UNEVEN_PAPER_CARDS.map((card, index) => {
              const Icon = card.icon;
              const isCardHovered = activeCardId === card.id;
              const isEmail = card.id === 'email';

              // When collapsed (stacked as ONE pile):
              // Stacking offsets so edges of uneven paper peek through realistically
              const stackX = (index - 2) * 8;
              const stackY = (index - 2) * 5;
              const stackRotate = card.baseRotation * 1.8;

              // Responsive scaling for scatter offset
              const scaleFactor = windowWidth < 1024 ? (windowWidth < 800 ? 0.45 : 0.65) : 1;

              // When hovered (scattered across desk):
              const targetX = isHovered ? card.scatterX * scaleFactor : stackX;
              const targetY = isHovered ? (isCardHovered ? card.scatterY - 24 : card.scatterY) : stackY;
              const targetRotate = isHovered ? (isCardHovered ? 0 : card.scatterRotate) : stackRotate;
              const targetScale = isCardHovered ? 1.06 : isHovered ? (windowWidth < 1024 ? 0.9 : 1) : 1 - Math.abs(index - 2) * 0.02;
              const targetZIndex = isCardHovered ? 50 : isHovered ? 20 + index : 10 + index;

              return (
                <motion.div
                  key={card.id}
                  animate={{
                    x: targetX,
                    y: targetY,
                    rotate: targetRotate,
                    scale: targetScale,
                    zIndex: targetZIndex
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 18,
                    mass: 0.8
                  }}
                  onMouseEnter={(e) => {
                    if (isHovered) {
                      e.stopPropagation();
                      setActiveCardId(card.id);
                    }
                  }}
                  onMouseLeave={() => setActiveCardId(null)}
                  className="absolute inset-0 origin-center"
                >
                  {/* Uneven Paper Piece Container with Torn Silhouette */}
                  <div
                    className="w-full h-full p-5 flex flex-col justify-between shadow-2xl relative group transition-all duration-300"
                    style={{
                      ...getPaperBackgroundStyle(card),
                      clipPath: card.clipPathStyle,
                      border: `1.5px solid ${card.borderColor}`,
                      boxShadow: isCardHovered
                        ? `0 26px 45px -6px rgba(0,0,0,0.85), 0 0 25px ${card.accentColor}40`
                        : isHovered
                        ? '0 18px 32px -6px rgba(0,0,0,0.7)'
                        : '0 12px 24px -5px rgba(0,0,0,0.8)'
                    }}
                  >
                    {/* Real Washi Tape & Clips */}
                    {renderWashiTape(card.tapeStyle, card.tapePosition, card.tapeAngle)}
                    {card.hasPaperClip && renderPaperClip()}
                    {card.hasPushPin && renderPushPin()}

                    {/* Ragged Torn Top Edge Simulation */}
                    <div className="absolute top-1 left-4 right-4 flex justify-between pointer-events-none opacity-30">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-2 h-1 rounded-full bg-black/40" />
                      ))}
                    </div>

                    {/* Paper Header */}
                    <div className="relative z-10 pt-2">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-handwritten text-base font-bold tracking-tight"
                          style={{ color: card.accentColor }}
                        >
                          {card.recipient}
                        </span>
                        <div
                          className="border border-dashed px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase transform rotate-2 shadow-2xs"
                          style={{
                            borderColor: card.accentColor,
                            color: card.accentColor,
                            backgroundColor: 'rgba(255,255,255,0.75)'
                          }}
                        >
                          {card.stampText}
                        </div>
                      </div>

                      {/* Handwritten Note Body */}
                      <p
                        className="font-handwritten text-lg leading-tight mt-2.5 font-medium min-h-[44px]"
                        style={{ color: card.inkColor }}
                      >
                        "{card.handwrittenNote}"
                      </p>
                    </div>

                    {/* Middle Section: Channel Name + Link Arrow */}
                    <a
                      href={card.url}
                      target={isEmail ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      data-cursor="OPEN"
                      onClick={(e) => e.stopPropagation()}
                      className="relative z-10 my-1 py-2 px-3 rounded-xl bg-white/85 hover:bg-white border border-black/10 shadow-xs flex items-center justify-between transition-all group/link"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-2xs"
                          style={{ backgroundColor: card.accentColor }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold font-display" style={{ color: card.inkColor }}>
                            {card.name}
                          </div>
                          <div
                            className="text-[11px] font-mono font-semibold truncate max-w-[120px]"
                            style={{ color: card.accentColor }}
                          >
                            {card.handle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-sm">{card.emoji}</span>
                        <ArrowUpRight
                          className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          style={{ color: card.accentColor }}
                        />
                      </div>
                    </a>

                    {/* Paper Footer: Direct Action & Quick Copy */}
                    <div className="pt-2 border-t border-black/10 relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span
                          className="font-handwritten text-xs font-semibold"
                          style={{ color: card.inkColor, opacity: 0.9 }}
                        >
                          — Tanya ✨
                        </span>
                        <span className="text-xs">{card.doodle}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleCopyCard(e, card.handle, card.id)}
                        className="px-2.5 py-0.5 rounded bg-white/90 hover:bg-white border border-black/10 transition-all text-[10px] font-mono flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95"
                        style={{ color: card.inkColor }}
                      >
                        {copiedCardId === card.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">COPIED 💖</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 opacity-60" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Torn Jagged Paper Bottom Edge simulation */}
                    <div className="absolute -bottom-1 left-3 right-3 h-1.5 pointer-events-none flex justify-between opacity-35">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[5px]"
                          style={{ borderTopColor: card.borderColor }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Helper Tag when Stack is Closed */}
            {!isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none whitespace-nowrap"
              >
                <span className="font-handwritten text-base text-[#FEF08A] bg-black/60 px-3 py-1 rounded-full border border-white/10 shadow-lg">
                  ✨ Hover to spread the pile! 💌
                </span>
              </motion.div>
            )}
          </div>

          {/* Mobile Scroll View (Horizontal Snap on Small Phones) */}
          <div className="sm:hidden w-full flex flex-col gap-3">
            <div className="text-center font-handwritten text-sm text-[#FEF08A] mb-1">
              Swipe across Tanya's paper slips 💌
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 snap-x scrollbar-none">
              {UNEVEN_PAPER_CARDS.map((card) => {
                const Icon = card.icon;
                const isEmail = card.id === 'email';
                return (
                  <div
                    key={card.id}
                    className="min-w-[270px] p-5 border flex flex-col justify-between snap-center shadow-lg relative overflow-hidden"
                    style={{
                      ...getPaperBackgroundStyle(card),
                      clipPath: card.clipPathStyle,
                      borderColor: card.borderColor
                    }}
                  >
                    {renderWashiTape(card.tapeStyle, card.tapePosition, card.tapeAngle)}
                    <div className="pt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-handwritten text-sm font-bold" style={{ color: card.accentColor }}>
                          {card.recipient}
                        </span>
                        <span className="text-sm">{card.emoji}</span>
                      </div>
                      <p className="font-handwritten text-lg leading-tight" style={{ color: card.inkColor }}>
                        "{card.handwrittenNote}"
                      </p>
                    </div>

                    <a
                      href={card.url}
                      target={isEmail ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="mt-4 p-2.5 rounded-xl bg-white/90 border border-black/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded flex items-center justify-center text-white text-xs"
                          style={{ backgroundColor: card.accentColor }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold" style={{ color: card.inkColor }}>
                            {card.name}
                          </div>
                          <div className="text-[10px] font-mono" style={{ color: card.accentColor }}>
                            {card.handle}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5" style={{ color: card.accentColor }} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOOTER META ROW */}
      <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/60">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
          <span className="text-white/80 font-medium">OPEN FOR 2025–2026 INTERNSHIPS ✨</span>
        </div>

        <div className="flex items-center gap-4">
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              data-cursor="VIEW"
              className="hover:text-[#FEF08A] transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
            >
              <span>CURRICULUM VITAE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FEF08A]" />
            </button>
          )}
          <span className="text-white/20">•</span>
          <span className="text-[10px] text-white/40">© {new Date().getFullYear()} TANYASHRI M.</span>
        </div>
      </div>
    </footer>
  );
};
