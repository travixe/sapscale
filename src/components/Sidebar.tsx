import React from 'react';
import { Plane, Calendar, Wrench, BarChart3 } from 'lucide-react';
import { ActivePage } from '../App';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'booking', label: 'Flight Booking', icon: Plane },
    { id: 'scheduling', label: 'Flight Scheduling', icon: Calendar },
    { id: 'maintenance', label: 'Aircraft Maintenance', icon: Wrench },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Plane className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">AirlineOps</h1>
            <p className="text-sm text-slate-400">Management System</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id as ActivePage)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="text-sm text-slate-400">
          <p>Logged in as</p>
          <p className="font-semibold text-white">Operations Manager</p>
        </div>
      </div>
    </div>
  );
};