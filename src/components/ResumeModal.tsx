import React, { useEffect } from 'react';
import { X, FileText, ArrowUpRight, Mail, GraduationCap, Award, Briefcase, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE_ITEMS, OPEN_SOURCE_PROGRAMS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E0D13] border border-white/15 rounded-3xl shadow-2xl overflow-y-auto p-6 sm:p-10 font-sans text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Washi Tape Accent */}
          <div className="w-28 h-4 washi-tape-yellow rounded-sm absolute -top-2 left-10 opacity-90 -rotate-1 shadow-sm" />

          {/* Top Action Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-xl bg-white/5 text-[#FEF08A] border border-white/10">
                <FileText className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-bold font-display text-white uppercase tracking-tight">TANYASHRI M // CURRICULUM VITAE 📄</h2>
                <p className="text-xs font-mono text-white/50">Verified Resume Content • MIT Mysore CSE</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VIEW"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FEF08A] hover:bg-[#fae460] text-xs font-mono text-black font-black transition-all uppercase tracking-wider text-[11px] cursor-pointer shadow-sm"
              >
                <span>OPEN DRIVE RESUME</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Resume Content Body */}
          <div className="space-y-8 text-sm">
            {/* Header info */}
            <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-black font-display tracking-tight text-white">{PERSONAL_INFO.name}</h1>
                  <p className="text-sm font-mono text-[#FF85A2] mt-0.5 uppercase tracking-wider font-bold">{PERSONAL_INFO.shortTitle}</p>
                  <p className="text-xs text-white/60 mt-1 font-sans">Maharaja Institute of Technology, Mysore • GPA: 8.5 (Expected 2027)</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="px-3 py-1 bg-white/5 text-white/70 hover:text-white border border-white/10 rounded-lg uppercase text-[11px]">GitHub</a>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="px-3 py-1 bg-white/5 text-white/70 hover:text-white border border-white/10 rounded-lg uppercase text-[11px]">LinkedIn</a>
                  <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="px-3 py-1 bg-white/5 text-white/70 hover:text-white border border-white/10 rounded-lg uppercase text-[11px]">LeetCode</a>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#5EEAD4] uppercase tracking-wider mb-3 font-bold">
                <GraduationCap className="w-4 h-4 text-[#5EEAD4]" /> Education
              </div>
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <div className="font-bold text-white text-base">B.E. in Computer Science & Engineering</div>
                  <div className="text-xs text-white/60 mt-0.5 font-sans">{PERSONAL_INFO.education.institution}</div>
                </div>
                <div className="text-left sm:text-right font-mono text-xs">
                  <div className="text-[#5EEAD4] font-bold">GPA: {PERSONAL_INFO.education.gpa}</div>
                  <div className="text-white/50">Expected {PERSONAL_INFO.education.expectedYear}</div>
                </div>
              </div>
            </div>

            {/* Selected Technical Projects */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF85A2] uppercase tracking-wider mb-3 font-bold">
                <Code className="w-4 h-4 text-[#FF85A2]" /> Core Engineering Projects
              </div>
              <div className="space-y-4">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="p-5 bg-white/[0.02] rounded-2xl border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-white text-base">{proj.title} <span className="text-xs font-mono font-normal text-white/50">({proj.subtitle})</span></div>
                      <div className="text-[11px] font-mono text-[#FEF08A] uppercase font-bold">{proj.stack.slice(0, 3).join(' • ')}</div>
                    </div>
                    <p className="text-xs text-white/70 mt-2 leading-relaxed font-sans">{proj.summary}</p>
                    <div className="mt-3 text-xs text-white/60 space-y-1 font-sans">
                      {proj.architecture.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-[#5EEAD4] mt-0.5 text-xs">▪</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership & Experience */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#C084FC] uppercase tracking-wider mb-3 font-bold">
                <Briefcase className="w-4 h-4 text-[#C084FC]" /> Leadership & Community Impact
              </div>
              <div className="space-y-3">
                {EXPERIENCE_ITEMS.map((exp) => (
                  <div key={exp.id} className="p-5 bg-white/[0.02] rounded-2xl border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-white text-base">{exp.role} — <span className="text-[#FF85A2]">{exp.organization}</span></div>
                      <div className="text-xs font-mono text-white/50">{exp.period}</div>
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-xs text-white/70 font-sans">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#5EEAD4] mt-0.5">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Source */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FB923C] uppercase tracking-wider mb-3 font-bold">
                <Award className="w-4 h-4 text-[#FB923C]" /> Open-Source Programs & Certifications
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {OPEN_SOURCE_PROGRAMS.map((prog, i) => (
                  <div key={i} className="p-4 bg-white/[0.02] rounded-xl border border-white/10">
                    <div className="font-bold text-white text-xs">{prog.name}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{prog.fullName}</div>
                    <div className="mt-2 text-[10px] text-[#5EEAD4] font-mono uppercase font-bold">{prog.badge}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PERSONAL_INFO.certifications.map((cert, i) => (
                  <div key={i} className="p-4 bg-white/[0.02] rounded-xl border border-white/10">
                    <div className="font-bold text-white text-xs">{cert.title}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{cert.issuer}</div>
                    <div className="text-[9px] text-[#FEF08A] font-mono mt-1 uppercase font-bold">{cert.skills}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/50">
            <span>Generated directly from primary resume data ✨</span>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider transition-colors text-xs flex items-center gap-1.5"
              >
                <span>OPEN IN GOOGLE DRIVE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FEF08A]" />
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#FF85A2] hover:bg-[#ff7092] text-black font-bold uppercase tracking-wider transition-colors text-xs cursor-pointer shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
