
import React from 'react';
import type { Contract } from '../types';

interface ContractManagementTableProps {
  contracts: Contract[];
  onUpdateContractStatus: (contractId: number, newStatus: Contract['status']) => void;
}

const ContractStatusBadge: React.FC<{ status: Contract['status'] }> = ({ status }) => {
  const statusClasses = {
    'Executed': 'bg-blue-500/20 text-blue-300',
    'Pending Review': 'bg-yellow-500/20 text-yellow-300',
    'Completed': 'bg-green-500/20 text-green-300',
  };
  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

const ContractManagementTable: React.FC<ContractManagementTableProps> = ({ contracts, onUpdateContractStatus }) => {
  const sortedContracts = [...contracts].sort((a, b) => new Date(b.executionDate).getTime() - new Date(a.executionDate).getTime());
    
  return (
    <div className="bg-spyn-slate-800 rounded-lg shadow-lg border border-spyn-slate-700 overflow-x-auto">
      <table className="min-w-full divide-y divide-spyn-slate-700">
        <thead className="bg-spyn-slate-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Project Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Parties</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Equity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Executed Date</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-spyn-slate-800 divide-y divide-spyn-slate-700">
          {sortedContracts.map((contract) => (
            <tr key={contract.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-spyn-slate-100">{contract.projectName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-spyn-slate-300">
                <div className="text-xs">F: {contract.founderName}</div>
                <div className="text-xs">P: {contract.professionalName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-spyn-slate-300">{contract.equityPercentage}%</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <ContractStatusBadge status={contract.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-spyn-slate-300">
                {new Date(contract.executionDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {contract.status === 'Pending Review' && (
                  <button
                    onClick={() => onUpdateContractStatus(contract.id, 'Executed')}
                    className="text-spyn-teal-400 hover:text-spyn-teal-300 transition-colors font-semibold"
                  >
                    Approve
                  </button>
                )}
                 {contract.status === 'Executed' && (
                  <button
                    onClick={() => onUpdateContractStatus(contract.id, 'Completed')}
                    className="text-green-400 hover:text-green-300 transition-colors font-semibold"
                  >
                    Mark as Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractManagementTable;
