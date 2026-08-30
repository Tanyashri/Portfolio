import React from 'react';

export const CuteJournalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Ambient Fine Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Atmospheric Soft Light Glows */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 18% 18%, rgba(255, 133, 162, 0.06) 0%, transparent 45%),
                       radial-gradient(circle at 82% 28%, rgba(94, 234, 212, 0.05) 0%, transparent 50%),
                       radial-gradient(circle at 50% 85%, rgba(254, 240, 138, 0.04) 0%, transparent 55%),
                       radial-gradient(circle at 85% 85%, rgba(192, 132, 252, 0.05) 0%, transparent 50%)`
        }}
      />
    </div>
  );
};
