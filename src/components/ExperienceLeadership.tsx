import React from 'react';
import { Terminal, Users, Award, GitPullRequest, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { AnimatedDecoderText } from './AnimatedDecoderText';

export const ExperienceLeadership: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#FF85A2] mb-3 uppercase tracking-[0.2em]">
            <span>// 04 EXPERIENCE & LEADERSHIP</span>
            <span>—</span>
            <AnimatedDecoderText text="COMMUNITY LEADERSHIP & IMPACT" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FDFCFB]">
            Leading developers & <span className="text-stroke-pink font-bold">scaling communities.</span>
          </h2>
        </div>
        <div className="font-mono text-xs text-white/60 max-w-sm leading-relaxed">
          Building technical culture through open-source mentorship, student leadership, and high-impact hackathon coordination.
        </div>
      </div>

      {/* Main Experience Cards */}
      <div className="mt-12 space-y-8">
        {EXPERIENCE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="relative p-6 sm:p-10 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-[#FF85A2]/30 rounded-3xl transition-all duration-200 shadow-md"
          >
            {/* Washi Tape Trim */}
            <div className="w-28 h-4 washi-tape-pink rounded-sm absolute -top-2 left-10 opacity-90 -rotate-1 shadow-sm" />

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 pt-2">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-black font-display text-[#FDFCFB]">
                    {item.role}
                  </h3>
                  <span className="text-white/30 font-mono">//</span>
                  <span className="text-[#FF85A2] font-mono text-sm sm:text-base font-bold">
                    {item.organization}
                  </span>
                </div>
                {item.badge && (
                  <p className="text-xs font-mono text-white/60 mt-1 uppercase tracking-wider">
                    {item.badge}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                  {item.period}
                </span>
                <span className="px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-[#5EEAD4]/15 text-[#5EEAD4] border border-[#5EEAD4]/30 uppercase flex items-center gap-1">
                  <span>ACTIVE LEAD ✨</span>
                </span>
              </div>
            </div>

            {/* Impact Metric Strip */}
            {item.metrics && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {item.metrics.map((m, idx) => {
                  const mColors = ['#FF85A2', '#5EEAD4', '#FEF08A', '#C084FC'];
                  const col = mColors[idx % mColors.length];
                  return (
                    <div key={idx} className="p-3.5 bg-white/[0.03] rounded-2xl border border-white/10">
                      <span className="text-[10px] text-white/50 block uppercase tracking-wider">{m.label}</span>
                      <span className="text-xl font-black font-display mt-1 block" style={{ color: col }}>
                        {m.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Detailed Highlights */}
            <div className="mt-6 space-y-3">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                CORE RESPONSIBILITIES & IMPACT:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-[#FF85A2]/[0.04] hover:bg-[#FF85A2]/[0.08] rounded-2xl border border-[#FF85A2]/20 transition-colors">
                  <div className="text-xs font-mono text-[#FF85A2] font-bold mb-1.5 flex items-center gap-1.5">
                    <GitPullRequest className="w-3.5 h-3.5" /> 01 / OPEN SOURCE 🌸
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Led teams contributing to open-source codebases with PR workflows, peer code reviews, and documentation standards.
                  </p>
                </div>

                <div className="p-4 bg-[#5EEAD4]/[0.04] hover:bg-[#5EEAD4]/[0.08] rounded-2xl border border-[#5EEAD4]/20 transition-colors">
                  <div className="text-xs font-mono text-[#5EEAD4] font-bold mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> 02 / MENTORSHIP 🌿
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Mentored 200+ students across workshops on Git, backend engineering, APIs, and open-source practices.
                  </p>
                </div>

                <div className="p-4 bg-[#FEF08A]/[0.04] hover:bg-[#FEF08A]/[0.08] rounded-2xl border border-[#FEF08A]/20 transition-colors">
                  <div className="text-xs font-mono text-[#FEF08A] font-bold mb-1.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> 03 / HACKVERSE ⚡
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Coordinated 300+ attendee hackathon managing technical tracks, sponsors, logistics, and live judging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
