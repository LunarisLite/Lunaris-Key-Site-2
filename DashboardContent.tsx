import React from 'react';
import { DownloadPanel } from './DownloadPanel';
import { UpdateNotes } from './UpdateNotes';
import { Tutorials } from './Tutorials';
import { SupportPanel } from './SupportPanel';
import { DeveloperPanel } from './DeveloperPanel';
import { Card } from './ui/card';
import { Activity, Users, Download, Clock } from 'lucide-react';
import { EnhancedLunarisKeyAPI } from '../utils/enhancedKeySystem';

interface DashboardContentProps {
  activeSection: string;
  userType: 'developer' | 'premium' | 'standard';
  keyExpiry?: Date;
}

function DashboardOverview({ userType }: { userType: 'developer' | 'premium' | 'standard' }) {
  const stats = [
    { label: 'Total Downloads', value: '---', icon: Download, color: 'blue' },
    { label: 'Active Users', value: '---', icon: Users, color: 'green' },
    { label: 'System Uptime', value: '---', icon: Activity, color: 'gold' },
    { label: 'Avg Response', value: '---', icon: Clock, color: 'purple' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome to Lunaris Dashboard
          {userType === 'developer' && <span className="text-gold-400 ml-2">[Developer]</span>}
          {userType === 'premium' && <span className="text-purple-400 ml-2">[Premium]</span>}
          {userType === 'standard' && <span className="text-blue-400 ml-2">[Standard]</span>}
        </h2>
        <p className="text-gray-400">
          {userType === 'developer' 
            ? 'Full developer access to Lunaris systems and development tools.'
            : userType === 'premium'
            ? 'Premium access with extended features and priority support.'
            : 'Standard access to core Lunaris features.'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card p-6 stats-card">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-500/20 border border-${stat.color}-500/30`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium text-white mb-4">Quick Download</h3>
          <div className="space-y-3">
            <DownloadPanel userType={userType} />
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 glass-card-inner rounded-lg">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="flex-1">
                <p className="text-sm text-white">System updated to v0.8.2-beta</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 glass-card-inner rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Core modules initialization</p>
                <p className="text-xs text-gray-500">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 glass-card-inner rounded-lg">
              <div className="w-2 h-2 rounded-full bg-gold-400"></div>
              <div className="flex-1">
                <p className="text-sm text-white">Development environment setup</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
        
        <div className="space-y-6">
          {/* General Settings */}
          <div className="glass-card-inner p-4">
            <h3 className="text-lg font-medium text-white mb-4">General</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Auto-updates</p>
                  <p className="text-sm text-gray-400">Automatically download and install updates</p>
                </div>
                <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white">Notifications</p>
                  <p className="text-sm text-gray-400">Receive system notifications</p>
                </div>
                <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="glass-card-inner p-4">
            <h3 className="text-lg font-medium text-white mb-4">Security</h3>
            <div className="space-y-4">
              <div>
                <p className="text-white mb-2">Session Timeout</p>
                <select 
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  defaultValue="24h"
                >
                  <option value="1h">1 Hour</option>
                  <option value="6h">6 Hours</option>
                  <option value="24h">24 Hours</option>
                  <option value="7d">7 Days</option>
                </select>
              </div>
              
              <div>
                <p className="text-white mb-2">Two-Factor Authentication</p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardContent({ activeSection, userType, keyExpiry }: DashboardContentProps) {
  const renderContent = () => {
    const content = (() => {
      switch (activeSection) {
        case 'dashboard':
          return <DashboardOverview userType={userType} />;
        case 'download':
          return (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Download Center</h2>
                <DownloadPanel userType={userType} />
              </div>
            </div>
          );
        case 'updates':
          return (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Update History</h2>
              </div>
              <UpdateNotes />
            </div>
          );
        case 'tutorials':
          return (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Tutorials & Help</h2>
              </div>
              <Tutorials />
            </div>
          );
        case 'support':
          return <SupportPanel />;
        case 'developer':
          return EnhancedLunarisKeyAPI.hasPermission('admin') 
            ? <DeveloperPanel />
            : <div className="glass-card p-6"><h2 className="text-xl text-red-400">Access Denied</h2><p className="text-gray-400">Developer permissions required.</p></div>;
        case 'settings':
          return <SettingsPanel />;
        default:
          return <DashboardOverview userType={userType} />;
      }
    })();

    return <div className="content-transition">{content}</div>;
  };

  return (
    <div className="ml-72 p-6 min-h-screen">
      {renderContent()}
    </div>
  );
}