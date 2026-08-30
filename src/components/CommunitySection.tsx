import React from 'react';
import { Heart, Megaphone, Sparkles } from 'lucide-react';
import { COMMUNITY_IMPACT } from '../data/portfolioData';
import { AnimatedDecoderText } from './AnimatedDecoderText';

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#FF85A2] mb-3 uppercase tracking-[0.2em]">
            <span>// 06 COMMUNITY & SOCIAL IMPACT</span>
            <span>—</span>
            <AnimatedDecoderText text="GRASSROOTS & MENTORSHIP OUTREACH" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FDFCFB]">
            Beyond the screen: <span className="text-stroke-pink font-bold">mentoring & grassroots</span> outreach.
          </h2>
        </div>
        <div className="font-mono text-xs text-white/60 max-w-sm leading-relaxed">
          Technology creates leverage, but empathy and education create lasting change. Active community engagement across academia and non-profits.
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {COMMUNITY_IMPACT.map((item, idx) => {
          const isNGO = item.organization.includes('NGO');
          const washiClass = isNGO ? 'washi-tape-pink' : 'washi-tape-mint';
          const accentColor = isNGO ? '#FF85A2' : '#5EEAD4';

          return (
            <div
              key={item.organization}
              className="relative p-6 sm:p-8 bg-white/[0.02] hover:bg-white/[0.035] border border-white/10 hover:border-white/20 rounded-3xl transition-all duration-200 flex flex-col justify-between shadow-md"
            >
              <div className={`w-24 h-4 ${washiClass} rounded-sm absolute -top-2 left-10 opacity-90 -rotate-1 shadow-xs`} />
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 pt-1">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">{item.organization}</h3>
                    <div className="text-xs font-mono mt-0.5 uppercase tracking-wider font-bold" style={{ color: accentColor }}>
                      {item.role}
                    </div>
                  </div>
                  <span className="p-2.5 rounded-2xl bg-white/5 border border-white/10" style={{ color: accentColor }}>
                    {isNGO ? <Heart className="w-4 h-4" /> : <Megaphone className="w-4 h-4" />}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-2">Focus: {item.focus}</div>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-sans">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 text-xs" style={{ color: accentColor }}>◆</span>
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                <span>Verified Organization Initiative 🌸</span>
                <span className="font-semibold uppercase" style={{ color: accentColor }}>Impact Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
