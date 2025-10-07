
import React, { useState, useMemo, useEffect } from 'react';
import { DUMMY_FOUNDERS } from '../constants';
import type { FounderProfile } from '../types';
import Modal from '../components/Modal';
import { generateMatchScoreAndSummary } from '../services/geminiService';
import Spinner from '../components/Spinner';

// Helper to parse equity strings like "15-20%" into a number range [15, 20]
const parseEquityRange = (equityStr: string): [number, number] => {
    const numbers = equityStr.replace('%', '').match(/\d+/g);
    if (!numbers) return [0, 0];
    if (numbers.length === 1) return [parseInt(numbers[0]), parseInt(numbers[0])];
    return [parseInt(numbers[0]), parseInt(numbers[1])];
};

const MatchmakingAssistant: React.FC<{
    filters: any;
    setFilters: (filters: any) => void;
    allSkills: string[];
    allStages: string[];
    allIndustries: string[];
    resetFilters: () => void;
}> = ({ filters, setFilters, allSkills, allStages, allIndustries, resetFilters }) => {
    
    const handleStageChange = (stage: string) => {
        const newStages = filters.stages.includes(stage)
            ? filters.stages.filter((s: string) => s !== stage)
            : [...filters.stages, stage];
        setFilters({ ...filters, stages: newStages });
    };

    const handleIndustryChange = (industry: string) => {
        const newIndustries = filters.industries.includes(industry)
            ? filters.industries.filter((i: string) => i !== industry)
            : [...filters.industries, industry];
        setFilters({ ...filters, industries: newIndustries });
    };

    return (
        <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Matchmaking Assistant</h3>
                <button onClick={resetFilters} className="text-sm text-spyn-slate-300 hover:text-white">Reset Filters</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Search and Skill */}
                <div className="space-y-4">
                     <input
                        type="text"
                        placeholder="Search by company or keyword..."
                        value={filters.searchQuery}
                        onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                        className="bg-spyn-slate-700 border border-spyn-slate-600 text-white placeholder-spyn-slate-400 text-sm rounded-lg focus:ring-spyn-teal-500 focus:border-spyn-teal-500 block w-full p-2.5 transition-colors"
                    />
                    <select value={filters.skill} onChange={(e) => setFilters({ ...filters, skill: e.target.value })} className="bg-spyn-slate-700 border border-spyn-slate-600 text-white text-sm rounded-lg focus:ring-spyn-teal-500 focus:border-spyn-teal-500 block w-full p-2.5 transition-colors">
                        <option value="">Select Your Primary Skill</option>
                        {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                {/* Equity Slider */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-spyn-slate-300">Desired Equity Range: <span className="font-bold text-spyn-teal-400">{filters.equity[0]}% - {filters.equity[1]}%</span></label>
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={filters.equity[0]}
                        onChange={(e) => setFilters({ ...filters, equity: [Math.min(parseInt(e.target.value), filters.equity[1]), filters.equity[1]] })}
                        className="w-full"
                    />
                    <input
                        type="range"
                        min="0"
                        max="30"
                        value={filters.equity[1]}
                        onChange={(e) => setFilters({ ...filters, equity: [filters.equity[0], Math.max(parseInt(e.target.value), filters.equity[0])] })}
                        className="w-full"
                    />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="text-sm font-medium text-spyn-slate-300 mb-2">Preferred Company Stage</h4>
                    <div className="flex flex-wrap gap-2">
                        {allStages.map(stage => (
                            <button key={stage} onClick={() => handleStageChange(stage)} className={`px-3 py-1 text-xs rounded-full border transition-colors ${filters.stages.includes(stage) ? 'bg-spyn-teal-600 border-spyn-teal-500 text-white' : 'bg-spyn-slate-700 border-spyn-slate-600 hover:bg-spyn-slate-600'}`}>
                                {stage}
                            </button>
                        ))}
                    </div>
                 </div>
                 <div>
                    <h4 className="text-sm font-medium text-spyn-slate-300 mb-2">Preferred Industry</h4>
                     <div className="flex flex-wrap gap-2">
                        {allIndustries.map(industry => (
                             <button key={industry} onClick={() => handleIndustryChange(industry)} className={`px-3 py-1 text-xs rounded-full border transition-colors ${filters.industries.includes(industry) ? 'bg-spyn-teal-600 border-spyn-teal-500 text-white' : 'bg-spyn-slate-700 border-spyn-slate-600 hover:bg-spyn-slate-600'}`}>
                                {industry}
                            </button>
                        ))}
                    </div>
                 </div>
             </div>
        </div>
    );
};

const OpportunitiesView: React.FC = () => {
    const initialFilters = {
        searchQuery: '',
        skill: '',
        equity: [5, 20],
        stages: [],
        industries: [],
    };
    const [filters, setFilters] = useState<any>(initialFilters);
    const [scores, setScores] = useState<Record<string, { score: number; summary: string; isLoading: boolean }>>({});

    const allSkills = useMemo(() => [...new Set(DUMMY_FOUNDERS.flatMap(f => f.looking_for))].sort(), []);
    const allIndustries = useMemo(() => [...new Set(DUMMY_FOUNDERS.map(f => f.industry))].sort(), []);
    const allStages = useMemo(() => [...new Set(DUMMY_FOUNDERS.map(f => f.stage))].sort(), []);
    
    const filteredOpportunities = useMemo(() => {
        let opportunities = [...DUMMY_FOUNDERS];
        
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            opportunities = opportunities.filter(o => 
                o.company.toLowerCase().includes(query) || 
                o.description.toLowerCase().includes(query) ||
                o.looking_for.some(role => role.toLowerCase().includes(query))
            );
        }

        if (filters.skill) {
             opportunities = opportunities.filter(o => o.looking_for.includes(filters.skill));
        }

        if (filters.stages.length > 0) {
            opportunities = opportunities.filter(o => filters.stages.includes(o.stage));
        }
        
        if (filters.industries.length > 0) {
            opportunities = opportunities.filter(o => filters.industries.includes(o.industry));
        }

        const [minDesired, maxDesired] = filters.equity;
        opportunities = opportunities.filter(o => {
            const [minOffered, maxOffered] = parseEquityRange(o.equity_offered);
            return Math.max(minOffered, minDesired) <= Math.min(maxOffered, maxDesired);
        });

        return opportunities;
    }, [filters]);
    
    // Invalidate scores when matching criteria change
    const { searchQuery, ...matchFilters } = filters;
    const matchFiltersKey = useMemo(() => JSON.stringify(matchFilters), [matchFilters]);

    useEffect(() => {
        setScores({});
    }, [matchFiltersKey]);

    // Debounced effect to fetch scores for visible opportunities
    useEffect(() => {
        const handler = setTimeout(() => {
            const professionalPreferences = `Primary Skill: ${filters.skill || 'Any'}. Desired Equity: ${filters.equity[0]}-${filters.equity[1]}%. Preferred Stages: ${filters.stages.join(', ') || 'Any'}. Preferred Industries: ${filters.industries.join(', ') || 'Any'}.`;

            filteredOpportunities.forEach(opp => {
                if (!scores[opp.id]) { // Fetch only if we don't have a score for this opp
                    setScores(prev => ({ ...prev, [opp.id]: { score: 0, summary: '', isLoading: true } }));

                    const founderProfile = `Company: ${opp.company}, Industry: ${opp.industry}, Stage: ${opp.stage}, Description: ${opp.description}, Equity Offered: ${opp.equity_offered}, Looking for: ${opp.looking_for.join(', ')}`;
                    
                    generateMatchScoreAndSummary(founderProfile, professionalPreferences).then(result => {
                        setScores(prev => ({ ...prev, [opp.id]: { ...result, isLoading: false } }));
                    }).catch(() => {
                        setScores(prev => ({ ...prev, [opp.id]: { score: 0, summary: 'Error fetching score.', isLoading: false } }));
                    });
                }
            });
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(handler);
        };
    }, [filteredOpportunities, scores, filters.equity, filters.industries, filters.skill, filters.stages]);

    const opportunitiesWithScores = useMemo(() => {
        return filteredOpportunities
            .map(opp => ({
                ...opp,
                matchScore: scores[opp.id]?.score,
                matchSummary: scores[opp.id]?.summary,
                isLoadingScore: scores[opp.id]?.isLoading ?? true, // If no entry, it's loading
            }))
            .sort((a, b) => (b.matchScore ?? -1) - (a.matchScore ?? -1));
    }, [filteredOpportunities, scores]);

    const [selectedOpp, setSelectedOpp] = useState<FounderProfile | null>(null);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Find Your Next Venture</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-spyn-slate-300">
                    Use the Matchmaking Assistant to find your ideal equity-based opportunity.
                </p>
            </div>

            <MatchmakingAssistant 
                filters={filters}
                setFilters={setFilters}
                allSkills={allSkills}
                allStages={allStages}
                allIndustries={allIndustries}
                resetFilters={() => setFilters(initialFilters)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunitiesWithScores.length > 0 ? opportunitiesWithScores.map(opp => (
                    <div key={opp.id} className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 flex flex-col space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <img src={opp.avatar} alt={opp.company} className="w-12 h-12 rounded-full" />
                                <div>
                                    <h3 className="font-bold text-lg text-spyn-teal-400">{opp.company}</h3>
                                    <p className="text-sm text-spyn-slate-400">{opp.industry}</p>
                                </div>
                            </div>
                             <div className="flex items-center space-x-1 text-spyn-gold-400 font-bold">
                                <span>{opp.rating.toFixed(1)}★</span>
                            </div>
                        </div>

                         <div className="space-y-2">
                            <div className="flex justify-between items-center min-h-[28px]">
                                <p className="text-sm font-semibold text-spyn-teal-400">AI Match Score</p>
                                {opp.isLoadingScore ? (
                                    <Spinner />
                                ) : (
                                   <p className="font-bold text-lg text-spyn-teal-400">{opp.matchScore}%</p>
                                )}
                            </div>
                            <div className="w-full bg-spyn-slate-700 rounded-full h-1.5">
                                <div className="bg-spyn-teal-500 h-1.5 rounded-full" style={{width: `${opp.matchScore ?? 0}%`}}></div>
                            </div>
                            {opp.matchSummary && !opp.isLoadingScore && (
                                <p className="text-xs text-spyn-slate-400 pt-1 h-8 overflow-hidden italic">"{opp.matchSummary}"</p>
                            )}
                         </div>
                        
                        <p className="text-sm text-spyn-slate-300 flex-grow pt-2 border-t border-spyn-slate-700">{opp.description.substring(0, 100)}...</p>

                        <div className="grid grid-cols-2 gap-3 text-center">
                            <div>
                                <p className="text-xs text-spyn-slate-400">Equity Offered</p>
                                <p className="font-semibold text-white">{opp.equity_offered}</p>
                            </div>
                             <div>
                                <p className="text-xs text-spyn-slate-400">Stage</p>
                                <p className="font-semibold text-white">{opp.stage}</p>
                            </div>
                        </div>
                        
                        <div className="pt-2">
                            <button 
                                onClick={() => setSelectedOpp(opp)}
                                className="w-full text-center bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                            >
                                View Details & Apply
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center py-12 bg-spyn-slate-800 rounded-lg">
                        <h3 className="text-xl text-white">No Opportunities Match Your Criteria</h3>
                        <p className="text-spyn-slate-400 mt-2">Try adjusting your filters in the Matchmaking Assistant.</p>
                    </div>
                )}
            </div>

            {selectedOpp && (
                <Modal isOpen={!!selectedOpp} onClose={() => setSelectedOpp(null)} title={`Opportunity at ${selectedOpp.company}`}>
                    <div className="space-y-4 text-spyn-slate-300">
                        <p>{selectedOpp.description}</p>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-spyn-slate-900 rounded-lg border border-spyn-slate-700">
                             <div><strong className="text-spyn-slate-100">Industry:</strong> {selectedOpp.industry}</div>
                             <div><strong className="text-spyn-slate-100">Location:</strong> {selectedOpp.location}</div>
                             <div><strong className="text-spyn-slate-100">Stage:</strong> {selectedOpp.stage}</div>
                             <div><strong className="text-spyn-slate-100">Funding Raised:</strong> {selectedOpp.funding_raised}</div>
                             <div><strong className="text-spyn-slate-100">Team Size:</strong> {selectedOpp.team_size}</div>
                             <div><strong className="text-spyn-slate-100">Revenue:</strong> {selectedOpp.revenue}</div>
                             <div className="col-span-2"><strong className="text-spyn-slate-100">Equity Offered:</strong> {selectedOpp.equity_offered}</div>
                             <div className="col-span-2"><strong className="text-spyn-slate-100">Vesting:</strong> {selectedOpp.vesting}</div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-spyn-teal-400 mb-2">Ideal Candidate Roles:</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedOpp.looking_for.map(role => (
                                    <span key={role} className="bg-spyn-slate-700 text-spyn-slate-200 px-3 py-1 text-sm rounded-md">{role}</span>
                                ))}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-spyn-slate-700">
                             <button className="w-full text-center bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                Apply to this Opportunity
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

        </div>
    );
};

export default OpportunitiesView;
