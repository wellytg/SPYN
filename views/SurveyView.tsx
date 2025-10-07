
import React, { useState } from 'react';
import { SURVEY_QUESTIONS } from '../constants';
import { analyzeSurveyResponse } from '../services/geminiService';
import Spinner from '../components/Spinner';
import type { SurveyQuestion } from '../types';

const SurveyCard: React.FC<{
    question: SurveyQuestion;
    onSelect: (id: string, option: string) => void;
    selectedOption?: string;
}> = ({ question, onSelect, selectedOption }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState('');

    const handleAnalyze = async () => {
        if (!selectedOption) return;
        setIsLoading(true);
        setAnalysis('');
        const result = await analyzeSurveyResponse(question.question, selectedOption);
        setAnalysis(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700">
            <h3 className="text-lg font-semibold text-spyn-teal-400 mb-4">{question.question}</h3>
            <div className="space-y-3">
                {question.options.map(option => (
                    <button
                        key={option}
                        onClick={() => {
                            onSelect(question.id, option);
                            setAnalysis('');
                        }}
                        className={`w-full text-left p-3 rounded-md transition-colors duration-200 border ${
                            selectedOption === option
                                ? 'bg-spyn-teal-600 border-spyn-teal-500 text-white'
                                : 'bg-spyn-slate-700 border-spyn-slate-600 hover:bg-spyn-slate-600'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {selectedOption && (
                <div className="mt-4">
                    {!analysis && !isLoading && (
                         <button 
                            onClick={handleAnalyze} 
                            className="w-full text-center bg-spyn-gold-600 hover:bg-spyn-gold-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            Analyze My Risk (AI)
                        </button>
                    )}
                    {isLoading && <div className="py-2"><Spinner /></div>}
                    {analysis && (
                        <div className="p-4 bg-spyn-slate-900 rounded-md border border-spyn-teal-800 animate-fade-in">
                             <h5 className="font-semibold text-spyn-teal-400 mb-2">AI Risk Analysis</h5>
                             <p className="text-sm text-spyn-slate-300">{analysis}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


const SurveyView: React.FC = () => {
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleSelect = (id: string, option: string) => {
        setAnswers(prev => ({ ...prev, [id]: option }));
    };
    
    const founderQuestions = SURVEY_QUESTIONS.filter(q => q.type === 'founder');
    const professionalQuestions = SURVEY_QUESTIONS.filter(q => q.type === 'professional');

    return (
        <div className="space-y-12 py-16">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Partnership Readiness Assessment</h2>
                <p className="mt-4 text-lg leading-8 text-spyn-slate-300">
                    Take our free digital diagnostic to identify your biggest risk factors before you start.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center text-white">For Founders & Startups</h3>
                    {founderQuestions.map(q => (
                        <SurveyCard key={q.id} question={q} onSelect={handleSelect} selectedOption={answers[q.id]} />
                    ))}
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center text-white">For Professionals & Experts</h3>
                    {professionalQuestions.map(q => (
                        <SurveyCard key={q.id} question={q} onSelect={handleSelect} selectedOption={answers[q.id]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SurveyView;
