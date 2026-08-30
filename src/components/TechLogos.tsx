import React from 'react';

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, className = 'w-4 h-4', size = 16 }) => {
  const norm = name.toLowerCase().replace(/[\s\.\-_/]/g, '');

  // Python
  if (norm.includes('python')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.91 2C6.44 2 6.78 4.38 6.78 4.38L6.79 6.84H12.1V7.61H4.37S2 7.34 2 12.81c0 5.48 2.07 5.28 2.07 5.28h1.23V16.3s-.07-2.14 2.1-2.14h5.27s2.03.03 2.03-1.99V4.02S15.04 2 11.91 2zM9.54 3.53a.8.8 0 110 1.6.8.8 0 010-1.6z"
          fill="#38bdf8"
        />
        <path
          d="M12.09 22c5.47 0 5.13-2.38 5.13-2.38l-.01-2.46H11.9v-.77h7.73s2.37.27 2.37-5.2c0-5.48-2.07-5.28-2.07-5.28h-1.23v1.79s.07 2.14-2.1 2.14h-5.27s-2.03-.03-2.03 1.99v8.15S8.96 22 12.09 22zm2.37-1.53a.8.8 0 110-1.6.8.8 0 010-1.6z"
          fill="#D4FF3F"
        />
      </svg>
    );
  }

  // Neo4j / Cypher
  if (norm.includes('neo4j') || norm.includes('cypher')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="6" cy="18" r="3" fill="#008CC1" />
        <circle cx="18" cy="18" r="3" fill="#008CC1" />
        <circle cx="12" cy="6" r="3.5" fill="#D4FF3F" />
        <path d="M7.8 16.2L10.5 8.8M16.2 16.2L13.5 8.8M8.8 18h6.4" stroke="#008CC1" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // FastAPI
  if (norm.includes('fastapi')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-4.75H8.75l4.5-6.25v4.75h2.25L13 16.5z" fill="#05998B" />
        <path d="M12.5 7.5L9 12h2.5V16.5L15 12h-2.5V7.5z" fill="#D4FF3F" />
      </svg>
    );
  }

  // PyTorch
  if (norm.includes('pytorch')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M13.5 3.5l1.8 1.8a7.5 7.5 0 11-6.6 0L10.5 3.5" stroke="#EE4C2C" strokeWidth="2" strokeLinecap="round" />
        <circle cx="15.8" cy="4.8" r="1.2" fill="#EE4C2C" />
      </svg>
    );
  }

  // Scikit-learn
  if (norm.includes('scikit') || norm.includes('sklearn')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="6" stroke="#F89939" strokeWidth="2" fill="#F89939" fillOpacity="0.3" />
        <circle cx="15" cy="15" r="6" stroke="#3499CD" strokeWidth="2" fill="#3499CD" fillOpacity="0.3" />
        <circle cx="12" cy="12" r="2" fill="#D4FF3F" />
      </svg>
    );
  }

  // React
  if (norm.includes('react')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  // TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4 10h6M7 10v9M13 16c.8 1.5 2.2 2 3.8 2 2.2 0 3.2-1.1 3.2-2.5 0-3-4.8-2.2-4.8-4.5 0-.9.8-1.7 2.4-1.7 1.3 0 2.4.5 3 1.4" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l9 5.2v10.4L12 22 3 17.6V7.2L12 2z" stroke="#68A063" strokeWidth="2" fill="#68A063" fillOpacity="0.2" />
        <path d="M12 6.5v11M7.5 9l9 5.5" stroke="#68A063" strokeWidth="1.5" />
      </svg>
    );
  }

  // Docker
  if (norm.includes('docker')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="11" width="3" height="3" fill="#2496ED" rx="0.5" />
        <rect x="6" y="11" width="3" height="3" fill="#2496ED" rx="0.5" />
        <rect x="10" y="11" width="3" height="3" fill="#2496ED" rx="0.5" />
        <rect x="6" y="7" width="3" height="3" fill="#2496ED" rx="0.5" />
        <rect x="10" y="7" width="3" height="3" fill="#2496ED" rx="0.5" />
        <rect x="10" y="3" width="3" height="3" fill="#2496ED" rx="0.5" />
        <path d="M1 14c1 4 4.5 7 10 7 7.5 0 11-4 12-7-1.5-.5-3.5 0-4.5 1-2 2-7.5 1-7.5 1s-4.5 0-6.5-2H1z" fill="#2496ED" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm.includes('git')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.5" fill="#F05032" />
        <circle cx="18" cy="12" r="2.5" fill="#F05032" />
        <circle cx="6" cy="18" r="2.5" fill="#F05032" />
        <path d="M6 8.5v7M8.5 6h2c3 0 5 2 5 5v1" stroke="#F05032" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 13c1.5-3 3.5-4 6-3 1.8.7 2.6 1.8 3.8 2.9 1.9 1.8 4 2.6 7.2 1.1-1.5 3-3.5 4-6 3-1.8-.7-2.6-1.8-3.8-2.9-1.9-1.8-4-2.6-7.2-1.1zM1 18c1.5-3 3.5-4 6-3 1.8.7 2.6 1.8 3.8 2.9 1.9 1.8 4 2.6 7.2 1.1-1.5 3-3.5 4-6 3-1.8-.7-2.6-1.8-3.8-2.9-1.9-1.8-4-2.6-7.2-1.1z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // MongoDB / Database
  if (norm.includes('mongo')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 2 5 7 5 13.5c0 3.8 3.1 7 7 8.5 3.9-1.5 7-4.7 7-8.5C19 7 12 2 12 2z" stroke="#47A248" strokeWidth="1.8" fill="#47A248" fillOpacity="0.2" />
        <path d="M12 3v17.5" stroke="#47A248" strokeWidth="1.5" />
      </svg>
    );
  }

  // PostgreSQL / SQL
  if (norm.includes('sql') || norm.includes('postgres')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#336791" strokeWidth="1.8" fill="#336791" fillOpacity="0.2" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#336791" strokeWidth="1.8" />
      </svg>
    );
  }

  // C++ / C
  if (norm.includes('c++') || norm === 'cpp') {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M11 6.5A6 6 0 1011 17.5" stroke="#00599C" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 12h3M15.5 10.5v3M19 12h3M20.5 10.5v3" stroke="#00599C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Hugging Face / Transformers
  if (norm.includes('hugging') || norm.includes('transformer') || norm.includes('bert')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#FFD21E" strokeWidth="2" fill="#FFD21E" fillOpacity="0.2" />
        <circle cx="9" cy="10" r="1.5" fill="#FFD21E" />
        <circle cx="15" cy="10" r="1.5" fill="#FFD21E" />
        <path d="M8.5 14.5c1 1.5 2.3 2 3.5 2s2.5-.5 3.5-2" stroke="#FFD21E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // Pandas / Data
  if (norm.includes('panda') || norm.includes('numpy')) {
    return (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="6" height="6" rx="1.5" fill="#150458" stroke="#38bdf8" strokeWidth="1.2" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" fill="#FFD43B" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" fill="#FFD43B" />
        <rect x="14" y="14" width="6" height="6" rx="1.5" fill="#150458" stroke="#38bdf8" strokeWidth="1.2" />
      </svg>
    );
  }

  // Default Terminal / Chip Icon
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#D4FF3F" strokeWidth="2">
      <path d="M4 17l6-6-6-6M12 19h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
