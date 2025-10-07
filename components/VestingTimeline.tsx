
import React from 'react';
import type { Project } from '../types';

interface VestingTimelineProps {
  project: Project;
}

const VestingTimeline: React.FC<VestingTimelineProps> = ({ project }) => {
  const now = new Date();
  const startDate = project.vestingStartDate;
  const totalDuration = project.vestingYears * 12; // in months
  const elapsedDuration = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  const vestedPercentage = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));

  const cliffMet = elapsedDuration >= 12;

  return (
    <div className="mt-4 p-4 bg-spyn-slate-800 rounded-lg border border-spyn-slate-700">
      <h4 className="font-semibold text-spyn-slate-200 mb-3">Vesting Schedule: {project.equity}% over {project.vestingYears} years</h4>
      <div className="relative w-full h-4 bg-spyn-slate-700 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-spyn-teal-500 rounded-full" 
          style={{ width: `${vestedPercentage}%` }}
        ></div>
         {project.vestingYears > 1 && (
            <div 
              className="absolute top-0 h-full w-0.5 bg-spyn-gold-400"
              style={{ left: `${(12 / totalDuration) * 100}%` }}
              title="1-Year Cliff"
            ></div>
         )}
      </div>
      <div className="flex justify-between text-xs text-spyn-slate-400 mt-2">
        <span>Start: {startDate.toLocaleDateString()}</span>
        <span>{vestedPercentage.toFixed(1)}% Vested</span>
        <span>End: {new Date(startDate.getFullYear() + project.vestingYears, startDate.getMonth(), startDate.getDate()).toLocaleDateString()}</span>
      </div>
      {project.vestingYears > 1 && (
        <p className={`text-sm mt-3 ${cliffMet ? 'text-green-400' : 'text-spyn-gold-400'}`}>
          {cliffMet ? '✓ 1-Year Cliff Met' : '1-Year Cliff Pending'}
        </p>
      )}
    </div>
  );
};

export default VestingTimeline;
