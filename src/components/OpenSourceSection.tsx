import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { OPEN_SOURCE_PROGRAMS } from '../data/portfolioData';
import { AnimatedDecoderText } from './AnimatedDecoderText';
import { TechLogo } from './TechLogos';

export const OpenSourceSection: React.FC = () => {
  const cardThemes = [
    { color: '#5EEAD4', washi: 'washi-tape-mint', badgeBg: 'bg-[#5EEAD4]/15 text-[#5EEAD4] border-[#5EEAD4]/30' },
    { color: '#FEF08A', washi: 'washi-tape-yellow', badgeBg: 'bg-[#FEF08A]/15 text-[#FEF08A] border-[#FEF08A]/30' },
    { color: '#C084FC', washi: 'washi-tape-lavender', badgeBg: 'bg-[#C084FC]/15 text-[#C084FC] border-[#C084FC]/30' },
  ];

  return (
    <section id="opensource" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#5EEAD4] mb-3 uppercase tracking-[0.2em]">
            <span>// 05 OPEN SOURCE</span>
            <span>—</span>
            <AnimatedDecoderText text="MULTI-MAINTAINER REPOSITORIES" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FDFCFB]">
            Beyond my <span className="text-stroke-mint font-bold">own repositories.</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-white/60 max-w-sm leading-relaxed">
          Contributing to multi-maintainer ecosystems through structured pull requests, test verification, and collaborative SDLC standards.
        </div>
      </div>

      {/* 3 Open-Source Program Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {OPEN_SOURCE_PROGRAMS.map((prog, idx) => {
          const theme = cardThemes[idx % cardThemes.length];
          return (
            <div
              key={prog.name}
              className="relative p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-200 flex flex-col justify-between shadow-md"
            >
              <div className={`w-20 h-3.5 ${theme.washi} rounded-sm absolute -top-1.5 left-8 opacity-90 -rotate-1 shadow-xs`} />
              <div>
                {/* Header: Clean Flex Row with Safe Truncation and Badge */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10 pt-1">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <TechLogo name="Git" size={16} />
                      <h3 className="font-display font-black text-xl text-white tracking-tight truncate">
                        {prog.name}
                      </h3>
                    </div>
                    <div className="text-[11px] font-mono text-white/50 truncate mt-0.5">
                      {prog.fullName}
                    </div>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold ${theme.badgeBg} uppercase tracking-wide`}>
                    {prog.badge}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-white/70 leading-relaxed font-sans mt-4">
                  {prog.description}
                </p>
              </div>

              {/* Key Contributions */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: theme.color }}>
                  CONTRIBUTIONS 🌸
                </div>
                {prog.contributions.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-white/75">
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: theme.color }} />
                    <span className="font-sans leading-snug">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
