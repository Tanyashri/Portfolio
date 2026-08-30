import React, { useState, useEffect } from 'react';
import { Copy, Check, FileText, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sectionIds = ['work', 'stack', 'about', 'experience', 'beyond-code', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
      if (window.scrollY < 150) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'STACK', href: '#stack', id: 'stack' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'BEYOND CODE', href: '#beyond-code', id: 'beyond-code' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0C10]/92 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex flex-col group cursor-pointer"
          data-cursor="EXPLORE"
        >
          <span className="font-display font-black tracking-tighter text-lg sm:text-xl text-[#FDFCFB] group-hover:text-[#FF85A2] transition-colors flex items-center gap-1.5">
            <span>TANYASHRI M.</span>
            <span className="text-xs text-[#FF85A2] opacity-80 group-hover:scale-125 transition-transform">🌸</span>
          </span>
          <span className="text-[10px] font-mono text-[#5EEAD4] tracking-[0.2em] uppercase">
            SYSTEMS // AI_ML // BACKEND
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[11px] font-mono tracking-widest uppercase">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 px-2.5 rounded-lg transition-all duration-200 tracking-wider flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FF85A2]/15 text-[#FF85A2] font-bold border border-[#FF85A2]/30 shadow-sm'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF85A2] animate-pulse" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="VIEW"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-[#FDFCFB] border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
          >
            <FileText className="w-3.5 h-3.5 text-[#5EEAD4] group-hover:scale-110 transition-transform" />
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-[#5EEAD4] transition-colors" />
          </a>

          <button
            onClick={handleCopyEmail}
            data-cursor="CONTACT"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FF85A2]/15 hover:bg-[#FF85A2]/25 text-xs font-mono text-[#FF85A2] font-semibold border border-[#FF85A2]/35 hover:border-[#FF85A2]/60 transition-all cursor-pointer shadow-sm shadow-[#FF85A2]/10"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>COPIED ✨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-lg bg-[#5EEAD4]/15 text-xs font-mono text-[#5EEAD4] border border-[#5EEAD4]/30 flex items-center gap-1"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 text-white/60 hover:text-white border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0D0C10] px-4 py-5 space-y-3 font-mono text-xs animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 pb-2 text-[#FEF08A] text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#FEF08A] animate-pulse" />
            <span>OPEN TO INTERNSHIP OPPORTUNITIES (2025-2026) ✨</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-1.5 ${
                  activeSection === link.id
                    ? 'bg-[#FF85A2]/15 border-[#FF85A2]/40 text-[#FF85A2] font-bold'
                    : 'bg-white/5 border-white/10 text-white/80 hover:text-[#FF85A2]'
                }`}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          <div className="pt-2 flex gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-white/10 text-white border border-white/10 text-center flex items-center justify-center gap-1.5"
            >
              <span>VIEW RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5EEAD4]" />
            </a>
            <button
              onClick={handleCopyEmail}
              className="flex-1 py-2.5 rounded-xl bg-[#FF85A2]/15 text-[#FF85A2] border border-[#FF85A2]/30 text-center flex items-center justify-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
