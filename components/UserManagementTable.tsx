
import React from 'react';
import type { User } from '../types';

interface UserManagementTableProps {
  users: User[];
  onUpdateUserStatus: (userId: number, newStatus: 'Active' | 'Inactive') => void;
}

const UserStatusBadge: React.FC<{ status: 'Active' | 'Inactive' }> = ({ status }) => {
  const isActive = status === 'Active';
  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${isActive ? 'bg-green-500/20 text-green-300' : 'bg-spyn-slate-600 text-spyn-slate-300'}`}>
      {status}
    </span>
  );
};

const UserManagementTable: React.FC<UserManagementTableProps> = ({ users, onUpdateUserStatus }) => {
  const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    
  return (
    <div className="bg-spyn-slate-800 rounded-lg shadow-lg border border-spyn-slate-700 overflow-x-auto">
      <table className="min-w-full divide-y divide-spyn-slate-700">
        <thead className="bg-spyn-slate-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Role</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Registered</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-spyn-slate-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-spyn-slate-800 divide-y divide-spyn-slate-700">
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-spyn-slate-100">{user.name}</div>
                <div className="text-xs text-spyn-slate-400">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-spyn-slate-300">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <UserStatusBadge status={user.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-spyn-slate-300">
                {new Date(user.registeredDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {user.status === 'Active' ? (
                  <button
                    onClick={() => onUpdateUserStatus(user.id, 'Inactive')}
                    className="text-spyn-gold-400 hover:text-spyn-gold-300 transition-colors font-semibold"
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdateUserStatus(user.id, 'Active')}
                    className="text-spyn-teal-400 hover:text-spyn-teal-300 transition-colors font-semibold"
                  >
                    Activate
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

export default UserManagementTable;
