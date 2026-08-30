import React, { useEffect } from 'react';
import { X, Github, Cpu, Layers, CheckCircle2, AlertCircle, Sparkles, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { AuraSimulator } from './AuraSimulator';
import { GraphDBSimulator } from './GraphDBSimulator';
import { SkillHiveSimulator } from './SkillHiveSimulator';
import { AwaazSimulator } from './AwaazSimulator';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#0E0D13] border border-white/15 rounded-3xl shadow-2xl overflow-y-auto p-6 sm:p-10 font-sans text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Washi Tape Header */}
          <div className="w-28 h-4 washi-tape-pink rounded-sm absolute -top-2 left-10 opacity-90 -rotate-1 shadow-sm" />

          {/* Top bar */}
          <div className="flex items-start justify-between pb-6 mb-6 border-b border-white/10 pt-2">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#FF85A2] mb-1 uppercase tracking-[0.2em] font-bold">
                <span>PROJECT {project.number}</span>
                <span>//</span>
                <span>{project.category} 🌸</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm font-mono text-white/60 mt-0.5">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Simulator Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-white mb-2">
              <Terminal className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span className="uppercase tracking-wider">INTERACTIVE SYSTEM TELEMETRY & LIVE DEMO ✨</span>
            </div>
            {project.id === 'aura' && <AuraSimulator />}
            {project.id === 'graphdb' && <GraphDBSimulator />}
            {project.id === 'skillhive' && <SkillHiveSimulator />}
            {project.id === 'awaaz' && <AwaazSimulator />}
          </div>

          {/* Detailed Case Study Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* The Problem */}
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-xs font-mono text-[#FF85A2] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-3.5 h-3.5" /> 01 / THE PROBLEM
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {project.problem}
              </p>
            </div>

            {/* The Approach */}
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-xs font-mono text-[#5EEAD4] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Cpu className="w-3.5 h-3.5" /> 02 / THE APPROACH
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {project.approach}
              </p>
            </div>

            {/* Engineering Architecture */}
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 md:col-span-2">
              <div className="text-xs font-mono text-[#C084FC] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Layers className="w-3.5 h-3.5" /> 03 / ENGINEERING ARCHITECTURE
              </div>
              <p className="text-xs sm:text-sm text-white/70 mb-3 leading-relaxed font-sans">
                {project.architecture.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {project.architecture.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/80 bg-white/[0.03] p-3 rounded-xl border border-white/10 font-sans">
                    <span className="text-[#5EEAD4] font-mono font-bold">0{idx + 1}.</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interesting Technical Detail */}
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-xs font-mono text-[#FEF08A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> 04 / INTERESTING DETAIL
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {project.interestingDetail}
              </p>
            </div>

            {/* Result & Verified Metrics */}
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10">
              <div className="text-xs font-mono text-[#5EEAD4] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 05 / VERIFIED RESULT
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                {project.result}
              </p>
              {project.verifiedMetrics && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
                  {project.verifiedMetrics.map((m, i) => (
                    <div key={i} className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                      <span className="text-white/50">{m.label}: </span>
                      <span className="text-[#5EEAD4] font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack Pills & Actions */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">SYSTEM TECH STACK</div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-xl bg-white/5 text-white/80 font-mono text-xs border border-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="OPEN"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-semibold border border-white/10 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <Github className="w-4 h-4 text-[#5EEAD4]" /> GITHUB REPO
                </a>
              )}
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#FF85A2] hover:bg-[#ff7092] text-black font-mono text-xs font-black transition-colors uppercase tracking-wider cursor-pointer shadow-md"
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
