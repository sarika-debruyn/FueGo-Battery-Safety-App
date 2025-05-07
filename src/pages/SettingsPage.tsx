import React, { useState } from 'react';
import { Settings, Bell, Shield, User, HelpCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { currentUser } from '../data/mockData';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'help'>('profile');
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '123-456-7890',
    language: 'english',
    theme: 'system',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    safetyAlerts: true,
    rewardUpdates: true,
    batteryTips: true,
    maintenanceReminders: true,
    promotionalMessages: false,
    appUpdates: true,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareLocationData: true,
    shareUsageData: true,
    allowAnalytics: true,
    showInLeaderboards: true,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };
  
  const handlePrivacyToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };
  
  const handleSaveProfile = () => {
    alert('Profile saved successfully!');
  };
  
  const handleSaveNotifications = () => {
    alert('Notification preferences saved successfully!');
  };
  
  const handleSavePrivacy = () => {
    alert('Privacy settings saved successfully!');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h2 className="font-medium text-slate-800">Settings Menu</h2>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <User size={16} className="mr-2" />
                Profile Settings
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === 'notifications'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bell size={16} className="mr-2" />
                Notification Preferences
              </button>
              
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === 'privacy'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Shield size={16} className="mr-2" />
                Privacy & Data
              </button>
              
              <button
                onClick={() => setActiveTab('help')}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === 'help'
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <HelpCircle size={16} className="mr-2" />
                Help & Support
              </button>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <Card className="h-full">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-slate-800 mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center">
                      {currentUser.avatarUrl ? (
                        <img 
                          src={currentUser.avatarUrl} 
                          alt={currentUser.name} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">{currentUser.name}</h3>
                      <p className="text-sm text-slate-500">Driver ID: {currentUser.id}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Change Profile Picture
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-slate-700 mb-1">
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-slate-700 mb-1">
                      App Theme
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={formData.theme === 'light'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                        />
                        <span className="ml-2 text-sm text-slate-700">Light</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={formData.theme === 'dark'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                        />
                        <span className="ml-2 text-sm text-slate-700">Dark</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="theme"
                          value="system"
                          checked={formData.theme === 'system'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                        />
                        <span className="ml-2 text-sm text-slate-700">System Default</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-slate-800 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-md mb-4">
                    <p className="text-sm text-slate-600">
                      Choose which notifications you want to receive and how you want to receive them.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-slate-200">
                        <div>
                          <p className="font-medium text-slate-800">
                            {key === 'safetyAlerts' && 'Safety Alerts'}
                            {key === 'rewardUpdates' && 'Reward Updates'}
                            {key === 'batteryTips' && 'Battery Tips & Suggestions'}
                            {key === 'maintenanceReminders' && 'Maintenance Reminders'}
                            {key === 'promotionalMessages' && 'Promotional Messages'}
                            {key === 'appUpdates' && 'App Updates'}
                          </p>
                          <p className="text-sm text-slate-500">
                            {key === 'safetyAlerts' && 'Get alerts for potential battery safety issues'}
                            {key === 'rewardUpdates' && 'Updates about points, rewards, and achievements'}
                            {key === 'batteryTips' && 'Receive tips to improve battery health and safety'}
                            {key === 'maintenanceReminders' && 'Reminders for scheduled maintenance checks'}
                            {key === 'promotionalMessages' && 'Special offers and promotions from partners'}
                            {key === 'appUpdates' && 'Important app updates and new features'}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              value ? 'bg-teal-500' : 'bg-slate-200'
                            }`}
                            onClick={() => handleNotificationToggle(key as keyof typeof notificationSettings)}
                          >
                            <span className="sr-only">Toggle notification</span>
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                value ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-md mt-6">
                    <h3 className="font-medium text-slate-800 mb-2">Notification Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="push"
                          type="checkbox"
                          checked={true}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                        />
                        <label htmlFor="push" className="ml-2 text-sm text-slate-700">
                          Push Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="email"
                          type="checkbox"
                          checked={true}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                        />
                        <label htmlFor="email" className="ml-2 text-sm text-slate-700">
                          Email
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="sms"
                          type="checkbox"
                          checked={false}
                          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                        />
                        <label htmlFor="sms" className="ml-2 text-sm text-slate-700">
                          SMS
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Reset to Default
                  </Button>
                  <Button variant="primary" onClick={handleSaveNotifications}>
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-lg font-medium text-slate-800 mb-6">Privacy & Data Settings</h2>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-md mb-4">
                    <p className="text-sm text-slate-600">
                      Control how your data is used and shared within the BattSafe platform.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(privacySettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-slate-200">
                        <div>
                          <p className="font-medium text-slate-800">
                            {key === 'shareLocationData' && 'Share Location Data'}
                            {key === 'shareUsageData' && 'Share Battery Usage Data'}
                            {key === 'allowAnalytics' && 'Allow Analytics'}
                            {key === 'showInLeaderboards' && 'Show in Leaderboards'}
                          </p>
                          <p className="text-sm text-slate-500">
                            {key === 'shareLocationData' && 'Allow app to track your location for swap station recommendations'}
                            {key === 'shareUsageData' && 'Share anonymous battery usage data to improve recommendations'}
                            {key === 'allowAnalytics' && 'Allow us to collect analytics to improve the app experience'}
                            {key === 'showInLeaderboards' && 'Display your score on safety and achievement leaderboards'}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              value ? 'bg-teal-500' : 'bg-slate-200'
                            }`}
                            onClick={() => handlePrivacyToggle(key as keyof typeof privacySettings)}
                          >
                            <span className="sr-only">Toggle setting</span>
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                value ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium text-slate-800 mb-3">Data Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline">
                        Download My Data
                      </Button>
                      <Button variant="outline" className="text-red-600 hover:bg-red-50">
                        Delete All My Data
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSavePrivacy}>
                    Save Settings
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'help' && (
              <div>
                <h2 className="text-lg font-medium text-slate-800 mb-6">Help & Support</h2>
                
                <div className="space-y-6">
                  <div className="bg-teal-50 border border-teal-200 p-4 rounded-md">
                    <h3 className="font-medium text-teal-800 mb-1">Need assistance?</h3>
                    <p className="text-sm text-teal-700">
                      Our support team is available 24/7 to help you with any questions or issues.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-0">
                      <div className="p-4">
                        <h3 className="font-medium text-slate-800 mb-2">Contact Support</h3>
                        <p className="text-sm text-slate-600 mb-3">
                          Reach out to our team for personalized assistance
                        </p>
                        <Button variant="primary" fullWidth>
                          Contact Support
                        </Button>
                      </div>
                    </Card>
                    
                    <Card className="p-0">
                      <div className="p-4">
                        <h3 className="font-medium text-slate-800 mb-2">FAQ</h3>
                        <p className="text-sm text-slate-600 mb-3">
                          Browse our frequently asked questions
                        </p>
                        <Button variant="outline" fullWidth>
                          View FAQ
                        </Button>
                      </div>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-slate-800 mb-3">Popular Topics</h3>
                    <div className="space-y-2">
                      <button className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors text-left">
                        <span className="text-sm font-medium text-slate-700">How the battery safety score is calculated</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </button>
                      <button className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors text-left">
                        <span className="text-sm font-medium text-slate-700">Troubleshooting battery issues</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </button>
                      <button className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors text-left">
                        <span className="text-sm font-medium text-slate-700">Using the swap station locator</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </button>
                      <button className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors text-left">
                        <span className="text-sm font-medium text-slate-700">Redeeming rewards and points</span>
                        <ChevronRight size={16} className="text-slate-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-slate-800 mb-3">App Information</h3>
                    <div className="bg-slate-50 p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Version</p>
                          <p className="text-sm font-medium text-slate-700">1.2.5</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Last Updated</p>
                          <p className="text-sm font-medium text-slate-700">May 10, 2025</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Terms of Service</p>
                          <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                            View Terms
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Privacy Policy</p>
                          <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                            View Policy
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;