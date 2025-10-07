import React from 'react';

const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden -z-10" aria-hidden="true">
    <svg
      width="100%"
      height="100%"
      className="absolute inset-0"
    >
      <defs>
        <radialGradient id="grad1" cx="50%" cy="30%" r="70%" fx="50%" fy="30%">
          <stop offset="0%" style={{ stopColor: 'rgba(20, 184, 166, 0.15)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgba(20, 184, 166, 0)', stopOpacity: 1 }} />
        </radialGradient>
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle id="pattern-circle" cx="20" cy="20" r="1" className="fill-current text-spyn-slate-700/50"></circle>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern-circles)"></rect>
      <rect width="100%" height="100%" fill="url(#grad1)" />
    </svg>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-gradient-to-t from-spyn-slate-900 to-transparent"></div>
  </div>
);

export default HeroBackground;
