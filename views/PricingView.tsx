import React from 'react';

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
        <div className={`p-8 rounded-2xl ${cardClasses} flex flex-col`}>
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

const PricingView: React.FC = () => {
    return (
        <div className="py-12">
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
    );
};

export default PricingView;