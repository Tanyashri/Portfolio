import React, { useState, useMemo } from 'react';
import { Trophy, Sparkles, Pin, Plus, Smile, LayoutGrid, Layers, Filter, Shuffle, Award, Flame } from 'lucide-react';
import { AnimatedDecoderText } from './AnimatedDecoderText';

interface StickyNote {
  id: string;
  category: string;
  emoji: string;
  message: string;
  authorNote: string;
  bgColor: string;
  textColor: string;
  tapeColor: string;
  rotation: string;
  reactions: {
    heart: number;
    zap: number;
    coffee: number;
  };
}

const INITIAL_STICKY_NOTES: StickyNote[] = [
  {
    id: 'note-1',
    category: 'WANDERLUST',
    emoji: '🏔️',
    message: "100% down for spontaneous road trips, sunset viewpoints, mountain trails, and exploring new cities with just a backpack and curiosity!",
    authorNote: '— Adventure mode always ON',
    bgColor: '#FEF08A', // Yellow
    textColor: '#422006',
    tapeColor: 'rgba(254, 240, 138, 0.7)',
    rotation: '-rotate-2',
    reactions: { heart: 28, zap: 19, coffee: 11 }
  },
  {
    id: 'note-2',
    category: 'TEA PERSON',
    emoji: '🫖',
    message: "Unapologetically a tea person! Masala chai on rainy mornings, iced peach tea when it's sunny, and fresh jasmine green tea to unwind.",
    authorNote: '— Chai over coffee any day ☕',
    bgColor: '#FED7AA', // Peach
    textColor: '#431407',
    tapeColor: 'rgba(254, 215, 170, 0.7)',
    rotation: 'rotate-1.5',
    reactions: { heart: 34, zap: 14, coffee: 42 }
  },
  {
    id: 'note-3',
    category: 'PLAYLIST VIBES',
    emoji: '🎧',
    message: "Current mood: chill indie acoustic, lo-fi, and retro synth on loop. Constantly hunting for underrated songs for long night drives with the windows down.",
    authorNote: '— Headphones glued on',
    bgColor: '#FBCFE8', // Pink
    textColor: '#500724',
    tapeColor: 'rgba(251, 207, 232, 0.7)',
    rotation: '-rotate-1',
    reactions: { heart: 23, zap: 18, coffee: 9 }
  },
  {
    id: 'note-4',
    category: 'COURT THERAPY',
    emoji: '🏀',
    message: "Nothing clears the head faster than sinking a clean three-pointer or running full-court fast breaks under the evening floodlights!",
    authorNote: '— Pure adrenaline rush',
    bgColor: '#BAE6FD', // Sky blue
    textColor: '#082f49',
    tapeColor: 'rgba(186, 230, 253, 0.7)',
    rotation: 'rotate-2',
    reactions: { heart: 31, zap: 25, coffee: 12 }
  },
  {
    id: 'note-5',
    category: 'FOOD DIARIES',
    emoji: '🍜',
    message: "Life is 90% driven by spicy street food, crispy dosas, and warm boba. If good food or cafe hopping is promised, count me in immediately!",
    authorNote: '— Certified snack enthusiast',
    bgColor: '#D9F99D', // Lime
    textColor: '#14532d',
    tapeColor: 'rgba(217, 249, 157, 0.7)',
    rotation: '-rotate-2.5',
    reactions: { heart: 45, zap: 16, coffee: 29 }
  },
  {
    id: 'note-6',
    category: 'LITTLE JOYS',
    emoji: '☁️',
    message: "Taking 10,000 photos of sky gradients, collecting cute stationery I'm too scared to use, and stargazing from open terraces.",
    authorNote: '— Romanticizing the mundane',
    bgColor: '#E9D5FF', // Purple
    textColor: '#3b0764',
    tapeColor: 'rgba(233, 213, 255, 0.7)',
    rotation: 'rotate-1',
    reactions: { heart: 39, zap: 21, coffee: 17 }
  }
];

export const OutsideTerminal: React.FC = () => {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(INITIAL_STICKY_NOTES);
  const [activePeelId, setActivePeelId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [layoutMode, setLayoutMode] = useState<'board' | 'compact'>('board');
  const [newNoteText, setNewNoteText] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [selectedColor, setSelectedColor] = useState('#FEF08A');
  const [selectedCategory, setSelectedCategory] = useState('ADVENTURE & VIBES');
  const [recentlyBoostedId, setRecentlyBoostedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(stickyNotes.map((n) => n.category));
    return ['ALL', ...Array.from(set)];
  }, [stickyNotes]);

  const filteredNotes = useMemo(() => {
    if (activeCategoryFilter === 'ALL') return stickyNotes;
    return stickyNotes.filter((n) => n.category === activeCategoryFilter);
  }, [stickyNotes, activeCategoryFilter]);

  const totalReactions = useMemo(() => {
    return stickyNotes.reduce((acc, note) => acc + note.reactions.heart + note.reactions.zap + note.reactions.coffee, 0);
  }, [stickyNotes]);

  const handleReact = (noteId: string, reactionType: 'heart' | 'zap' | 'coffee') => {
    setStickyNotes((prev) =>
      prev.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            reactions: {
              ...note.reactions,
              [reactionType]: note.reactions[reactionType] + 1
            }
          };
        }
        return note;
      })
    );
    setRecentlyBoostedId(noteId);
    setTimeout(() => setRecentlyBoostedId(null), 1000);
  };

  const handleShuffleNotes = () => {
    setStickyNotes((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleAddCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1.5', '-rotate-2.5'];
    const randomRot = rotations[Math.floor(Math.random() * rotations.length)];

    const newNote: StickyNote = {
      id: `custom-${Date.now()}`,
      category: selectedCategory.toUpperCase(),
      emoji: selectedEmoji,
      message: newNoteText.trim(),
      authorNote: '— Freshly pinned by guest visitor!',
      bgColor: selectedColor,
      textColor: '#1e293b',
      tapeColor: `${selectedColor}99`,
      rotation: randomRot,
      reactions: { heart: 1, zap: 1, coffee: 1 }
    };

    setStickyNotes([newNote, ...stickyNotes]);
    setNewNoteText('');
    setShowNoteModal(false);
  };

  return (
    <section id="beyond-code" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#FEF08A] mb-3 uppercase tracking-[0.2em]">
            <span>// 08 DIMENSIONS & QUIRKS</span>
            <span>—</span>
            <AnimatedDecoderText text="OUTSIDE THE TERMINAL & DYNAMIC POST-IT BOARD" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-[#FDFCFB]">
            Beyond the code: <span className="text-stroke-yellow font-bold">discipline, speed</span> & sticky notes.
          </h2>
        </div>
        <div className="font-mono text-xs text-white/60 max-w-sm leading-relaxed">
          Physical athletics, etymological precision, and the little quirks and caffeinated sticky notes that keep the engineering engine humming.
        </div>
      </div>

      {/* Main Dimension Dual Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basketball card */}
        <div className="relative p-6 sm:p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#FB923C]/40 transition-all duration-300 shadow-md">
          <div className="w-24 h-3.5 washi-tape-peach rounded-sm absolute -top-1.5 left-10 opacity-90 -rotate-1 shadow-xs" />
          <div className="flex items-center justify-between pb-4 border-b border-white/10 pt-1">
            <span className="px-3 py-1 rounded-xl text-[10px] font-mono font-bold bg-[#FB923C]/15 text-[#FB923C] border border-[#FB923C]/30 flex items-center gap-1.5">
              <Flame className="w-3 h-3 text-[#FB923C]" />
              <span>DISTRICT ATHLETICS 🏀</span>
            </span>
            <Trophy className="w-5 h-5 text-[#FB923C] group-hover:scale-110 group-hover:rotate-6 transition-transform" />
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#FB923C] transition-colors">
              District-Level Basketball Player
            </h3>
            <p className="text-sm text-white/70 mt-3 leading-relaxed font-sans">
              Competitive basketball taught me that high-tempo systems only function when every player executes fast transitions with zero ego. On the court, you read passing lanes, anticipate broken plays, and communicate in split-seconds.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="text-[#FB923C] font-bold block mb-1 uppercase tracking-wider">ENGINEERING PARALLEL ⚡</span>
              <span className="text-white/65 font-sans text-xs">
                High-throughput distributed systems require the same instinct—failover anticipation, low latency, and continuous spatial coordination across microservices.
              </span>
            </div>
          </div>
        </div>

        {/* Spell Bee card */}
        <div className="relative p-6 sm:p-8 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#C084FC]/40 transition-all duration-300 shadow-md">
          <div className="w-24 h-3.5 washi-tape-lavender rounded-sm absolute -top-1.5 left-10 opacity-90 -rotate-1 shadow-xs" />
          <div className="flex items-center justify-between pb-4 border-b border-white/10 pt-1">
            <span className="px-3 py-1 rounded-xl text-[10px] font-mono font-bold bg-[#C084FC]/15 text-[#C084FC] border border-[#C084FC]/30 flex items-center gap-1.5">
              <Award className="w-3 h-3 text-[#C084FC]" />
              <span>STATE ACADEMICS 🐝</span>
            </span>
            <Sparkles className="w-5 h-5 text-[#C084FC] group-hover:scale-110 group-hover:-rotate-6 transition-transform" />
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#C084FC] transition-colors">
              State-Level Spell Bee Participant
            </h3>
            <p className="text-sm text-white/70 mt-3 leading-relaxed font-sans">
              Competing at the state level required deconstructing language into root mechanics, Greek and Latin etymologies, and structural phonetics rather than brute-force memorization.
            </p>

            <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="text-[#C084FC] font-bold block mb-1 uppercase tracking-wider">ENGINEERING PARALLEL 🌸</span>
              <span className="text-white/65 font-sans text-xs">
                Syntax errors, AST compiler passes, and protocol schemas reward the exact same obsession with semantic precision and structural root analysis.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC LAB CORKBOARD SECTION */}
      <div className="mt-16 pt-12 border-t border-white/10">
        {/* Dynamic Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-3xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FEF08A] uppercase tracking-wider font-bold">
              <Pin className="w-4 h-4 text-[#FEF08A]" />
              <span>THE LAB CORKBOARD // DYNAMIC BRAIN POST-ITS 📌</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-white/60 font-sans">
              <span>{stickyNotes.length} pinned sticky notes</span>
              <span>•</span>
              <span className="text-[#FEF08A] font-mono font-bold">{totalReactions} interactive reactions ✨</span>
              <span>•</span>
              <span className="text-white/40">Click any note to zoom/peel</span>
            </div>
          </div>

          {/* Interactive Actions Strip */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setLayoutMode('board')}
                title="Tilted Corkboard Layout"
                className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'board' ? 'bg-[#FEF08A] text-black font-bold shadow-xs' : 'text-white/60 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CORKBOARD</span>
              </button>
              <button
                onClick={() => setLayoutMode('compact')}
                title="Structured Grid Layout"
                className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  layoutMode === 'compact' ? 'bg-[#FEF08A] text-black font-bold shadow-xs' : 'text-white/60 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GRID</span>
              </button>
            </div>

            {/* Shuffle Button */}
            <button
              onClick={handleShuffleNotes}
              data-cursor="SHUFFLE"
              title="Shuffle Note Positions"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all text-xs font-mono flex items-center gap-1.5 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#5EEAD4]" />
              <span className="hidden sm:inline">SHUFFLE</span>
            </button>

            {/* Add Sticky Note Trigger */}
            <button
              onClick={() => setShowNoteModal(true)}
              data-cursor="ADD"
              className="px-4 py-2.5 bg-[#FF85A2] hover:bg-[#ff7092] text-black text-xs font-mono font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#FF85A2]/15 hover:shadow-[#FF85A2]/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>STICK A NOTE 💌</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" />
            FILTER:
          </span>
          {categories.map((cat) => {
            const isSelected = activeCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Sticky Notes Grid / Canvas */}
        <div
          className={`transition-all duration-300 ${
            layoutMode === 'board'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
          }`}
        >
          {filteredNotes.map((note) => {
            const isPeeling = activePeelId === note.id;
            const isRecentlyBoosted = recentlyBoostedId === note.id;
            const cardRotation = layoutMode === 'board' ? note.rotation : 'rotate-0';

            return (
              <div
                key={note.id}
                onClick={() => {
                  setActivePeelId(activePeelId === note.id ? null : note.id);
                }}
                className={`relative p-5 pt-7 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.03] hover:rotate-0 hover:z-20 cursor-pointer select-none ${cardRotation} ${
                  isPeeling ? 'scale-105 rotate-0 z-30 shadow-2xl ring-4 ring-white/60' : ''
                } ${isRecentlyBoosted ? 'animate-bounce' : ''}`}
                style={{
                  backgroundColor: note.bgColor,
                  color: note.textColor,
                  boxShadow:
                    layoutMode === 'board'
                      ? '0 12px 28px -6px rgba(0, 0, 0, 0.45), 0 8px 12px -6px rgba(0, 0, 0, 0.3)'
                      : '0 4px 14px rgba(0, 0, 0, 0.25)'
                }}
              >
                {/* Washi Tape Header (Rendered on Board Mode) */}
                {layoutMode === 'board' && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5.5 rounded-xs opacity-85 backdrop-blur-xs border border-white/40 shadow-xs"
                    style={{
                      backgroundColor: note.tapeColor,
                      transform: 'rotate(-1deg)'
                    }}
                  />
                )}

                {/* Top Category Tag + Emoji */}
                <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-black/10">
                  <span className="text-[10px] font-mono font-black tracking-wider uppercase opacity-75">
                    {note.category}
                  </span>
                  <span className="text-lg hover:scale-125 transition-transform">{note.emoji}</span>
                </div>

                {/* Cute Message Text */}
                <p className="text-xs sm:text-[13px] font-sans font-medium leading-relaxed mb-3.5">
                  "{note.message}"
                </p>

                {/* Author footer */}
                <div className="text-[11px] font-mono font-semibold opacity-70 italic mb-4">
                  {note.authorNote}
                </div>

                {/* Interactive Click Reactions Bar */}
                <div
                  className="pt-2.5 border-t border-black/10 flex items-center justify-between text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5">
                    {/* Heart */}
                    <button
                      onClick={() => handleReact(note.id, 'heart')}
                      className="px-2 py-0.5 rounded-full bg-black/5 hover:bg-black/15 transition-all text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:scale-110 active:scale-90"
                      title="Send love"
                    >
                      <span>❤️</span>
                      <span>{note.reactions.heart}</span>
                    </button>

                    {/* Zap */}
                    <button
                      onClick={() => handleReact(note.id, 'zap')}
                      className="px-2 py-0.5 rounded-full bg-black/5 hover:bg-black/15 transition-all text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:scale-110 active:scale-90"
                      title="High energy"
                    >
                      <span>⚡</span>
                      <span>{note.reactions.zap}</span>
                    </button>

                    {/* Coffee */}
                    <button
                      onClick={() => handleReact(note.id, 'coffee')}
                      className="px-2 py-0.5 rounded-full bg-black/5 hover:bg-black/15 transition-all text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer hover:scale-110 active:scale-90"
                      title="Refuel"
                    >
                      <span>☕</span>
                      <span>{note.reactions.coffee}</span>
                    </button>
                  </div>

                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-tighter">
                    {isPeeling ? 'CLICK TO UNZOOM' : 'PEEL'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Custom Sticky Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121118] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-24 h-3.5 washi-tape-pink rounded-sm absolute -top-1.5 left-8 opacity-90 -rotate-1" />
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 pt-1">
              <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                <Smile className="w-5 h-5 text-[#FF85A2]" />
                <span>Stick a Dynamic Note 💌</span>
              </div>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-white/40 hover:text-white font-mono text-sm px-2 py-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomNote} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                  Category Tag:
                </label>
                <input
                  type="text"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  placeholder="e.g. ADVENTURE, TEA TALK, ROAD TRIPS"
                  maxLength={20}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white text-xs font-mono focus:outline-none focus:border-[#FF85A2]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                  Your Cute Message, Adventure Story, or Thought:
                </label>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="e.g., Watching the sunrise from a hilltop after a night hike is undefeated!"
                  rows={3}
                  maxLength={160}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-xs font-sans focus:outline-none focus:border-[#FF85A2] resize-none"
                />
                <div className="text-[10px] font-mono text-white/40 text-right mt-1">
                  {newNoteText.length}/160 chars
                </div>
              </div>

              {/* Emoji Picker */}
              <div>
                <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                  Select Emoji Badge:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['✨', '☕', '🏀', '🐝', '💡', '🚀', '💖', '🎧', '👾', '🔥', '💻', '🌸'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-base border transition-all cursor-pointer ${
                        selectedEmoji === emoji
                          ? 'bg-[#FF85A2]/20 border-[#FF85A2] scale-110 shadow-sm'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="block text-xs font-mono text-white/70 mb-2 uppercase">
                  Sticky Note Color:
                </label>
                <div className="flex gap-2.5">
                  {[
                    { color: '#FEF08A', name: 'Yellow' },
                    { color: '#FBCFE8', name: 'Pink' },
                    { color: '#D9F99D', name: 'Lime' },
                    { color: '#BAE6FD', name: 'Blue' },
                    { color: '#E9D5FF', name: 'Purple' },
                    { color: '#FED7AA', name: 'Peach' }
                  ].map((c) => (
                    <button
                      key={c.color}
                      type="button"
                      onClick={() => setSelectedColor(c.color)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                        selectedColor === c.color ? 'ring-2 ring-[#FF85A2] scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.color, borderColor: '#00000040' }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-white/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FF85A2] hover:bg-[#ff7092] text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider cursor-pointer shadow-md shadow-[#FF85A2]/20"
                >
                  Pin to Board 📌
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

