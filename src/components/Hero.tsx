import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Terminal, 
  MessageSquare, 
  Sparkles, 
  Check, 
  Copy
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroCanvas } from './HeroCanvas';
import { AnimatedDecoderText } from './AnimatedDecoderText';
import { TechLogo } from './TechLogos';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambient Canvas with Glowing Twinkles */}
      <HeroCanvas />

      {/* Main Container */}
      <div className="w-full flex flex-col justify-between flex-1 relative z-10">
        {/* Top Editorial Metadata Header Line */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-white/50 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
            <span className="text-[#FDFCFB] font-bold tracking-widest">STATUS: ONLINE ✨</span>
            <span className="text-white/20">//</span>
            <span className="text-[#FF85A2] font-semibold tracking-wider">OPEN TO INTERNSHIPS (2025–2026)</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] tracking-widest text-white/40 uppercase">
            <span className="text-[#FEF08A]/80 font-medium">MIT MYSORE CSE</span>
            <span className="text-white/20">•</span>
            <span className="text-white/70">GPA: 8.5</span>
            <span className="text-white/20">•</span>
            <span>EXP: 2027</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="hidden sm:inline">LOC: 12.2958° N, 76.6394° E 📍</span>
          </div>
        </div>

        {/* Main Editorial Hero Headline Block */}
        <div className="my-auto py-10 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 text-[11px] font-mono text-[#5EEAD4] tracking-[0.2em] uppercase rounded-lg shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <AnimatedDecoderText text="PORTFOLIO LAB // CORE SYSTEMS & ML INFRASTRUCTURE" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF85A2]/15 border border-[#FF85A2]/30 text-[#FF85A2] font-mono text-xs font-bold tracking-tight shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF85A2]" />
              <span>2026 CS GRADUATE</span>
            </div>
          </div>

          <div className="relative">
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.015,
                    delayChildren: 0.1
                  }
                }
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black font-display tracking-tighter text-[#FDFCFB] leading-[0.98] flex flex-wrap gap-x-[0.28em] gap-y-1"
            >
              {[
                { text: "I", highlight: false },
                { text: "BUILD", highlight: false },
                { text: "INTELLIGENT", highlight: false },
                { text: "SYSTEMS,", highlight: false },
                { text: "USEFUL", highlight: false },
                { text: "PRODUCTS,", highlight: false },
                { text: "AND", highlight: false },
                { text: "THINGS", highlight: false },
                { text: "THAT", highlight: false },
                { text: "STARTED", highlight: false },
                { text: "AS", highlight: false },
                { text: "A", highlight: false },
                { text: "QUESTIONABLE", highlight: true },
                { text: "IDEA.", highlight: true }
              ].map((word, wIdx) => (
                <span
                  key={wIdx}
                  className={`inline-flex whitespace-nowrap ${
                    word.highlight
                      ? 'text-stroke-pink hover:text-[#FF85A2] transition-colors duration-300'
                      : 'hover:text-[#5EEAD4] transition-colors duration-200'
                  }`}
                >
                  {word.text.split('').map((char, cIdx) => (
                    <motion.span
                      key={cIdx}
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          y: 18, 
                          filter: 'blur(4px)' 
                        },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          filter: 'blur(0px)',
                          transition: {
                            duration: 0.45,
                            ease: [0.215, 0.61, 0.355, 1]
                          }
                        }
                      }}
                      className="inline-block select-none"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Cute handwritten sticky note annotation */}
            <div className="hidden lg:block absolute -right-8 -bottom-8 rotate-3 p-3.5 w-48 rounded-xl bg-[#FEF08A] text-[#422006] shadow-xl border border-[#FDE047] font-handwritten text-sm leading-tight select-none z-20">
              <div className="w-8 h-2.5 washi-tape-pink rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-90 shadow-xs" />
              <p className="mt-1 font-bold">"Messy ideas turned into resilient systems!" 🌸✨</p>
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="text-base sm:text-xl text-white/80 leading-relaxed font-sans font-normal">
              Hi, I'm <strong className="text-white font-semibold">Tanyashri M.</strong> — exploring AI, machine learning, backend systems, and graph databases at the intersection of production reliability, creative curiosity, and real human impact.
            </p>
          </div>

          {/* Action CTAs & Direct Links */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              onClick={handleScrollToWork}
              data-cursor="EXPLORE"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF85A2] hover:bg-[#ff6b8f] text-black font-mono text-xs font-black transition-all shadow-lg shadow-[#FF85A2]/20 hover:shadow-[#FF85A2]/35 uppercase tracking-wider cursor-pointer rounded-xl hover:-translate-y-0.5"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                data-cursor="VIEW"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-semibold border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider cursor-pointer rounded-xl hover:-translate-y-0.5"
              >
                <span>VIEW VERIFIED CV</span>
                <ArrowUpRight className="w-4 h-4 text-[#5EEAD4]" />
              </button>
            )}

            <button
              onClick={copyEmail}
              data-cursor="COPY"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-semibold border border-white/10 hover:border-white/20 transition-all uppercase tracking-wider cursor-pointer rounded-xl hover:-translate-y-0.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#5EEAD4]" />
                  <span className="text-[#5EEAD4]">EMAIL COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white/70" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="p-3 bg-white/5 hover:bg-[#FF85A2]/20 text-white/70 hover:text-[#FF85A2] border border-white/10 hover:border-[#FF85A2]/40 rounded-xl transition-all cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="p-3 bg-white/5 hover:bg-[#5EEAD4]/20 text-white/70 hover:text-[#5EEAD4] border border-white/10 hover:border-[#5EEAD4]/40 rounded-xl transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="p-3 bg-white/5 hover:bg-[#FEF08A]/20 text-white/70 hover:text-[#FEF08A] border border-white/10 hover:border-[#FEF08A]/40 rounded-xl transition-all cursor-pointer"
                aria-label="LeetCode Profile"
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.discord}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN"
                className="p-3 bg-white/5 hover:bg-[#C084FC]/20 text-white/70 hover:text-[#C084FC] border border-white/10 hover:border-[#C084FC]/40 rounded-xl transition-all cursor-pointer"
                aria-label="Discord Server"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                data-cursor="CONTACT"
                className="p-3 bg-white/5 hover:bg-[#FB923C]/20 text-white/70 hover:text-[#FB923C] border border-white/10 hover:border-[#FB923C]/40 rounded-xl transition-all cursor-pointer"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Key Engineering Pillars Strip with Sticky Notes Aesthetics & Tech Logos */}
        <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          {/* 01 AI & ML (Pink Sticky Note Style) */}
          <div className="relative group p-4 bg-[#FF85A2]/[0.06] hover:bg-[#FF85A2]/[0.12] border border-[#FF85A2]/25 hover:border-[#FF85A2]/50 rounded-2xl transition-all duration-200 shadow-sm hover:-translate-y-0.5">
            <div className="w-8 h-2.5 washi-tape-pink rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-80" />
            <div className="flex items-center justify-between text-[#FF85A2] font-bold mb-1.5 mt-1">
              <span>01 // AI & ML</span>
              <div className="flex items-center gap-1">
                <TechLogo name="PyTorch" size={14} />
                <TechLogo name="Scikit-learn" size={14} />
              </div>
            </div>
            <div className="text-white/60 text-[11px] leading-snug">Drift detection & LLM pipelines 🌸</div>
          </div>

          {/* 02 GRAPH DBs (Mint Sticky Note Style) */}
          <div className="relative group p-4 bg-[#5EEAD4]/[0.06] hover:bg-[#5EEAD4]/[0.12] border border-[#5EEAD4]/25 hover:border-[#5EEAD4]/50 rounded-2xl transition-all duration-200 shadow-sm hover:-translate-y-0.5">
            <div className="w-8 h-2.5 washi-tape-mint rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-80" />
            <div className="flex items-center justify-between text-[#5EEAD4] font-bold mb-1.5 mt-1">
              <span>02 // GRAPH DBs</span>
              <TechLogo name="Neo4j" size={14} />
            </div>
            <div className="text-white/60 text-[11px] leading-snug">Neo4j, Cypher & network topology 🌿</div>
          </div>

          {/* 03 BACKEND (Yellow Sticky Note Style) */}
          <div className="relative group p-4 bg-[#FEF08A]/[0.06] hover:bg-[#FEF08A]/[0.12] border border-[#FEF08A]/25 hover:border-[#FEF08A]/50 rounded-2xl transition-all duration-200 shadow-sm hover:-translate-y-0.5">
            <div className="w-8 h-2.5 washi-tape-yellow rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-80" />
            <div className="flex items-center justify-between text-[#FEF08A] font-bold mb-1.5 mt-1">
              <span>03 // BACKEND</span>
              <div className="flex items-center gap-1">
                <TechLogo name="Python" size={14} />
                <TechLogo name="FastAPI" size={14} />
              </div>
            </div>
            <div className="text-white/60 text-[11px] leading-snug">FastAPI, Python & distributed APIs ⚡</div>
          </div>

          {/* 04 SYSTEMS (Lavender Sticky Note Style) */}
          <div className="relative group p-4 bg-[#C084FC]/[0.06] hover:bg-[#C084FC]/[0.12] border border-[#C084FC]/25 hover:border-[#C084FC]/50 rounded-2xl transition-all duration-200 shadow-sm hover:-translate-y-0.5">
            <div className="w-8 h-2.5 washi-tape-lavender rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-80" />
            <div className="flex items-center justify-between text-[#C084FC] font-bold mb-1.5 mt-1">
              <span>04 // SYSTEMS</span>
              <div className="flex items-center gap-1">
                <TechLogo name="TypeScript" size={14} />
                <TechLogo name="Docker" size={14} />
              </div>
            </div>
            <div className="text-white/60 text-[11px] leading-snug">Docker, TypeScript & Open Source 🔮</div>
          </div>
        </div>

        {/* Bottom Ticker Footer Line */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
            <span>CORE REPOSITORIES VERIFIED ON GITHUB 🌸</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#about" className="hover:text-[#FF85A2] transition-colors">PHILOSOPHY ↓</a>
            <a href="#work" className="hover:text-[#5EEAD4] transition-colors">PROJECTS ↓</a>
            <a href="#stack" className="hover:text-[#FEF08A] transition-colors">STACK ↓</a>
            <a href="#experience" className="hover:text-[#C084FC] transition-colors">EXPERIENCE ↓</a>
          </div>
        </div>
      </div>
    </section>
  );
};
