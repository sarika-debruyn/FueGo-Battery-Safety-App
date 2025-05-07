import React from 'react';
import { Battery, Award, Map, Settings, Home, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userPoints } from '../../data/mockData';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/battery', label: 'Battery Details', icon: <Battery size={20} /> },
    { path: '/rewards', label: 'Rewards', icon: <Award size={20} /> },
    { path: '/swap-stations', label: 'Swap Stations', icon: <Map size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <div className="flex flex-col h-full bg-slate-800 text-white">
      <div className="p-4 flex items-center space-x-2">
        <Battery className="text-teal-500" size={28} />
        <span className="text-xl font-bold">BattSafe</span>
      </div>
      
      <div className="mt-6 border-t border-slate-700 pt-4 px-3">
        <div className="bg-slate-700 rounded-lg p-3 mb-6">
          <p className="text-sm text-slate-300">Your Points</p>
          <div className="flex items-center mt-1">
            <Award className="text-amber-400 mr-2" size={18} />
            <span className="text-lg font-semibold">{userPoints}</span>
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-3 py-2 rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4">
        <button className="w-full flex items-center px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors">
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;