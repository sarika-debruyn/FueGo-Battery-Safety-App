import React, { useState } from 'react';
import { Menu, Bell, User, X } from 'lucide-react';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notifications = [
    { id: 1, text: 'Battery inspection reminder: Due in 3 days', time: '2 hours ago' },
    { id: 2, text: 'Congratulations! You earned the Safety Streak achievement', time: '1 day ago' },
    { id: 3, text: 'New swap station opened near you', time: '2 days ago' },
  ];
  
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6">
      <button 
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-md hover:bg-slate-100 text-slate-700"
      >
        <Menu size={24} />
      </button>
      
      <div className="flex-1 md:ml-4">
        <h1 className="text-xl font-semibold text-slate-800 hidden md:block">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (showProfile) setShowProfile(false);
            }}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-700 relative"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              <div className="flex items-center justify-between p-4 border-b border-slate-200">
                <h3 className="font-medium">Notifications</h3>
                <button onClick={() => setShowNotifications(false)} className="text-slate-500 hover:text-slate-700">
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 border-b border-slate-100 hover:bg-slate-50">
                    <p className="text-sm text-slate-800">{notification.text}</p>
                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfile(!showProfile);
              if (showNotifications) setShowNotifications(false);
            }}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100"
          >
            <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden flex-shrink-0">
              {currentUser.avatarUrl ? (
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-full h-full p-1 text-slate-600" />
              )}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden md:block">
              {currentUser.name}
            </span>
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              <div className="p-3 border-b border-slate-200">
                <p className="font-medium text-slate-800">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md">
                  View Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md">
                  Account Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md">
                  Help Center
                </button>
              </div>
              <div className="p-2 border-t border-slate-200">
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-slate-100 rounded-md">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;