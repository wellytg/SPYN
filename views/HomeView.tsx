import React from 'react';
import SurveyView from './SurveyView';

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


const HomeView: React.FC = () => {
    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <div className="text-center py-16">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                    <span className="block">SPYN: Smart People You Need</span>
                    <span className="block text-spyn-teal-400 text-2xl mt-2 tracking-normal font-medium">"Where Smart Money Meets Smart People"™</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-spyn-slate-300 sm:text-xl">
                    The secure, transactional platform designed to formalize and de-risk Equity-for-Services (EFS) partnerships. We eliminate the risk, time, and energy drain of forming critical partnerships.
                </p>
                 <div className="mt-8 flex justify-center">
                    <a href="#assessment" className="inline-block bg-spyn-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-spyn-teal-500 transition-colors">
                        Take the Assessment
                    </a>
                </div>
            </div>

            {/* Problem Section */}
            <div className="space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Solving the Talent & Trust Gap</h2>
                    <p className="mt-4 text-lg text-spyn-slate-300">The biggest killer of early-stage startups is the friction in non-cash partnerships.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-spyn-slate-800/50 p-8 rounded-lg border border-spyn-slate-700">
                        <h3 className="text-2xl font-bold text-spyn-gold-400 mb-4">For Founders</h3>
                        <p className="text-spyn-slate-200">
                           Lack capital for competitive salaries, yet <span className="font-bold text-white">65% of startups fail due to co-founder conflicts</span>. You're forced into high-risk agreements, unable to afford traditional legal counsel estimated at <span className="font-bold text-white">$2,500-$5,000 per agreement</span>.
                        </p>
                    </div>
                    <div className="bg-spyn-slate-800/50 p-8 rounded-lg border border-spyn-slate-700">
                        <h3 className="text-2xl font-bold text-spyn-gold-400 mb-4">For Professionals</h3>
                        <p className="text-spyn-slate-200">
                            You're willing to work for equity, but fear the 'Risk Tax': non-payment, IP theft, and vague contracts. This friction wastes <span className="font-bold text-white">20+ hours per month</span> vetting bad opportunities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Solution Section */}
            <div className="space-y-12">
                 <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">The SPYN Solution: A Legal Governance Layer</h2>
                    <p className="mt-4 text-lg text-spyn-slate-300">Three core, integrated features to provide security and clarity.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard 
                        title="SPYN Match"
                        description="AI-powered matching tool using structured questionnaires to align founders and talent based on skills, risk tolerance, and equity expectations, saving time and energy."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                    />
                    <FeatureCard 
                        title="SPYN Legal Framework"
                        description="Proprietary digital library of legally vetted, templated agreements (NDAs, SAFEs, EFS Contracts) customized and executed on-platform, eliminating the $2,500-$5,000 cost of bespoke legal work."
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    />
                    <FeatureCard 
                        title="SPYN Governance"
                        description="Built-in vesting and IP assignment schedule manager that automatically handles legal transfer of IP upon reaching milestones, providing unprecedented security and clarity."
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
