import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  // FIX: Changed JSX.Element to React.ReactNode to resolve the "Cannot find namespace 'JSX'" error.
  icon: React.ReactNode;
  colorClass: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-spyn-slate-800 p-6 rounded-lg shadow-lg border border-spyn-slate-700 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-spyn-slate-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-spyn-slate-100">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;