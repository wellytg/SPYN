
import React, { useState } from 'react';
import { DUMMY_FOUNDERS, DUMMY_PROFESSIONALS } from '../constants';
import Modal from '../components/Modal';
import type { FounderProfile, ProfessionalProfile } from '../types';

const FounderCard: React.FC<{ profile: FounderProfile; onClick: () => void }> = ({ profile, onClick }) => (
  <div 
    onClick={onClick} 
    className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 hover:border-spyn-teal-500 hover:shadow-xl transition-all duration-200 cursor-pointer space-y-4"
  >
    <div className="flex items-center space-x-4">
      <img src={profile.avatar} className="w-16 h-16 rounded-full bg-spyn-slate-700" alt={profile.company} />
      <div>
        <h4 className="text-lg font-bold text-spyn-teal-400">{profile.company}</h4>
        <p className="text-sm text-spyn-slate-400">{profile.industry}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-spyn-gold-500/20 text-spyn-gold-300">
        {profile.stage}
      </span>
      {profile.verified && (
        <span className="text-xs font-semibold text-green-400">✓ SPYN Verified</span>
      )}
    </div>
    <div>
      <p className="text-xs text-spyn-slate-400 font-semibold mb-2">LOOKING FOR</p>
      <div className="flex flex-wrap gap-2">
        {profile.looking_for.slice(0, 3).map(role => (
          <span key={role} className="bg-spyn-slate-700 text-spyn-slate-300 px-2 py-1 text-xs rounded-md">{role}</span>
        ))}
      </div>
    </div>
  </div>
);

const ProfessionalCard: React.FC<{ profile: ProfessionalProfile; onClick: () => void }> = ({ profile, onClick }) => (
  <div 
    onClick={onClick} 
    className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 hover:border-spyn-teal-500 hover:shadow-xl transition-all duration-200 cursor-pointer space-y-4"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-4">
        <img src={profile.avatar} className="w-16 h-16 rounded-full bg-spyn-slate-700" alt={profile.name} />
        <div>
          <h4 className="text-lg font-bold text-spyn-teal-400">{profile.name}</h4>
          <p className="text-sm text-spyn-slate-400">{profile.title}</p>
        </div>
      </div>
      <div className="flex items-center space-x-1 text-spyn-gold-400 font-bold">
        <span>{profile.rating.toFixed(1)}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </div>
    <div>
      <p className="text-xs text-spyn-slate-400 font-semibold mb-2">TOP SKILLS</p>
      <div className="flex flex-wrap gap-2">
        {profile.skills.slice(0, 4).map(skill => (
          <span key={skill} className="bg-spyn-slate-700 text-spyn-slate-300 px-2 py-1 text-xs rounded-md">{skill}</span>
        ))}
      </div>
    </div>
  </div>
);

const OpportunitiesView: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ type: 'founder' | 'professional'; profile: FounderProfile | ProfessionalProfile } | null>(null);

  const renderModalContent = () => {
    if (!modalContent) return null;
    const { type, profile } = modalContent;

    if (type === 'founder') {
      const p = profile as FounderProfile;
      return (
        <div className="space-y-4">
          <p className="text-spyn-slate-300">{p.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-spyn-slate-900 p-3 rounded-lg"><div className="text-xs text-spyn-slate-400">Stage</div><div className="font-bold">{p.stage}</div></div>
            <div className="bg-spyn-slate-900 p-3 rounded-lg"><div className="text-xs text-spyn-slate-400">Funding</div><div className="font-bold">{p.funding_raised}</div></div>
            <div className="bg-spyn-slate-900 p-3 rounded-lg"><div className="text-xs text-spyn-slate-400">Team Size</div><div className="font-bold">{p.team_size}</div></div>
            <div className="bg-spyn-slate-900 p-3 rounded-lg"><div className="text-xs text-spyn-slate-400">Revenue</div><div className="font-bold">{p.revenue}</div></div>
          </div>
          <div>
            <h5 className="font-semibold text-spyn-slate-200 mb-2">Looking For Expertise In:</h5>
            <div className="flex flex-wrap gap-2">
              {p.looking_for.map(skill => <span key={skill} className="bg-spyn-slate-700 text-spyn-slate-200 px-3 py-1 text-sm rounded-md">{skill}</span>)}
            </div>
          </div>
          <div className="p-4 bg-spyn-gold-500/10 rounded-lg border border-spyn-gold-500/30">
            <h5 className="font-semibold text-spyn-gold-400 mb-2">EFS Offering</h5>
            <div className="flex justify-between"><span className="text-spyn-slate-400">Equity Offered:</span><span className="font-bold text-white">{p.equity_offered}</span></div>
            <div className="flex justify-between"><span className="text-spyn-slate-400">Vesting:</span><span className="font-bold text-white">{p.vesting}</span></div>
          </div>
          <button className="w-full bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4">
            Propose Partnership
          </button>
        </div>
      );
    }

    if (type === 'professional') {
      const p = profile as ProfessionalProfile;
      return (
        <div className="space-y-4">
            <p className="text-spyn-slate-300">{p.description}</p>
             <div>
                <h5 className="font-semibold text-spyn-slate-200 mb-2">Skills</h5>
                <div className="flex flex-wrap gap-2">
                {p.skills.map(skill => <span key={skill} className="bg-spyn-slate-700 text-spyn-slate-200 px-3 py-1 text-sm rounded-md">{skill}</span>)}
                </div>
            </div>
            <div>
                <h5 className="font-semibold text-spyn-slate-200 mb-2">Industry Interests</h5>
                <div className="flex flex-wrap gap-2">
                {p.industries.map(industry => <span key={industry} className="bg-spyn-slate-600 text-spyn-slate-200 px-3 py-1 text-sm rounded-md">{industry}</span>)}
                </div>
            </div>
            <div className="p-4 bg-spyn-slate-900 rounded-lg grid grid-cols-2 gap-4">
                <div><div className="text-xs text-spyn-slate-400">Availability</div><div className="font-bold">{p.availability}</div></div>
                <div><div className="text-xs text-spyn-slate-400">Rate</div><div className="font-bold">{p.rate}</div></div>
            </div>
             <button className="w-full bg-spyn-teal-600 hover:bg-spyn-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4">
                Initiate Contact
            </button>
        </div>
      );
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Find Opportunities</h2>
        <p className="mt-4 text-lg leading-8 text-spyn-slate-300">
          Connect with vetted founders and professionals ready for equity partnerships.
        </p>
      </div>
      
      {/* Founders Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Featured Founders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_FOUNDERS.map(profile => (
            <FounderCard key={profile.id} profile={profile} onClick={() => setModalContent({ type: 'founder', profile })} />
          ))}
        </div>
      </div>
      
      {/* Professionals Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Top Professionals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_PROFESSIONALS.map(profile => (
            <ProfessionalCard key={profile.id} profile={profile} onClick={() => setModalContent({ type: 'professional', profile })} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.type === 'founder' ? (modalContent.profile as FounderProfile).company : (modalContent?.profile as ProfessionalProfile)?.name || 'Profile'}
      >
        <div className="max-h-[70vh] overflow-y-auto pr-2">
         {renderModalContent()}
        </div>
      </Modal>
    </div>
  );
};

export default OpportunitiesView;
