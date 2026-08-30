import React, { useState } from 'react';
import { ArrowUpRight, Activity, Network, Layers, Sparkles, Terminal } from 'lucide-react';
import { SKILL_CATEGORIES, PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { TechLogo } from './TechLogos';
import { StackGraphTracker } from './StackGraphTracker';
import { AnimatedDecoderText } from './AnimatedDecoderText';

interface TechnicalEcosystemProps {
  onSelectProject: (project: Project) => void;
}

export const TechnicalEcosystem: React.FC<TechnicalEcosystemProps> = ({ onSelectProject }) => {
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    relatedProjects: string[];
    highlightReason?: string;
  } | null>({
    name: 'Neo4j',
    relatedProjects: ['graphdb'],
    highlightReason: 'Native graph property database, Cypher pattern queries & deep traversals'
  });

  const [activeViewMode, setActiveViewMode] = useState<'GRAPH' | 'MATRIX'>('GRAPH');

  const activeSkill = hoveredSkill;

  const handleSelectSkillByName = (name: string) => {
    for (const cat of SKILL_CATEGORIES) {
      const found = cat.skills.find((s) => s.name.toLowerCase() === name.toLowerCase());
      if (found) {
        setHoveredSkill(found);
        return;
      }
    }
  };

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header with Animated Decoder Text */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#FEF08A] mb-3 uppercase tracking-[0.2em]">
            <span>// 03 TECHNICAL ECOSYSTEM</span>
            <span>—</span>
            <AnimatedDecoderText text="EVIDENCE-BASED TOPOLOGY & SKILLS" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FDFCFB]">
            Tools chosen for <span className="text-stroke-yellow font-bold">architectural purpose.</span>
          </h2>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl text-xs font-mono">
            <button
              onClick={() => setActiveViewMode('GRAPH')}
              data-cursor="VIEW"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeViewMode === 'GRAPH'
                  ? 'bg-[#FF85A2] text-black font-bold shadow-md shadow-[#FF85A2]/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>LIVE GRAPH ✨</span>
            </button>
            <button
              onClick={() => setActiveViewMode('MATRIX')}
              data-cursor="VIEW"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeViewMode === 'MATRIX'
                  ? 'bg-[#5EEAD4] text-black font-bold shadow-md shadow-[#5EEAD4]/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>GRID MATRIX</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="mt-8 space-y-8">
        {/* Interactive Live Graph Tracker View */}
        {activeViewMode === 'GRAPH' && (
          <StackGraphTracker
            activeSkillName={activeSkill?.name || 'Neo4j'}
            onSelectSkill={handleSelectSkillByName}
            onSelectProject={onSelectProject}
          />
        )}

        {/* Dual Layout: Categorized Skill Clusters with authentic Tech Logos + Live Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Interactive Skill Badges with Logos */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_CATEGORIES.map((cat, cIdx) => {
              const catColors = [
                { color: '#FF85A2', washi: 'washi-tape-pink' },
                { color: '#5EEAD4', washi: 'washi-tape-mint' },
                { color: '#FEF08A', washi: 'washi-tape-yellow' },
                { color: '#C084FC', washi: 'washi-tape-lavender' },
              ];
              const cTheme = catColors[cIdx % catColors.length];

              return (
                <div
                  key={cat.name}
                  className="relative p-5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                    <span
                      className="font-mono text-xs uppercase tracking-wider font-bold"
                      style={{ color: cTheme.color }}
                    >
                      {cat.name}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      {cat.skills.length} TECHNOLOGIES
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => {
                      const isSelected = activeSkill?.name.toLowerCase() === skill.name.toLowerCase();
                      return (
                        <button
                          key={skill.name}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onClick={() => setHoveredSkill(skill)}
                          data-cursor="INSPECT"
                          className={`group relative px-3 py-1.5 rounded-xl border font-mono text-xs transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-[#FF85A2] text-black border-[#FF85A2] font-bold shadow-md shadow-[#FF85A2]/25 scale-[1.03]'
                              : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border-white/10 hover:border-white/30'
                          }`}
                        >
                          <TechLogo name={skill.name} size={15} className="shrink-0" />
                          <span>{skill.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Telemetry Context & Project Tracer Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="relative p-6 bg-white/[0.02] border border-white/10 rounded-2xl shadow-md">
              <div className="w-16 h-3.5 washi-tape-lavender rounded-sm absolute -top-1.5 left-6 -rotate-1 opacity-90" />
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono pt-1">
                <span className="text-[#C084FC] uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>SKILL TELEMETRY TRACER 🔮</span>
                </span>
                <span className="text-white/40 text-[10px]">LIVE INSPECTION</span>
              </div>

              {activeSkill ? (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">SELECTED NODE</div>
                    <div className="flex items-center gap-2.5 mt-1.5">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <TechLogo name={activeSkill.name} size={22} />
                      </div>
                      <div className="text-2xl font-black font-display text-white">{activeSkill.name}</div>
                    </div>
                  </div>

                  {activeSkill.highlightReason && (
                    <div className="p-3.5 rounded-xl bg-[#FEF08A]/[0.06] border border-[#FEF08A]/20 text-xs text-white/80 font-sans leading-relaxed">
                      <span className="text-[#FEF08A] font-mono block text-[10px] font-bold uppercase mb-1">
                        PRACTICAL USAGE & ARCHITECTURE:
                      </span>
                      {activeSkill.highlightReason}
                    </div>
                  )}

                  <div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">
                      IMPLEMENTED IN REPOSITORIES ({activeSkill.relatedProjects.length})
                    </div>
                    <div className="space-y-2">
                      {activeSkill.relatedProjects.map((projId) => {
                        const matchedProject = PROJECTS.find((p) => p.id === projId);
                        if (!matchedProject) return null;
                        return (
                          <div
                            key={projId}
                            onClick={() => onSelectProject(matchedProject)}
                            data-cursor="EXPLORE"
                            className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF85A2]/40 cursor-pointer transition-all duration-200 flex items-center justify-between group"
                          >
                            <div>
                              <div className="font-bold text-white text-xs font-sans group-hover:text-[#FF85A2] transition-colors">
                                {matchedProject.title}
                              </div>
                              <div className="text-[10px] font-mono text-white/50">{matchedProject.subtitle}</div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#FF85A2] transition-colors" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs font-mono text-white/40">
                  Hover or tap any technology to trace its verified implementation footprint.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
