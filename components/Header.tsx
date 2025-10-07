import React from 'react';
import { View } from '../types';

interface HeaderProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavLink: React.FC<{
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      active
        ? 'bg-spyn-teal-600 text-white'
        : 'text-spyn-slate-300 hover:bg-spyn-slate-700 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const SpynLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 64 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g className="text-blue-500">
      <path d="M29.63 23.31c-2.02-1.01-4.04-1.62-6.14-1.82-2.6-.2-5.22.2-7.65 1.2-1.31.5-2.59 1.2-3.8 2-.6.4-1.21.9-1.81 1.4-.5.4-1 .9-1.4 1.4-1.01.9-1.92 2-2.73 3.2-.4.6-.71 1.2-1.01 1.9-.3.6-.5 1.2-.6 1.9-.2 1.3-.1 2.6.2 3.9.3 1.2.8 2.3 1.51 3.3.3.5.7.99 1.1 1.4.81.9 1.82 1.6 2.93 2.1.5.2 1 .4 1.51.6 2.12.7 4.24 1 6.35.9 1.81-.1 3.63-.5 5.24-1.3.8-.4 1.51-.9 2.22-1.5.7-.6 1.31-1.3 1.92-2 .5-.6 1-1.3 1.41-2 .4-.7.8-1.5 1.1-2.3.3-.8.5-1.6.7-2.4.2-.8.3-1.7.3-2.5v-2.1z" fill="currentColor" />
      <path d="M39.26 22.44c-1.2-.99-2.6-1.8-4-2.4-2-.8-4.1-1.3-6.2-1.4-1.4-.1-2.8 0-4.1.3-1.9.4-3.7 1.1-5.4 2-.8.4-1.6.9-2.3 1.5l-2.2 1.9c-1 .8-1.9 1.7-2.6 2.8-.4.5-.7 1.1-1 1.7-.6 1.2-1 2.6-1.1 4-.1.7-.1 1.4 0 2.1.1.7.3 1.4.6 2.1.5 1.4 1.3 2.6 2.4 3.6s2.4 1.7 3.8 2.2c1.4.5 2.8.7 4.3.6 1.1-.1 2.2-.3 3.3-.7 1-.4 2-.9 2.9-1.6 1.8-1.4 3.2-3.2 4.1-5.2.5-1.1.8-2.2 1-3.4.2-1.2.3-2.4.1-3.6-.1-.6-.2-1.2-.4-1.7z" fill="currentColor" />
    </g>
    <path d="M20.5 16.2L13.5 23.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M28.2 22.6L29.5 15.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M35.2 22.6L36.5 15.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M42.2 22.6L43.5 16.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M20.5 16.2L29.5 15.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M36.5 15.2L43.5 16.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M13.5 23.2L20.5 16.2L28.2 22.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M50.5 23.2L43.5 16.2L35.2 22.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <path d="M28.2 22.6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    <g className="text-blue-500">
      <circle cx="20.5" cy="16.2" r="2.5" fill="currentColor" />
      <circle cx="29.5" cy="15.2" r="2" fill="currentColor" />
      <circle cx="36.5" cy="15.2" r="2" fill="currentColor" />
      <circle cx="43.5" cy="16.2" r="2.5" fill="currentColor" />
      <circle cx="13.5" cy="23.2" r="2" fill="currentColor" />
      <circle cx="50.5" cy="23.2" r="2" fill="currentColor" />
    </g>
    <g className="text-green-500">
      <rect x="11.5" y="14" width="6" height="6" rx="2" fill="currentColor" transform="rotate(15 11.5 14)" />
      <rect x="46.5" y="14" width="6" height="6" rx="2" fill="currentColor" transform="rotate(-15 46.5 14)" />
      <rect x="54" y="21" width="6" height="6" rx="2" fill="currentColor" />
      <rect x="4" y="21" width="6" height="6" rx="2" fill="currentColor" />
    </g>
    <path d="M4 14L8 12" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 18L12 17" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M59 14L55 12" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M55 18L51 17" stroke="#86efac" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);


const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-spyn-slate-800/80 backdrop-blur-sm sticky top-0 z-40 border-b border-spyn-slate-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
                onClick={() => setActiveView(View.Home)}
                className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-spyn-slate-800 focus:ring-spyn-teal-500 rounded-md"
                aria-label="Go to SPYN homepage"
            >
                <SpynLogoIcon className="h-8 w-auto" />
                <span className="text-2xl font-bold text-white tracking-wider">SPYN</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink active={activeView === View.Home} onClick={() => setActiveView(View.Home)}>Home</NavLink>
              <NavLink active={activeView === View.Opportunities} onClick={() => setActiveView(View.Opportunities)}>Find Opportunities</NavLink>
              <NavLink active={activeView === View.Contracts} onClick={() => setActiveView(View.Contracts)}>EFS Contracts</NavLink>
              <NavLink active={activeView === View.Pricing} onClick={() => setActiveView(View.Pricing)}>Pricing</NavLink>
              <NavLink active={activeView === View.Founder} onClick={() => setActiveView(View.Founder)}>Founder View</NavLink>
              <NavLink active={activeView === View.Professional} onClick={() => setActiveView(View.Professional)}>Professional View</NavLink>
              <NavLink active={activeView === View.Admin} onClick={() => setActiveView(View.Admin)}>Admin View</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;