import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowUpRight, Sparkles, Check, Copy } from 'lucide-react';
import { AnimatedDecoderText } from './AnimatedDecoderText';

export const AboutEditorial: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('tanyashrim2005@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Section Header Tag */}
      <div className="flex items-center gap-2 font-mono text-xs text-[#FF85A2] mb-8 uppercase tracking-[0.2em]">
        <span>// 01 ABOUT & SCRAPBOOK</span>
        <span>—</span>
        <AnimatedDecoderText text="TANYA'S PINBOARD & DOSSIER" />
      </div>

      {/* ========================================================
          INTERACTIVE ENVELOPE / SECRET LETTER DRAWER
      ======================================================== */}
      <div className="mb-10">
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
          className="relative cursor-pointer select-none rounded-2xl border-2 border-[#221c15] bg-[#FBF3E7] p-5 sm:p-6 text-[#221c15] shadow-[6px_6px_0px_0px_#221c15] transition-all hover:shadow-[8px_8px_0px_0px_#221c15] overflow-hidden"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          {/* Subtle Washi Tape in corner */}
          <div className="absolute -top-2 left-8 w-24 h-6 bg-[#c9a66b]/70 rotate-[-4deg] border border-[#a9895a]/40 pointer-events-none shadow-sm" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#C8102E] text-white flex items-center justify-center font-bold text-base shadow-md shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-['Bricolage_Grotesque',sans-serif] font-bold text-lg text-[#8f0b21]">
                    You've got mail!
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#C8102E]/10 text-[#C8102E] border border-[#C8102E]/20 font-mono">
                    {isEnvelopeOpen ? 'Open' : 'Tap to Open'}
                  </span>
                </div>
                <p className="text-xs text-[#6b6154] mt-0.5 font-['Caveat',cursive] text-base">
                  (open before it throws an exception)
                </p>
              </div>
            </div>

            <button
              type="button"
              className="text-xs font-bold font-mono px-4 py-2 rounded-xl bg-[#221c15] text-[#FBF3E7] hover:bg-[#C8102E] transition-colors self-end sm:self-center shrink-0 cursor-pointer"
            >
              {isEnvelopeOpen ? 'Fold Letter ↑' : 'Open Envelope ✉'}
            </button>
          </div>

          {/* Letter Dropdown */}
          <AnimatePresence>
            {isEnvelopeOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="p-5 sm:p-6 rounded-xl bg-[#fffdf8] border border-[#e6d8b8] shadow-inner text-sm leading-relaxed text-[#52493d] relative">
                  {/* Postage stamp style in corner */}
                  <div className="hidden sm:block absolute top-4 right-4 text-center border-2 border-dashed border-[#2f6f4e] bg-white p-2 rounded rotate-6 text-[10px] text-[#2f6f4e] font-mono leading-tight shadow-sm pointer-events-none">
                    git<br />push<br />--force
                  </div>

                  <p className="font-['Caveat',cursive] text-2xl font-bold text-[#8f0b21] mb-2">
                    hii, it's tanya —
                  </p>
                  <p className="mb-2">
                    currently buried in code, coffee, and one (1) hackathon I'm hosting.
                  </p>
                  <p className="mb-2">
                    if you're reading this you found my about page before I finished debugging it, which honestly tracks.
                  </p>
                  <p className="font-medium text-[#221c15]">
                    come on in, I promise the resume version of me is more organized than this envelope! ✦
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ========================================================
          MAIN PINBOARD FOLDER (HERO ABOUT CARD)
      ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#F1E4D0] border-2 border-[#221c15] rounded-2xl p-6 sm:p-9 shadow-[8px_8px_0px_0px_rgba(34,28,21,0.9)] text-[#221c15] mb-10"
      >
        {/* Top Pin Tack */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#ff8a9a] to-[#8f0b21] shadow-[0_3px_5px_rgba(0,0,0,0.35)] border border-white/40 z-10" />

        {/* Tab Tag */}
        <div className="absolute -top-3.5 left-6 sm:left-8 bg-[#C8102E] text-white text-[11px] font-mono font-bold tracking-widest px-3 py-1 rounded-md shadow-sm">
          TM // README
        </div>

        {/* Headline */}
        <h2 className="font-['Bricolage_Grotesque',sans-serif] font-black text-3xl sm:text-5xl md:text-6xl text-[#221c15] tracking-tight flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
          <span>heyy, i'm</span>
          <em className="not-italic font-['Caveat',cursive] text-[#C8102E] text-[1.15em] font-bold">
            Tanya
          </em>
          {/* Terminal Blinking Cursor */}
          <span className="inline-block w-1.5 h-[0.8em] bg-[#2f6f4e] align-middle animate-pulse" />
          {/* Cute Heart Doodle */}
          <span className="inline-flex items-center ml-1 animate-bounce" style={{ animationDuration: '2.5s' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" className="overflow-visible">
              <path
                d="M12 20.5s-7-4.4-9.3-8.8C1 8.6 2.4 5.4 5.6 4.7c2-.4 3.8.7 4.9 2.6.4-2.1 2.5-3.4 4.7-3 3.2.6 4.7 3.8 3.1 6.9C16 14.7 12 20.5 12 20.5z"
                fill="#C8102E"
                stroke="#8f0b21"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </h2>

        {/* Narrative Paragraph */}
        <p className="mt-4 font-mono text-xs sm:text-sm md:text-[14.5px] leading-relaxed text-[#3a3227] max-w-3xl">
          a Computer Science Engineering student who accidentally became fluent in three programming languages
          while just trying to fix one bug. I build things with graphs, models, and slightly too many terminal tabs open —
          currently obsessed with making messy data behave and messier hackathons run on time.
        </p>

        {/* Badges / Pill Tags */}
        <div className="flex flex-wrap gap-2.5 mt-6 font-mono text-xs">
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#221c15] border-[1.5px] border-[#221c15] shadow-[2px_2px_0px_0px_#221c15] font-semibold hover:-translate-y-0.5 transition-transform">
            ⚡ backend tinkerer
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#221c15] border-[1.5px] border-[#221c15] shadow-[2px_2px_0px_0px_#221c15] font-semibold hover:-translate-y-0.5 transition-transform">
            🧠 ml enthusiast
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#221c15] border-[1.5px] border-[#221c15] shadow-[2px_2px_0px_0px_#221c15] font-semibold hover:-translate-y-0.5 transition-transform">
            🐛 professional bug whisperer
          </span>
        </div>
      </motion.div>

      {/* ========================================================
          THREE-UP PINBOARD GRID (ID CARD + EDUCATION + RECEIPTS)
      ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch relative">
        {/* Pinned Doodle Background Elements */}
        <div className="hidden lg:block absolute -top-6 left-1/3 text-lg text-[#a9895a] font-mono select-none pointer-events-none opacity-60">
          ✦
        </div>
        <div className="hidden lg:block absolute -bottom-5 right-1/4 text-xl text-[#C8102E] font-mono select-none pointer-events-none opacity-60">
          ♡
        </div>

        {/* ---------------- CARD A: ID CARD ---------------- */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white border-2 border-[#221c15] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#221c15] text-[#221c15] flex flex-col justify-between md:-rotate-1"
        >
          {/* Top Pin Tack */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[#ff8a9a] to-[#8f0b21] shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-10" />

          {/* Sticker */}
          <div className="absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-white border-2 border-[#221c15] flex items-center justify-center text-lg shadow-[0_3px_6px_rgba(0,0,0,0.2)] rotate-[-8deg]">
            💻
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
              ID CARD
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-dashed border-[#e5e5e5]">
                <span className="text-[#6b6154]">Name</span>
                <b className="text-[#221c15] font-bold">Tanyashri M</b>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-dashed border-[#e5e5e5]">
                <span className="text-[#6b6154]">Based in</span>
                <b className="text-[#221c15] font-bold">Karnataka, India</b>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-dashed border-[#e5e5e5]">
                <span className="text-[#6b6154]">Studying</span>
                <b className="text-[#221c15] font-bold">B.E. Computer Science</b>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-dashed border-[#e5e5e5]">
                <span className="text-[#6b6154]">Graduating</span>
                <b className="text-[#221c15] font-bold">2027 (allegedly)</b>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-dashed border-[#e5e5e5]">
                <span className="text-[#6b6154]">Email</span>
                <b className="text-[#221c15] font-bold truncate max-w-[150px] text-[11px]" title="tanyashrim2005@gmail.com">
                  tanyashrim2005@gmail.com
                </b>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-[#6b6154]">Phone</span>
                <b className="text-[#221c15] font-bold">+91 95388 39831</b>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="mt-5 w-full py-2 px-3 rounded-xl bg-[#fffaf0] border border-[#c9a66b] font-mono text-[11px] font-bold text-[#8f0b21] hover:bg-[#8f0b21] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" /> Copied Email!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Email Address
              </>
            )}
          </button>
        </motion.div>

        {/* ---------------- CARD B: EDUCATION TICKETS ---------------- */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white border-2 border-[#221c15] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#221c15] text-[#221c15] flex flex-col justify-between md:rotate-1"
        >
          {/* Top Pin Tack */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[#ff8a9a] to-[#8f0b21] shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-10" />

          {/* Sticker */}
          <div className="absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-white border-2 border-[#221c15] flex items-center justify-center text-lg shadow-[0_3px_6px_rgba(0,0,0,0.2)] rotate-[8deg]">
            🎓
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
              EDUCATION TICKETS
            </h3>

            <div className="space-y-3">
              {/* Ticket 1 */}
              <div className="flex gap-3 pb-3 border-b-2 border-dotted border-[#c9a66b]">
                <div className="font-['Bricolage_Grotesque',sans-serif] font-black text-xs text-white bg-[#a9895a] rounded-md px-2 py-1.5 min-w-[42px] text-center h-fit shrink-0">
                  '27
                </div>
                <div className="font-mono">
                  <b className="block text-xs font-bold text-[#221c15] leading-tight">
                    B.E. Computer Science
                  </b>
                  <span className="text-[11px] text-[#6b6154] block mt-0.5">
                    Maharaja Institute of Technology Mysore · GPA 8.5
                  </span>
                </div>
              </div>

              {/* Ticket 2 */}
              <div className="flex gap-3 pb-3 border-b-2 border-dotted border-[#c9a66b]">
                <div className="font-['Bricolage_Grotesque',sans-serif] font-black text-xs text-white bg-[#a9895a] rounded-md px-2 py-1.5 min-w-[42px] text-center h-fit shrink-0">
                  '23
                </div>
                <div className="font-mono">
                  <b className="block text-xs font-bold text-[#221c15] leading-tight">
                    Pre-University (PCMC)
                  </b>
                  <span className="text-[11px] text-[#6b6154] block mt-0.5">
                    Sri Jayachamarajendra PU College · 85%
                  </span>
                </div>
              </div>

              {/* Ticket 3 */}
              <div className="flex gap-3">
                <div className="font-['Bricolage_Grotesque',sans-serif] font-black text-xs text-white bg-[#a9895a] rounded-md px-2 py-1.5 min-w-[42px] text-center h-fit shrink-0">
                  '21
                </div>
                <div className="font-mono">
                  <b className="block text-xs font-bold text-[#221c15] leading-tight">
                    10th, CBSE
                  </b>
                  <span className="text-[11px] text-[#6b6154] block mt-0.5">
                    D.A.V Public School · 92%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-[#e5e5e5] text-center">
            <span className="font-['Caveat',cursive] text-sm text-[#8f0b21] font-bold">
              Engineering with curiosity & first-principles ✦
            </span>
          </div>
        </motion.div>

        {/* ---------------- CARD C: RECEIPTS ---------------- */}
        <motion.div
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white border-2 border-[#221c15] rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_0px_#221c15] text-[#221c15] flex flex-col justify-between md:-rotate-1"
        >
          {/* Top Pin Tack */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-[#ff8a9a] to-[#8f0b21] shadow-[0_2px_4px_rgba(0,0,0,0.3)] z-10" />

          {/* Sticker */}
          <div className="absolute -top-3.5 -right-3 w-9 h-9 rounded-full bg-white border-2 border-[#221c15] flex items-center justify-center text-lg shadow-[0_3px_6px_rgba(0,0,0,0.2)] rotate-[-6deg]">
            🏅
          </div>

          <div>
            <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-[#C8102E] uppercase mb-4">
              RECEIPTS
            </h3>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="border-2 border-dashed border-[#c9a66b] rounded-lg p-2.5 bg-[#fffaf0] -rotate-1 hover:rotate-0 transition-transform">
                <b className="block text-[11px] text-[#8f0b21] font-bold mb-0.5">
                  Python (Basic → Advanced)
                </b>
                <span className="text-[10px] text-[#6b6154]">Udemy Certification</span>
              </div>

              <div className="border-2 border-dashed border-[#c9a66b] rounded-lg p-2.5 bg-[#fffaf0] rotate-1 hover:rotate-0 transition-transform">
                <b className="block text-[11px] text-[#8f0b21] font-bold mb-0.5">
                  Machine Learning Specialization
                </b>
                <span className="text-[10px] text-[#6b6154]">Univ. of Washington, Coursera</span>
              </div>

              <div className="border-2 border-dashed border-[#c9a66b] rounded-lg p-2.5 bg-[#fffaf0] -rotate-1 hover:rotate-0 transition-transform">
                <b className="block text-[11px] text-[#8f0b21] font-bold mb-0.5">
                  District-Level Basketball
                </b>
                <span className="text-[10px] text-[#6b6154]">apparently I sprint too</span>
              </div>

              <div className="border-2 border-dashed border-[#c9a66b] rounded-lg p-2.5 bg-[#fffaf0] rotate-1 hover:rotate-0 transition-transform">
                <b className="block text-[11px] text-[#8f0b21] font-bold mb-0.5">
                  State-Level Spell Bee
                </b>
                <span className="text-[10px] text-[#6b6154]">c-o-m-m-i-t</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-[#e5e5e5] text-center">
            <span className="font-['Caveat',cursive] text-base text-[#8f0b21] font-bold">
              verified receipts & milestones
            </span>
          </div>
        </motion.div>
      </div>

      {/* Mini Scrapbook Footer Badge */}
      <div className="mt-12 text-center">
        <p className="font-['Caveat',cursive] text-2xl font-bold text-[#FF85A2] flex items-center justify-center gap-2">
          <span>say hi</span>
          <svg width="20" height="20" viewBox="0 0 24 24" className="inline-block">
            <path
              d="M12 20.5s-7-4.4-9.3-8.8C1 8.6 2.4 5.4 5.6 4.7c2-.4 3.8.7 4.9 2.6.4-2.1 2.5-3.4 4.7-3 3.2.6 4.7 3.8 3.1 6.9C16 14.7 12 20.5 12 20.5z"
              fill="#FF85A2"
              stroke="#FF85A2"
              strokeWidth="1"
            />
          </svg>
        </p>
        <p className="font-mono text-xs text-white/60 mt-1">
          <a href="mailto:tanyashrim2005@gmail.com" className="hover:text-[#5EEAD4] transition-colors underline decoration-dotted">
            tanyashrim2005@gmail.com
          </a>
          {' · '}
          <a href="https://linkedin.com/in/tanyashri-m" target="_blank" rel="noreferrer" className="hover:text-[#5EEAD4] transition-colors">
            LinkedIn
          </a>
          {' · '}
          <a href="https://github.com/tanyashri" target="_blank" rel="noreferrer" className="hover:text-[#5EEAD4] transition-colors">
            GitHub
          </a>
          {' · '}
          <a href="https://leetcode.com/tanyashri" target="_blank" rel="noreferrer" className="hover:text-[#5EEAD4] transition-colors">
            LeetCode
          </a>
        </p>
      </div>
    </section>
  );
};
