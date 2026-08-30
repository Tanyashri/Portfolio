/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutEditorial } from './components/AboutEditorial';
import { SelectedWork } from './components/SelectedWork';
import { TechnicalEcosystem } from './components/TechnicalEcosystem';
import { ExperienceLeadership } from './components/ExperienceLeadership';
import { OpenSourceSection } from './components/OpenSourceSection';
import { CommunitySection } from './components/CommunitySection';
import { AchievementsGrid } from './components/AchievementsGrid';
import { OutsideTerminal } from './components/OutsideTerminal';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CuteJournalBackground } from './components/CuteJournalBackground';
import { CustomCursor } from './components/CustomCursor';
import { IntroAnimation } from './components/IntroAnimation';
import { SectionReveal } from './components/SectionReveal';
import { Project } from './types';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0C10] text-[#FDFCFB] flex flex-col font-sans selection:bg-[#FF85A2] selection:text-black antialiased relative">
      {/* Premium Cinematic Identity Reveal Intro */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Desktop Precision Custom Cursor */}
      <CustomCursor />

      {/* Global Ambient Glow & Subtle Twinkle Background Layer */}
      <CuteJournalBackground />

      {/* Sticky Editorial Header */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Main Single Page Narrative Stream */}
      <main className="flex-1">
        {/* 00 Hero Section with Interactive System Canvas */}
        <SectionReveal yOffset={20}>
          <Hero 
            onOpenResume={() => setIsResumeOpen(true)} 
          />
        </SectionReveal>

        {/* 01 About & Philosophy */}
        <SectionReveal>
          <AboutEditorial />
        </SectionReveal>

        {/* 02 Selected Work with Embedded Simulators */}
        <SectionReveal>
          <SelectedWork onSelectProject={(project) => setSelectedProject(project)} />
        </SectionReveal>

        {/* 03 Evidence-Based Technical Ecosystem */}
        <SectionReveal>
          <TechnicalEcosystem onSelectProject={(project) => setSelectedProject(project)} />
        </SectionReveal>

        {/* 04 Experience & Leadership (Stack Forge Club & HackVerse) */}
        <SectionReveal>
          <ExperienceLeadership />
        </SectionReveal>

        {/* 05 Open Source Programs (GSSoC, SWoC, Hacktoberfest) */}
        <SectionReveal>
          <OpenSourceSection />
        </SectionReveal>

        {/* 06 Community & Social Impact (Viral Fission & U&I NGO) */}
        <SectionReveal>
          <CommunitySection />
        </SectionReveal>

        {/* 07 Quantitative Milestones & Achievements */}
        <SectionReveal>
          <AchievementsGrid />
        </SectionReveal>

        {/* 08 Dimensions Outside the Terminal (Basketball & Spell Bee) */}
        <SectionReveal>
          <OutsideTerminal />
        </SectionReveal>

        {/* 09 Contact & Collaboration */}
        <SectionReveal>
          <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
        </SectionReveal>
      </main>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
