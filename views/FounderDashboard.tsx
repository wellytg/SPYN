import React, { useState, useMemo } from 'react';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import { DUMMY_PROFESSIONALS, DUMMY_COMPANY_PROFILE, DUMMY_ROADMAP, DUMMY_INCOMING_MESSAGES, DUMMY_SENT_MESSAGES } from '../constants';
import { generateCompatibilitySummary } from '../services/geminiService';
import type { ProfessionalProfile, CompanyProfile, RoadmapPhase, Message } from '../types';

const PieChart: React.FC<{ data: { name: string; value: number; color: string }[] }> = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulative = 0;

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
            {data.map(item => {
                const percent = item.value / total;
                const [startX, startY] = getCoordinatesForPercent(cumulative);
                cumulative += percent;
                const [endX, endY] = getCoordinatesForPercent(cumulative);
                const largeArcFlag = percent > 0.5 ? 1 : 0;
                
                const pathData = [
                    `M ${startX} ${startY}`, // Move
                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                    `L 0 0`, // Line to center
                ].join(' ');

                return <path key={item.name} d={pathData} fill={item.color} />;
            })}
        </svg>
    );
};

const EquityDistributionCard: React.FC<{ profile: CompanyProfile }> = ({ profile }) => {
    const equityData = [
        { name: 'Founders', value: profile.equityDistribution.founders, color: '#0d9488' }, // teal-600
        { name: 'ESOP', value: profile.equityDistribution.esop, color: '#0f766e' }, // teal-700
        { name: 'Investors', value: profile.equityDistribution.investors, color: '#115e59' }, // teal-800
    ];

    return (
        <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 h-full">
            <h3 className="text-xl font-semibold text-white mb-4">Equity Distribution</h3>
            <div className="flex items-center space-x-4">
                <div className="w-24 h-24 flex-shrink-0">
                    <PieChart data={equityData} />
                </div>
                <div className="space-y-2 text-sm">
                    {equityData.map(item => (
                        <div key={item.name} className="flex items-center">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                            <span className="text-spyn-slate-300">{item.name}:</span>
                            <span className="font-semibold text-white ml-auto">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CompanySetupCard: React.FC<{ profile: CompanyProfile }> = ({ profile }) => {
    const [budgetMode, setBudgetMode] = useState(profile.budgetMode);
    return (
        <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Company Setup</h3>
                <button className="bg-spyn-slate-700 hover:bg-spyn-slate-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                    Edit Hires
                </button>
            </div>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-spyn-slate-300 mb-2">Required Hires</p>
                    <div className="space-y-2">
                        {profile.requiredHires.map(hire => (
                            <div key={hire.role} className="p-2 bg-spyn-slate-700/50 rounded-md text-sm">
                                <p className="font-semibold text-white">{hire.role}</p>
                                <p className="text-xs text-spyn-slate-400">{hire.skills.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center border-t border-spyn-slate-700 pt-4">
                    <label htmlFor="budget-mode" className="text-sm font-medium text-spyn-slate-300">Budget Mode</label>
                    <button onClick={() => setBudgetMode(!budgetMode)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${budgetMode ? 'bg-spyn-teal-600' : 'bg-spyn-slate-600'}`}>
                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${budgetMode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProjectRoadmap: React.FC<{ roadmap: RoadmapPhase[] }> = ({ roadmap }) => (
    <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700">
        <h3 className="text-xl font-semibold text-white mb-4">Project Roadmap & Hiring Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmap.map(phase => (
                <div key={phase.id} className={`p-4 rounded-lg border ${phase.status === 'completed' ? 'bg-spyn-slate-700/50 border-spyn-slate-600' : phase.status === 'inprogress' ? 'bg-spyn-teal-900/50 border-spyn-teal-700' : 'bg-spyn-slate-800/50 border-spyn-slate-700'}`}>
                    <p className="text-xs font-bold uppercase tracking-wider text-spyn-slate-400">{phase.duration}</p>
                    <p className="font-semibold text-white mt-1">{phase.name}</p>
                    <div className="mt-3">
                        <p className="text-xs text-spyn-slate-300 mb-1">Critical Skills Needed:</p>
                        <div className="flex flex-wrap gap-1">
                            {phase.requiredSkills.slice(0, 2).map(skill => (
                                <span key={skill} className="bg-spyn-slate-600 text-spyn-slate-300 px-1.5 py-0.5 text-[10px] rounded-md">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-spyn-slate-300">Hiring Progress</span>
                            <span className="font-semibold text-white">{phase.hiringProgress.matched}/{phase.hiringProgress.needed}</span>
                        </div>
                        <div className="w-full bg-spyn-slate-700 rounded-full h-1.5">
                            <div className="bg-spyn-teal-500 h-1.5 rounded-full" style={{ width: `${(phase.hiringProgress.matched / phase.hiringProgress.needed) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Messages: React.FC<{ incoming: Message[]; sent: Message[] }> = ({ incoming, sent }) => {
    const [activeTab, setActiveTab] = useState<'incoming' | 'sent'>('incoming');
    const messages = activeTab === 'incoming' ? incoming : sent;

    return (
        <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 h-full">
            <div className="flex justify-between items-center mb-4">
                 <h3 className="text-xl font-semibold text-white">Messages</h3>
                 <div className="flex space-x-1 bg-spyn-slate-700 p-1 rounded-lg">
                    <button onClick={() => setActiveTab('incoming')} className={`px-3 py-1 text-sm rounded-md transition ${activeTab === 'incoming' ? 'bg-spyn-slate-900 text-white' : 'text-spyn-slate-300'}`}>Incoming</button>
                    <button onClick={() => setActiveTab('sent')} className={`px-3 py-1 text-sm rounded-md transition ${activeTab === 'sent' ? 'bg-spyn-slate-900 text-white' : 'text-spyn-slate-300'}`}>Sent</button>
                 </div>
            </div>
            <div className="space-y-4">
                {messages.slice(0, 4).map(message => (
                     <div key={message.id} className="flex items-start space-x-3">
                        <img src={message.avatar} alt={message.partnerName} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <div className="flex justify-between items-baseline">
                                <p className="font-semibold text-white">{message.partnerName}</p>
                                <p className="text-xs text-spyn-slate-400">{message.timestamp}</p>
                            </div>
                            <p className="text-sm text-spyn-slate-300 truncate">{message.snippet}</p>
                        </div>
                         {message.status === 'Unread' && activeTab === 'incoming' && (
                            <div className="w-2.5 h-2.5 bg-spyn-teal-400 rounded-full mt-1.5"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProfessionalMatches: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessional, setSelectedProfessional] = useState<ProfessionalProfile | null>(null);
    const [compatibility, setCompatibility] = useState<Record<string, string | null>>({});
    const [loadingCompatibility, setLoadingCompatibility] = useState<Record<string, boolean>>({});
    
    const [searchQuery, setSearchQuery] = useState('');
    const [skillFilter, setSkillFilter] = useState('');
    const [sortOption, setSortOption] = useState('rating_desc');

    const handleInitiateContract = (professional: ProfessionalProfile) => {
        setSelectedProfessional(professional);
        setIsModalOpen(true);
    };
    
    const handleGenerateCompatibility = async (professional: ProfessionalProfile) => {
        setLoadingCompatibility(prev => ({ ...prev, [professional.id]: true }));
        setCompatibility(prev => ({ ...prev, [professional.id]: null }));
        const founderNeed = "Need Lead Architect for 6 months, 2% Equity offer";
        const result = await generateCompatibilitySummary(founderNeed, professional.description);
        setCompatibility(prev => ({ ...prev, [professional.id]: result }));
        setLoadingCompatibility(prev => ({ ...prev, [professional.id]: false }));
    };

    const allSkills = useMemo(() => [...new Set(DUMMY_PROFESSIONALS.flatMap(p => p.skills))].sort(), []);

    const filteredAndSortedProfessionals = useMemo(() => {
        let professionals = [...DUMMY_PROFESSIONALS];
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            professionals = professionals.filter(p => p.name.toLowerCase().includes(query) || p.skills.some(s => s.toLowerCase().includes(query)));
        }
        if (skillFilter) {
            professionals = professionals.filter(p => p.skills.includes(skillFilter));
        }
        professionals.sort((a, b) => sortOption === 'rating_desc' ? b.rating - a.rating : a.name.localeCompare(b.name));
        return professionals;
    }, [searchQuery, skillFilter, sortOption]);

    return (
        <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700">
             <h3 className="text-xl font-semibold text-white mb-4">Professional Matches (AI)</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-spyn-slate-700 border border-spyn-slate-600 text-white placeholder-spyn-slate-400 text-sm rounded-lg focus:ring-spyn-teal-500 focus:border-spyn-teal-500 block w-full p-2.5 transition-colors"
                />
                <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} className="bg-spyn-slate-700 border border-spyn-slate-600 text-white text-sm rounded-lg focus:ring-spyn-teal-500 focus:border-spyn-teal-500 block w-full p-2.5 transition-colors">
                    <option value="">All Skills</option>
                    {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="bg-spyn-slate-700 border border-spyn-slate-600 text-white text-sm rounded-lg focus:ring-spyn-teal-500 focus:border-spyn-teal-500 block w-full p-2.5 transition-colors">
                    <option value="rating_desc">Sort by Rating</option>
                    <option value="name_asc">Sort by Name</option>
                </select>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
                 {filteredAndSortedProfessionals.map(prof => (
                    <div key={prof.id} className="bg-spyn-slate-900/70 p-4 rounded-lg border border-spyn-slate-700 space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <img src={prof.avatar} alt={prof.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-bold text-spyn-teal-400">{prof.name}</h4>
                                    <p className="text-xs text-spyn-slate-400">{prof.title}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 text-spyn-gold-400 font-bold">
                                <span>{prof.rating.toFixed(1)}★</span>
                            </div>
                        </div>
                         <div className="flex flex-wrap gap-1">
                            {prof.skills.slice(0, 4).map(skill => <span key={skill} className="bg-spyn-slate-700 text-spyn-slate-300 px-2 py-0.5 text-xs rounded-md">{skill}</span>)}
                        </div>
                        {compatibility[prof.id] && <p className="text-xs text-spyn-slate-300 bg-spyn-slate-800 p-2 rounded-md border border-spyn-teal-800">{compatibility[prof.id]}</p>}
                        <div className="flex items-center space-x-2 pt-1">
                            <button onClick={() => handleInitiateContract(prof)} className="flex-1 text-center bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors">Initiate Contract</button>
                            <button onClick={() => handleGenerateCompatibility(prof)} disabled={loadingCompatibility[prof.id]} className="flex-1 text-center bg-spyn-slate-700 hover:bg-spyn-slate-600 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors disabled:opacity-50 flex justify-center items-center">{loadingCompatibility[prof.id] ? <Spinner /> : 'AI Match'}</button>
                        </div>
                    </div>
                 ))}
             </div>
             {selectedProfessional && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Initiate EFS Contract with ${selectedProfessional.name}`}>
                    {/* Modal content from previous version */}
                </Modal>
             )}
        </div>
    )
}

const FounderDashboard: React.FC = () => {
    const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-baseline">
                <h2 className="text-3xl font-bold text-white">Founder Dashboard</h2>
                <p className="text-spyn-slate-300">Welcome, {DUMMY_COMPANY_PROFILE.name}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <DashboardCard 
                    title="Contracts Onboarded" 
                    value={DUMMY_COMPANY_PROFILE.contractsOnboarded}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    colorClass="bg-spyn-teal-600"
                />
                 <DashboardCard 
                    title="ESOP Allocation" 
                    value={`${DUMMY_COMPANY_PROFILE.equityDistribution.esop}%`} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    colorClass="bg-blue-600"
                />
                 <DashboardCard 
                    title="Active Hires Needed" 
                    value={DUMMY_COMPANY_PROFILE.requiredHires.length}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                    colorClass="bg-purple-600"
                />
                 <DashboardCard 
                    title="Partnership Health" 
                    value="92%" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                    colorClass="bg-green-600"
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ProjectRoadmap roadmap={DUMMY_ROADMAP} />
                    <ProfessionalMatches />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <CompanySetupCard profile={DUMMY_COMPANY_PROFILE} />
                    <EquityDistributionCard profile={DUMMY_COMPANY_PROFILE} />
                    <Messages incoming={DUMMY_INCOMING_MESSAGES} sent={DUMMY_SENT_MESSAGES} />
                </div>
            </div>

            <Modal isOpen={isUsageModalOpen} onClose={() => setIsUsageModalOpen(false)} title="Contract Usage Metrics">
                 <div className="space-y-4">
                    <p className="text-spyn-slate-300">Overview of contract activity and platform engagement.</p>
                    <div className="p-4 bg-spyn-slate-900 rounded-lg border border-spyn-slate-700 space-y-2">
                        <div className="flex justify-between"><span className="text-spyn-slate-400">Total Contracts:</span><span className="font-bold text-white">5</span></div>
                        <div className="flex justify-between"><span className="text-spyn-slate-400">Standard EFS Agreements:</span><span className="font-bold text-white">3</span></div>
                        <div className="flex justify-between"><span className="text-spyn-slate-400">Premium EFS Agreements:</span><span className="font-bold text-white">2</span></div>
                         <div className="flex justify-between border-t border-spyn-slate-700 pt-2 mt-2"><span className="text-spyn-slate-400">Governance Feature Usage:</span><span className="font-bold text-spyn-teal-400">85%</span></div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FounderDashboard;