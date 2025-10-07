import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import UserManagementTable from '../components/UserManagementTable';
import ContractManagementTable from '../components/ContractManagementTable';
import { DUMMY_GOVERNANCE_LOGS, NEW_LOG_TEMPLATES, DUMMY_USERS, DUMMY_CONTRACTS } from '../constants';
import type { GovernanceLog, User, Contract } from '../types';

const LogTypeIndicator: React.FC<{ type: GovernanceLog['type'] }> = ({ type }) => {
    const baseClasses = "w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0 mt-1.5";
    switch (type) {
        case 'success':
            return <div className={`${baseClasses} bg-green-500`}></div>;
        case 'warning':
            return <div className={`${baseClasses} bg-yellow-500`}></div>;
        case 'info':
            return <div className={`${baseClasses} bg-blue-500`}></div>;
        default:
            return <div className={`${baseClasses} bg-gray-500`}></div>;
    }
};

const AdminDashboard: React.FC = () => {
    const [logs, setLogs] = useState<GovernanceLog[]>(DUMMY_GOVERNANCE_LOGS);
    const [users, setUsers] = useState<User[]>(DUMMY_USERS);
    const [contracts, setContracts] = useState<Contract[]>(DUMMY_CONTRACTS);

    useEffect(() => {
        const interval = setInterval(() => {
            const template = NEW_LOG_TEMPLATES[Math.floor(Math.random() * NEW_LOG_TEMPLATES.length)];
            const newLog: GovernanceLog = {
                id: Date.now(),
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                event: template.event,
                type: template.type,
            };

            setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 50));
        }, 3000); 

        return () => clearInterval(interval);
    }, []);
    
    const handleUpdateUserStatus = (userId: number, newStatus: 'Active' | 'Inactive') => {
        const user = users.find(u => u.id === userId);
        if (user) {
             const newLog: GovernanceLog = {
                id: Date.now(),
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                event: `User account for '${user.name}' status changed to ${newStatus}.`,
                type: newStatus === 'Active' ? 'info' : 'warning',
            };
            setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 50));
        }

        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === userId ? { ...user, status: newStatus } : user
            )
        );
    };

    const handleUpdateContractStatus = (contractId: number, newStatus: Contract['status']) => {
        const contract = contracts.find(c => c.id === contractId);
        if (contract) {
             const newLog: GovernanceLog = {
                id: Date.now(),
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                event: `Contract for '${contract.projectName}' status updated to ${newStatus}.`,
                type: newStatus === 'Executed' || newStatus === 'Completed' ? 'success' : 'info',
            };
            setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 50));
        }

        setContracts(prevContracts => 
            prevContracts.map(c => 
                c.id === contractId ? { ...c, status: newStatus } : c
            )
        );
    };

    const activeUsers = users.filter(u => u.status === 'Active').length;
    const executedContracts = contracts.filter(c => c.status === 'Executed' || c.status === 'Completed').length;
    const totalEquityManaged = contracts
        .filter(c => c.status === 'Executed' || c.status === 'Completed')
        .reduce((sum, c) => sum + c.equityPercentage, 0)
        .toFixed(2);
    const contractsUnderReview = contracts.filter(c => c.status === 'Pending Review').length;

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-white">Admin Governance Dashboard</h2>
                <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2 bg-spyn-slate-800 px-3 py-2 rounded-lg border border-spyn-slate-700">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-green-300">All Systems Operational</span>
                    </div>
                    <button disabled className="bg-spyn-gold-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.834 9.168-4.432" /></svg>
                        Broadcast Alert
                    </button>
                </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                 <DashboardCard 
                    title="Total EFS Contracts Executed" 
                    value={executedContracts}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    colorClass="bg-spyn-teal-600"
                />
                 <DashboardCard 
                    title="Total Equity Managed" 
                    value={`${totalEquityManaged}%`}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
                    colorClass="bg-blue-600"
                />
                 <DashboardCard 
                    title="Contracts Under Review" 
                    value={contractsUnderReview}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                    colorClass="bg-spyn-gold-600"
                />
                 <DashboardCard 
                    title="Total Active Users" 
                    value={activeUsers} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    colorClass="bg-purple-600"
                />
                 <DashboardCard 
                    title="Revenue (30d)" 
                    value="$4,750" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-3a7 7 0 100 14 7 7 0 000-14z" /><path d="M4 4h16v16H4z" /></svg>}
                    colorClass="bg-green-600"
                />
            </div>

            {/* Contract Management */}
            <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-4">Contract Management</h3>
                <ContractManagementTable contracts={contracts} onUpdateContractStatus={handleUpdateContractStatus} />
            </div>
            
            {/* User Management */}
            <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-4">User Management</h3>
                <UserManagementTable users={users} onUpdateUserStatus={handleUpdateUserStatus} />
            </div>

            {/* Governance Log */}
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Live Governance Event Log</h3>
                <div className="bg-spyn-slate-800 rounded-lg shadow-lg border border-spyn-slate-700 h-96 overflow-y-auto">
                    <div className="p-4 space-y-2">
                        {logs.map(log => (
                           <div key={log.id} className="flex items-start font-mono text-sm animate-fade-in">
                                <LogTypeIndicator type={log.type} />
                                <span className="text-spyn-slate-400 mr-4 whitespace-nowrap">{log.timestamp}</span>
                                <span className="text-spyn-slate-200">{log.event}</span>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;