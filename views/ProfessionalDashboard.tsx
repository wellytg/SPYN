import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';
import VestingTimeline from '../components/VestingTimeline';
import { DUMMY_PROJECTS, DUMMY_FOUNDERS, LEGAL_CLAUSE, CURRENT_PROFESSIONAL, DUMMY_APPLICATIONS, DUMMY_ACTIVITY, DUMMY_INCOMING_MESSAGES, DUMMY_SENT_MESSAGES } from '../constants';
import { explainLegalClause } from '../services/geminiService';
import type { Project, Application, ActivityLog, Message, FounderProfile } from '../types';

// Helper function to generate a random match percentage
const generateMatchScore = (founderId: string) => {
    let hash = 0;
    for (let i = 0; i < founderId.length; i++) {
        const char = founderId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; 
    }
    return 80 + (Math.abs(hash) % 20);
};


const ProfileOverview: React.FC = () => (
    <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-semibold text-white">Profile Overview</h3>
                 {CURRENT_PROFESSIONAL.verified && (
                    <div className="mt-2 flex items-center gap-x-2 px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-300 w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        SPYN Certified Professional
                    </div>
                 )}
            </div>
            <button className="bg-spyn-slate-700 hover:bg-spyn-slate-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                Edit Profile
            </button>
        </div>
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-spyn-slate-300">Profile Completion</span>
                    <span className="font-semibold text-white">{CURRENT_PROFESSIONAL.profileCompletion}%</span>
                </div>
                <div className="w-full bg-spyn-slate-700 rounded-full h-2.5">
                    <div className="bg-spyn-teal-500 h-2.5 rounded-full" style={{ width: `${CURRENT_PROFESSIONAL.profileCompletion}%` }}></div>
                </div>
            </div>
            <div>
                 <p className="text-sm text-spyn-slate-300 mb-2">Listed Skills</p>
                 <div className="flex flex-wrap gap-2">
                    {CURRENT_PROFESSIONAL.skills.map(skill => (
                        <span key={skill} className="bg-spyn-slate-700 text-spyn-slate-200 px-2 py-1 text-xs rounded-md">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
        <div className="mt-auto pt-4 border-t border-spyn-slate-700/50">
            <button className="w-full text-center bg-spyn-slate-700 hover:bg-spyn-slate-600 text-white text-sm font-semibold py-2 px-3 rounded-md transition-colors flex items-center justify-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                View My Public Profile
            </button>
        </div>
    </div>
);

const ActiveApplications: React.FC<{ applications: Application[] }> = ({ applications }) => (
     <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 h-full">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Active Applications</h3>
             <button className="bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                Find New Opportunities
            </button>
        </div>
        <div className="space-y-3">
           <table className="w-full text-sm text-left text-spyn-slate-300">
                <thead className="text-xs text-spyn-slate-400 uppercase">
                    <tr>
                        <th scope="col" className="pb-2">Company</th>
                        <th scope="col" className="pb-2">Stage</th>
                        <th scope="col" className="pb-2 text-right">Equity</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(app => (
                         <tr key={app.id} className="border-b border-spyn-slate-700">
                            <td className="py-2 font-semibold text-white">{app.company}</td>
                            <td>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${app.stage === 'Contract Review' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                    {app.stage}
                                </span>
                            </td>
                            <td className="text-right font-medium text-white">{app.equity}</td>
                        </tr>
                    ))}
                </tbody>
           </table>
        </div>
    </div>
);

const ProfessionalMatches: React.FC<{ founders: FounderProfile[] }> = ({ founders }) => (
    <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 h-full">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">Professional Matches (AI)</h3>
            <button className="text-spyn-teal-400 hover:text-spyn-teal-300 text-sm font-semibold">
                View All
            </button>
        </div>
        <div className="space-y-4">
            {founders.slice(0, 3).map(founder => (
                <div key={founder.id} className="flex items-center justify-between p-3 bg-spyn-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <img src={founder.avatar} alt={founder.company} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-white">{founder.company}</p>
                            <p className="text-xs text-spyn-slate-400">{founder.looking_for[0]}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-spyn-teal-400">{generateMatchScore(founder.id)}%</p>
                        <p className="text-xs text-spyn-slate-400">Match</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const RecentActivity: React.FC<{ activities: ActivityLog[] }> = ({ activities }) => (
    <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 h-full">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
            {activities.map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                    <img src={activity.avatar} alt={activity.actor} className="w-8 h-8 rounded-full mt-1" />
                    <div>
                        <p className="text-sm text-spyn-slate-200">
                            <span className="font-semibold text-white">{activity.actor}</span> {activity.action} <span className="font-semibold text-white">{activity.target}</span>.
                        </p>
                        <p className="text-xs text-spyn-slate-400">{activity.timestamp}</p>
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
                {messages.map(message => (
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


const ProfessionalDashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
    const [selectedProjectForLegal, setSelectedProjectForLegal] = useState<Project | null>(null);
    const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

    const handleExplainClause = async () => {
        setIsModalOpen(true);
        setIsLoading(true);
        setExplanation('');
        const result = await explainLegalClause(LEGAL_CLAUSE);
        setExplanation(result);
        setIsLoading(false);
    };
    
    const handleViewLegal = (project: Project) => {
        setSelectedProjectForLegal(project);
        setIsLegalModalOpen(true);
    };

    const handleToggleExpand = (projectId: number) => {
        setExpandedProjectId(prevId => (prevId === projectId ? null : projectId));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-baseline">
                <h2 className="text-3xl font-bold text-white">Professional Dashboard</h2>
                <p className="text-spyn-slate-300">Welcome back, {CURRENT_PROFESSIONAL.name}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <DashboardCard 
                    title="Total Vested Equity Value" 
                    value="$125,400" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                    colorClass="bg-spyn-teal-600"
                />
                 <DashboardCard 
                    title="Active Secured Contracts" 
                    value={DUMMY_PROJECTS.length}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                    colorClass="bg-blue-600"
                />
                 <DashboardCard 
                    title="Partnership Health Score" 
                    value="92%" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
                    colorClass="bg-purple-600"
                />
                <DashboardCard 
                    title="Profile Views (7d)" 
                    value="142" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    colorClass="bg-red-600"
                />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileOverview />
                        <ActiveApplications applications={DUMMY_APPLICATIONS} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <ProfessionalMatches founders={DUMMY_FOUNDERS} />
                         <RecentActivity activities={DUMMY_ACTIVITY} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 space-y-6">
                    <Messages incoming={DUMMY_INCOMING_MESSAGES} sent={DUMMY_SENT_MESSAGES} />
                </div>
            </div>


            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Current Secured Projects</h3>
                <div className="space-y-6">
                    {DUMMY_PROJECTS.map(project => {
                        const isExpanded = expandedProjectId === project.id;
                        return (
                            <div key={project.id} className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700">
                               <div className="flex justify-between items-start cursor-pointer" onClick={() => handleToggleExpand(project.id)}>
                                    <div>
                                        <h4 className="text-lg font-bold text-spyn-teal-400">{project.name}</h4>
                                        <p className="text-sm text-spyn-slate-400">with {project.founder}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${project.status === 'Contract Secured' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                                            {project.status}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-spyn-slate-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                               </div>
                               <VestingTimeline project={project} />

                               <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="border-t border-spyn-slate-700/50 pt-6">
                                        <h5 className="font-semibold text-spyn-slate-200 mb-2">Project Details</h5>
                                        <p className="text-sm text-spyn-slate-300 mb-4">{project.description}</p>
                                        
                                        <h5 className="font-semibold text-spyn-slate-200 mb-2">Key Performance Indicators</h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {project.kpis.map(kpi => (
                                                <div key={kpi.name} className="bg-spyn-slate-900/70 p-3 rounded-md border border-spyn-slate-700">
                                                    <p className="text-xs text-spyn-slate-400">{kpi.name}</p>
                                                    <p className="font-semibold text-spyn-slate-100">{kpi.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                               </div>

                               <div className="mt-6 flex items-center space-x-4">
                                   <button 
                                        onClick={() => handleViewLegal(project)}
                                        className="flex-1 text-center bg-spyn-slate-700 hover:bg-spyn-slate-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                                   >
                                      View Legal Agreement
                                   </button>
                                   <button onClick={handleExplainClause} className="flex-1 text-center bg-spyn-gold-600 hover:bg-spyn-gold-500 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                      Explain IP Clause (AI)
                                   </button>
                               </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="AI Legal Clause Explainer">
                <div className="space-y-4">
                    <p className="text-sm text-spyn-slate-400 font-mono p-4 bg-spyn-slate-900 rounded-md">{LEGAL_CLAUSE}</p>
                    <div className="border-t border-spyn-slate-700 pt-4">
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <div>
                                <h4 className="font-semibold text-spyn-teal-400 mb-2">Plain Language Summary:</h4>
                                <p className="text-spyn-slate-200">{explanation}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
            
            {selectedProjectForLegal && (
                <Modal 
                    isOpen={isLegalModalOpen} 
                    onClose={() => setIsLegalModalOpen(false)} 
                    title={`Legal Agreement: ${selectedProjectForLegal.name}`}
                >
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-spyn-slate-200">Intellectual Property Assignment</h3>
                        <p className="text-sm text-spyn-slate-300 font-mono whitespace-pre-wrap p-4 bg-spyn-slate-900 rounded-md">
                            {LEGAL_CLAUSE}
                        </p>
                         <div className="border-t border-spyn-slate-700 pt-4 mt-4">
                            <button
                                onClick={() => {
                                    setIsLegalModalOpen(false);
                                    handleExplainClause();
                                }}
                                className="w-full text-center bg-spyn-gold-600 hover:bg-spyn-gold-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                            >
                                Explain This Clause (AI)
                            </button>
                        </div>
                        <p className="text-xs text-spyn-slate-400 pt-4">
                            This is a standardized template for illustrative purposes. All agreements executed on the SPYN platform are legally binding.
                        </p>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ProfessionalDashboard;