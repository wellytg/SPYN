import React from 'react';
import SurveyView from './SurveyView';
import { View } from '../types';
import { EFS_WORKFLOW_STEPS } from '../constants';
import HeroBackground from '../components/HeroBackground';

interface HomeViewProps {
    setActiveView: (view: View) => void;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-spyn-slate-800 p-6 rounded-lg border border-spyn-slate-700 text-center flex flex-col items-center">
        <div className="bg-spyn-teal-600/80 p-4 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-spyn-teal-400 mb-2">{title}</h3>
        <p className="text-spyn-slate-300 text-sm leading-relaxed">
            {description}
        </p>
    </div>
);

const HomeView: React.FC<HomeViewProps> = ({ setActiveView }) => {
    
    const workflowIcons = [
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-spyn-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 3a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-spyn-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-spyn-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    ];

    const updatedWorkflowSteps = [
      {
        title: "1. AI-Powered Match",
        description: "Our AI goes beyond resumes to match founders and professionals on skill, vision, and risk alignment, building a strong foundation for success.",
      },
      {
        title: "2. On-Platform Legal Transaction",
        description: "Generate and execute legally-vetted EFS contracts on-platform. Secure your partnership in minutes, not months, and save thousands in legal fees.",
      },
      {
        title: "3. Automated Governance",
        description: "Automate vesting and IP assignment based on clear milestones. Our platform acts as a neutral third-party, ensuring all contributions are transparently recorded and rewarded.",
      }
    ];
    
    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <div className="relative isolate text-center py-16 overflow-hidden">
                <HeroBackground />
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                    <span className="block">Build Your Vision with Equity, Not Capital</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-spyn-slate-300 sm:text-xl">
                    The trusted platform where founders and elite professionals unite to build ventures using Equity-for-Services (EFS) contracts, not cash.
                </p>
                 <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => setActiveView(View.Founder)}
                        className="w-full sm:w-auto inline-block bg-spyn-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-spyn-teal-500 transition-colors"
                    >
                        Start Your EFS Partnership
                    </button>
                     <button 
                        onClick={() => setActiveView(View.Opportunities)}
                        className="w-full sm:w-auto inline-block bg-spyn-slate-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-spyn-slate-600 transition-colors"
                    >
                        Explore Opportunities Now
                    </button>
                </div>
            </div>

            {/* Problem Section */}
            <div className="space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The High-Stakes Gamble of Early-Stage Partnerships</h2>
                    <p className="mt-4 text-lg text-spyn-slate-300 max-w-3xl mx-auto">Brilliant ideas die in the trust gap. Founders burn through capital while professionals gamble on vague promises.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-spyn-slate-800/50 p-8 rounded-lg border border-spyn-slate-700">
                        <h3 className="text-2xl font-bold text-spyn-gold-400 mb-4">For Founders</h3>
                        <p className="text-spyn-slate-200">
                           You have the vision but lack the capital for elite talent. Handshake deals lead to broken promises, costly legal battles, and diluted equity.
                        </p>
                    </div>
                    <div className="bg-spyn-slate-800/50 p-8 rounded-lg border border-spyn-slate-700">
                        <h3 className="text-2xl font-bold text-spyn-gold-400 mb-4">For Professionals</h3>
                        <p className="text-spyn-slate-200">
                            You bring invaluable skills to the table, but vague agreements and worthless equity leave your contributions unrewarded and your intellectual property at risk.
                        </p>
                    </div>
                </div>
            </div>

            {/* Visual Workflow Section */}
            <div className="space-y-12 py-16">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How SPYN Works: A Simple, Secure Workflow</h2>
                    <p className="mt-4 text-lg text-spyn-slate-300 max-w-3xl mx-auto">
                        Our three-step process transforms risky handshake deals into secure, transparent, and legally-binding partnerships.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch justify-center md:space-x-8 lg:space-x-16 space-y-8 md:space-y-0">
                    {updatedWorkflowSteps.map((step, index) => (
                        <React.Fragment key={step.title}>
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="flex items-center justify-center bg-spyn-slate-800 border-2 border-spyn-teal-500 rounded-full w-20 h-20 mb-4">
                                    {workflowIcons[index]}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-spyn-slate-300 text-sm max-w-xs">{step.description}</p>
                            </div>
                            {index < EFS_WORKFLOW_STEPS.length - 1 && (
                                <div className="hidden md:flex items-center">
                                    <svg className="h-6 w-6 text-spyn-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            
            {/* Solution Section */}
            <div className="space-y-12">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Framework for Trust & Growth</h2>
                    <p className="mt-4 text-lg text-spyn-slate-300">SPYN is built on three pillars that replace ambiguity with certainty.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        title="SPYN Match"
                        description="Find the Right Partner, Faster. Our AI ensures you connect with individuals who are not just skilled, but truly aligned with your vision and goals."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                    />
                    <FeatureCard 
                        title="SPYN Legal Framework"
                        description="Eliminate Legal Risk & Cost. Use our pre-vetted contracts to formalize your partnership. Protect your IP and equity without the expense of traditional law firms."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    />
                    <FeatureCard 
                        title="SPYN Governance"
                        description="Build & Maintain Trust. Our platform automates equity vesting and milestone tracking, creating an unbreakable, transparent record of accountability for all parties."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                    />
                </div>
            </div>

            {/* Assessment Section */}
            <div id="assessment">
              <SurveyView />
            </div>
        </div>
    );
};

export default HomeView;