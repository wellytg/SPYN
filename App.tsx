import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { View } from './types';
import FounderDashboard from './views/FounderDashboard';
import ProfessionalDashboard from './views/ProfessionalDashboard';
import AdminDashboard from './views/AdminDashboard';
import HomeView from './views/HomeView';
import OpportunitiesView from './views/OpportunitiesView';
import ContractsView from './views/ContractsView';
import PricingView from './views/PricingView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Home);

  const renderActiveView = () => {
    switch (activeView) {
      case View.Opportunities:
        return <OpportunitiesView />;
      case View.Contracts:
        return <ContractsView />;
      case View.Pricing:
        return <PricingView />;
      case View.Founder:
        return <FounderDashboard />;
      case View.Professional:
        return <ProfessionalDashboard />;
      case View.Admin:
        return <AdminDashboard />;
      case View.Home:
      default:
        return <HomeView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-spyn-slate-900 font-sans flex flex-col">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderActiveView()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;