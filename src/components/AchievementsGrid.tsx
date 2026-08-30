import React from 'react';
import { AnimatedDecoderText } from './AnimatedDecoderText';

export const AchievementsGrid: React.FC = () => {
  const achievements = [
    {
      metric: '200+',
      label: 'STUDENTS MENTORED 🌸',
      detail: 'Hands-on workshops on Git, backend engineering, and open-source collaboration at Stack Forge.',
      color: '#FF85A2',
      washi: 'washi-tape-pink'
    },
    {
      metric: '300+',
      label: 'HACKATHON PARTICIPANTS 🌟',
      detail: 'Coordinated HackVerse hackathon tracks, sponsors, logistics, and live judging criteria.',
      color: '#5EEAD4',
      washi: 'washi-tape-mint'
    },
    {
      metric: '3+',
      label: 'OPEN-SOURCE PROGRAMS 💌',
      detail: 'Merged pull requests across public production repositories in GSSoC, SWoC, and Hacktoberfest.',
      color: '#FEF08A',
      washi: 'washi-tape-yellow'
    },
    {
      metric: '8.5',
      label: 'CSE CGPA @ MIT MYSORE 🎓',
      detail: 'Strong academic foundation across algorithms, systems, OS, databases, and mathematics.',
      color: '#C084FC',
      washi: 'washi-tape-lavender'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header Tag */}
      <div className="flex items-center gap-2 font-mono text-xs text-[#FEF08A] mb-6 uppercase tracking-[0.2em]">
        <span>// 07 QUANTITATIVE IMPACT</span>
        <span>—</span>
        <AnimatedDecoderText text="VERIFIED MILESTONES & RECORDS" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className="relative p-6 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/20 rounded-2xl flex flex-col justify-between transition-all duration-200 shadow-md hover:-translate-y-1"
          >
            <div className={`w-14 h-3 ${item.washi} rounded-sm absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-90 shadow-xs`} />
            <div>
              <div className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-none pt-1" style={{ color: item.color }}>
                {item.metric}
              </div>
              <div className="text-[11px] font-mono font-bold mt-2.5 uppercase tracking-wider" style={{ color: item.color }}>
                {item.label}
              </div>
            </div>
            <p className="text-xs text-white/70 font-sans mt-4 leading-relaxed pt-3 border-t border-white/10">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
