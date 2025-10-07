import React, { useState } from 'react';
import { CONTRACT_TEMPLATES } from '../constants';
import { explainLegalClause } from '../services/geminiService';
import type { ContractTemplate } from '../types';
import Modal from '../components/Modal';
import Spinner from '../components/Spinner';

const ContractCard: React.FC<{
    template: ContractTemplate;
    isExpanded: boolean;
    onToggle: () => void;
    onExplain: (clause: string) => void;
}> = ({ template, isExpanded, onToggle, onExplain }) => {
    return (
        <div className="bg-spyn-slate-800 rounded-lg border border-spyn-slate-700 overflow-hidden">
            <div className="p-6 cursor-pointer flex justify-between items-center" onClick={onToggle}>
                <div>
                    <h4 className="text-lg font-bold text-spyn-teal-400">{template.name}</h4>
                    <p className="text-sm text-spyn-slate-400">{template.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                    {template.price !== null && (
                         <span className="text-xl font-bold text-white">${template.price}</span>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-spyn-slate-400 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 border-t border-spyn-slate-700/50 pt-4">
                    <p className="text-sm text-spyn-slate-300 font-mono whitespace-pre-wrap p-4 bg-spyn-slate-900 rounded-md mb-4">
                        {template.legalText}
                    </p>
                    <div className="flex items-center space-x-4">
                        {template.price !== null ? (
                             <button className="flex-1 text-center bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                                Purchase & Execute for ${template.price}
                             </button>
                        ) : (
                            <button className="flex-1 text-center bg-spyn-slate-600 text-white font-semibold py-2 px-4 rounded-md cursor-not-allowed">
                                Included with Plan
                             </button>
                        )}
                        <button 
                            onClick={() => onExplain(template.legalText)}
                            className="flex-1 text-center bg-spyn-gold-600 hover:bg-spyn-gold-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            Explain This Clause (AI)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContractsView: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [clauseToExplain, setClauseToExplain] = useState('');

    const handleToggle = (id: string) => {
        setExpandedId(prevId => (prevId === id ? null : id));
    };

    const handleExplainClause = async (clause: string) => {
        setClauseToExplain(clause);
        setIsModalOpen(true);
        setIsLoading(true);
        setExplanation('');
        const result = await explainLegalClause(clause);
        setExplanation(result);
        setIsLoading(false);
    };

    const standardContracts = CONTRACT_TEMPLATES.filter(c => c.category === 'Standard');
    const premiumContracts = CONTRACT_TEMPLATES.filter(c => c.category === 'Premium');

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">SPYN Legal Framework</h2>
                <p className="mt-4 text-lg leading-8 text-spyn-slate-300">
                    Access legally-vetted, templated agreements to secure your partnerships, eliminating thousands in traditional legal fees.
                </p>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Standard Templates</h3>
                    <div className="space-y-4">
                        {standardContracts.map(template => (
                            <ContractCard
                                key={template.id}
                                template={template}
                                isExpanded={expandedId === template.id}
                                onToggle={() => handleToggle(template.id)}
                                onExplain={handleExplainClause}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Premium Templates</h3>
                     <div className="space-y-4">
                        {premiumContracts.map(template => (
                            <ContractCard
                                key={template.id}
                                template={template}
                                isExpanded={expandedId === template.id}
                                onToggle={() => handleToggle(template.id)}
                                onExplain={handleExplainClause}
                            />
                        ))}
                    </div>
                </div>
            </div>

             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="AI Legal Clause Explainer">
                <div className="space-y-4">
                    <p className="text-sm text-spyn-slate-400 font-mono p-4 bg-spyn-slate-900 rounded-md">{clauseToExplain}</p>
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
        </div>
    );
};

export default ContractsView;