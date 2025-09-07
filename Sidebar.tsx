import React from 'react';
import { Download, FileText, BookOpen, LogOut, Home, Settings, MessageCircle, Terminal } from 'lucide-react';
import { EnhancedLunarisKeyAPI } from '../utils/enhancedKeySystem';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  userType: 'developer' | 'premium' | 'standard';
  keyExpiry?: Date;
}

const getNavigationItems = () => {
  const baseItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'download', label: 'Download', icon: Download },
    { id: 'updates', label: 'Updates', icon: FileText },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'support', label: 'Support', icon: MessageCircle },
  ];

  // Add developer panel if user has admin permissions
  if (EnhancedLunarisKeyAPI.hasPermission('admin')) {
    baseItems.push({ id: 'developer', label: 'Developer', icon: Terminal });
  }

  baseItems.push({ id: 'settings', label: 'Settings', icon: Settings });
  
  return baseItems;
};

export function Sidebar({ activeSection, onSectionChange, onLogout, userType, keyExpiry }: SidebarProps) {
  const isExpired = keyExpiry && new Date() > keyExpiry;
  const timeRemaining = keyExpiry ? Math.max(0, keyExpiry.getTime() - new Date().getTime()) : 0;
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const navigationItems = getNavigationItems();
  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-card m-4 p-6 z-40">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-gold-400 rounded-lg flex items-center justify-center">
          <span className="text-black font-bold">L</span>
        </div>
        <span className="text-xl font-bold text-white">Lunaris</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`
              sidebar-item w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
              ${activeSection === item.id
                ? 'active bg-gradient-to-r from-blue-500/30 to-gold-500/30 border border-blue-400/50 text-white glow-blue-gold'
                : 'text-gray-400 hover:text-white hover:bg-blue-500/10 hover:border-blue-400/30 border border-transparent'
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Status */}
      <div className="glass-card-inner p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400 glow-yellow status-pulse" />
          <span className="text-sm text-gray-300">System in Development</span>
        </div>
        <div className="text-xs text-gray-500">
          <p>Version: v0.8.2-beta</p>
          <p>Build Status: Alpha</p>
        </div>
        
        {/* Access Level */}
        <div className="mt-3 pt-3 border-t border-gray-600/30">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Access Level:</span>
            <span className={`text-xs ${
              userType === 'developer' ? 'text-gold-400' : 
              userType === 'premium' ? 'text-purple-400' : 'text-blue-400'
            }`}>
              {userType === 'developer' ? 'Developer' : 
               userType === 'premium' ? 'Premium' : 'Standard'}
            </span>
          </div>
          {(userType === 'premium' || userType === 'standard') && keyExpiry && (
            <div className="mt-1">
              <span className="text-xs text-gray-500">
                {isExpired ? 'Expired' : 
                 userType === 'premium' ? `${Math.ceil(hoursRemaining/24)} days remaining` :
                 `${hoursRemaining}h ${minutesRemaining}m remaining`}
              </span>
            </div>
          )}
          {userType === 'developer' && (
            <div className="mt-1">
              <span className="text-xs text-green-400">Lifetime Access</span>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-400/30 border border-transparent transition-all duration-300"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}