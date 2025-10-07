import React, { useState } from 'react';
import { PRICING_FAQS } from '../constants';

const CheckIcon: React.FC = () => (
    <svg className="h-6 w-6 text-spyn-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const PricingCard: React.FC<{
    tier: string;
    price: string;
    priceDetail: string;
    description: string;
    features: string[];
    ctaText: string;
    isFeatured?: boolean;
}> = ({ tier, price, priceDetail, description, features, ctaText, isFeatured }) => {
    const cardClasses = isFeatured 
        ? "bg-spyn-slate-800 border-2 border-spyn-teal-500 shadow-2xl" 
        : "bg-spyn-slate-800/50 border border-spyn-slate-700";

    const buttonClasses = isFeatured
        ? "bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white"
        : "bg-spyn-slate-700 hover:bg-spyn-slate-600 text-white";
    
    return (
        <div className={`relative p-8 rounded-2xl ${cardClasses} flex flex-col`}>
            {isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 text-sm font-semibold tracking-wide text-white bg-spyn-teal-600 rounded-full">
                        Most Popular
                    </span>
                </div>
            )}
            <h3 className="text-lg font-semibold leading-8 text-white">{tier}</h3>
            <p className="mt-4 text-sm leading-6 text-spyn-slate-300">{description}</p>
            <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">{price}</span>
                <span className="text-sm font-semibold leading-6 text-spyn-slate-300">{priceDetail}</span>
            </p>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-spyn-slate-300">
                {features.map(feature => (
                    <li key={feature} className="flex gap-x-3">
                        <CheckIcon />
                        {feature}
                    </li>
                ))}
            </ul>
            <a href="#" className={`mt-auto block w-full text-center ${buttonClasses} font-semibold py-2.5 px-4 rounded-md transition-colors mt-8`}>
                {ctaText}
            </a>
        </div>
    );
};

const FaqItem: React.FC<{
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}> = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-spyn-slate-700">
        <button
            onClick={onClick}
            className="flex justify-between items-center w-full py-5 text-left"
        >
            <span className="text-lg font-medium text-spyn-slate-100">{question}</span>
            <svg
                className={`w-6 h-6 text-spyn-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
            <p className="pb-5 pr-4 text-spyn-slate-300">{answer}</p>
        </div>
    </div>
);


const PricingView: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleFaqToggle = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="py-12 space-y-24">
            <div>
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-spyn-teal-400">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Plans for Every Stage of Your Partnership Journey
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-spyn-slate-300">
                    From initial discovery to secured partnership, our Freemium-to-Transaction model ensures you only pay for what you need.
                </p>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    <PricingCard 
                        tier="Basic"
                        price="$0"
                        priceDetail=""
                        description="For founders and professionals to explore opportunities and connect."
                        features={[
                            'Profile creation & management',
                            'Basic project browsing',
                            'Limited communication capabilities',
                            'Access to Standard NDA template'
                        ]}
                        ctaText="Get Started for Free"
                    />
                    <PricingCard 
                        tier="Founder Premium"
                        price="$29"
                        priceDetail="/month"
                        description="For the serious, committed founder ready to build their team."
                        features={[
                            'Everything in Basic, plus:',
                            'Advanced AI-matching',
                            'Detailed project analytics',
                            'Full access to collaboration tools',
                            'Discounted transactional fees'
                        ]}
                        ctaText="Upgrade to Premium"
                        isFeatured
                    />
                    <PricingCard 
                        tier="Professional Verified"
                        price="$49"
                        priceDetail="/year"
                        description="For skilled professionals who want to stand out and build trust."
                        features={[
                            'Everything in Basic, plus:',
                            'Prominent "SPYN Certified" badge',
                            'Background & skill verification',
                            'Early access to high-potential projects',
                            'Full communication access'
                        ]}
                        ctaText="Become Verified"
                    />
                </div>
            </div>

            <div className="bg-spyn-slate-800/50 border border-spyn-slate-700 rounded-2xl p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-1 flex justify-center">
                         <div className="flex items-center justify-center w-24 h-24 bg-spyn-teal-900/50 border-2 border-spyn-teal-700 rounded-full">
                            <svg className="h-12 w-12 text-spyn-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-white">Our Fair & Transparent Transaction Fees</h3>
                        <p className="mt-4 text-spyn-slate-300">
                            Our success is tied to yours. We charge a small, success-based fee only when you successfully secure a partnership using our Premium contract templates. This means we only make money when you form a meaningful, legally-sound partnership.
                        </p>
                        <p className="mt-4 text-sm text-spyn-slate-400">
                           <span className="font-semibold text-spyn-teal-400">2.5% fee</span> on Premium contract execution. No fees for Standard contracts. No hidden charges.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                 <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                       Frequently Asked Questions
                    </h2>
                </div>
                 <div className="mt-8 max-w-3xl mx-auto">
                    {PRICING_FAQS.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFaqIndex === index}
                            onClick={() => handleFaqToggle(index)}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default PricingView;