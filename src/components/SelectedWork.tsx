import React from 'react';
import { ArrowUpRight, Github, Cpu, Terminal, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { AuraSimulator } from './AuraSimulator';
import { GraphDBSimulator } from './GraphDBSimulator';
import { SkillHiveSimulator } from './SkillHiveSimulator';
import { AwaazSimulator } from './AwaazSimulator';
import { TechLogo } from './TechLogos';
import { AnimatedDecoderText } from './AnimatedDecoderText';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
}

const PROJECT_PASTEL_COLORS = [
  {
    themeColor: '#FF85A2', // Sakura pink
    washiClass: 'washi-tape-pink',
    bgBadge: 'bg-[#FF85A2]/15 text-[#FF85A2] border-[#FF85A2]/30',
    btnBg: 'bg-[#FF85A2] hover:bg-[#ff6b8f] text-black shadow-[#FF85A2]/20',
  },
  {
    themeColor: '#5EEAD4', // Matcha mint
    washiClass: 'washi-tape-mint',
    bgBadge: 'bg-[#5EEAD4]/15 text-[#5EEAD4] border-[#5EEAD4]/30',
    btnBg: 'bg-[#5EEAD4] hover:bg-[#45d4be] text-black shadow-[#5EEAD4]/20',
  },
  {
    themeColor: '#FEF08A', // Honey yellow
    washiClass: 'washi-tape-yellow',
    bgBadge: 'bg-[#FEF08A]/15 text-[#FEF08A] border-[#FEF08A]/30',
    btnBg: 'bg-[#FEF08A] hover:bg-[#fde047] text-black shadow-[#FEF08A]/20',
  },
  {
    themeColor: '#C084FC', // Lavender
    washiClass: 'washi-tape-lavender',
    bgBadge: 'bg-[#C084FC]/15 text-[#C084FC] border-[#C084FC]/30',
    btnBg: 'bg-[#C084FC] hover:bg-[#b06cf5] text-black shadow-[#C084FC]/20',
  }
];

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject }) => {
  return (
    <section id="work" className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#5EEAD4] mb-3 uppercase tracking-[0.2em]">
            <span>// 02 SELECTED WORK</span>
            <span>—</span>
            <AnimatedDecoderText text="SYSTEMS & PRODUCTION PROTOTYPES" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FDFCFB]">
            Architected for <span className="text-stroke-mint font-bold">scale, precision</span> & resilience.
          </h2>
        </div>
        <div className="font-mono text-xs text-white/60 max-w-xs leading-relaxed">
          Interactive case studies exploring ML monitoring, graph traversal engines, recommendation data pipelines, and privacy cryptography.
        </div>
      </div>

      {/* Editorial Large Project Showcase */}
      <div className="mt-16 space-y-20">
        {PROJECTS.map((project, idx) => {
          const pastel = PROJECT_PASTEL_COLORS[idx % PROJECT_PASTEL_COLORS.length];
          return (
            <article
              key={project.id}
              className="group relative p-6 sm:p-10 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-3xl overflow-hidden transition-all duration-300 shadow-lg"
              style={{
                borderColor: undefined
              }}
            >
              {/* Decorative Washi Tape Strip on Top Edge */}
              <div className={`w-24 sm:w-32 h-4 ${pastel.washiClass} rounded-sm absolute -top-1 left-12 sm:left-16 shadow-md opacity-90 -rotate-1`} />

              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10 font-mono text-xs pt-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl font-black tracking-tight"
                    style={{ color: pastel.themeColor }}
                  >
                    {project.number}
                  </span>
                  <span className="text-white/20">//</span>
                  <span className="text-white font-semibold tracking-wider uppercase">{project.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white/5 group-hover:bg-white/10 text-white/80 group-hover:text-white text-[11px] border border-white/10 font-mono transition-colors flex items-center gap-1.5 rounded-lg"
                    >
                      <TechLogo name={tag} size={12} className="shrink-0 opacity-80" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid content: Story & Live Interactive Visualizer */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Narrative & Architecture */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-display text-[#FDFCFB] tracking-tight group-hover:translate-x-1 transition-transform duration-200">
                      {project.title}
                    </h3>
                    <p
                      className="text-xs font-mono mt-1 uppercase tracking-wider font-bold"
                      style={{ color: pastel.themeColor }}
                    >
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed font-sans">
                    {project.summary}
                  </p>

                  {/* Architecture Highlight Box */}
                  <div className="p-4 bg-white/[0.03] group-hover:bg-white/[0.05] rounded-2xl border border-white/10 transition-colors text-xs">
                    <div
                      className="font-mono text-[11px] font-bold uppercase mb-2 flex items-center gap-1.5"
                      style={{ color: pastel.themeColor }}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{project.architecture.title}</span>
                    </div>
                    <p className="text-white/70 mb-3 leading-relaxed text-xs font-sans">
                      {project.architecture.description}
                    </p>
                    <ul className="space-y-1.5 text-xs text-white/80">
                      {project.architecture.points.slice(0, 3).map((pt, pidx) => (
                        <li key={pidx} className="flex items-start gap-1.5">
                          <span style={{ color: pastel.themeColor }} className="mt-0.5 font-bold">▪</span>
                          <span className="leading-snug">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Metrics Strip */}
                  {project.verifiedMetrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs pt-1">
                      {project.verifiedMetrics.map((metric, midx) => (
                        <div key={midx} className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-white/50 block uppercase tracking-wider">{metric.label}</span>
                          <span className="text-white font-bold text-xs mt-0.5 block">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      data-cursor="EXPLORE"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 ${pastel.btnBg} font-mono text-xs font-black transition-all shadow-md hover:scale-[1.02] uppercase cursor-pointer rounded-xl`}
                    >
                      <span>INSPECT CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="OPEN"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 hover:border-white/25 transition-all cursor-pointer rounded-xl"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GITHUB</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: Embedded Interactive System Simulator */}
                <div className="lg:col-span-7">
                  <div className="mb-2.5 flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3" style={{ color: pastel.themeColor }} />
                      <span className="font-bold" style={{ color: pastel.themeColor }}>LIVE SIMULATION ✨</span>
                    </span>
                    <span className="text-[10px] text-white/40 uppercase">Interactive Prototype</span>
                  </div>
                  <div className="transition-transform duration-300 group-hover:scale-[1.005]">
                    {project.id === 'aura' && <AuraSimulator />}
                    {project.id === 'graphdb' && <GraphDBSimulator />}
                    {project.id === 'skillhive' && <SkillHiveSimulator />}
                    {project.id === 'awaaz' && <AwaazSimulator />}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
