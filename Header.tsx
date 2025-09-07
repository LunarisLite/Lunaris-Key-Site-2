import React from 'react';
import { Shield, Database, Activity } from 'lucide-react';
import { LunarisKeyAPI } from '../utils/keySystem';

interface HeaderProps {
  isOnline: boolean;
  userType?: 'developer' | 'premium' | 'standard';
}

export function Header({ isOnline, userType }: HeaderProps) {
  const keyStats = LunarisKeyAPI.getKeyStats();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="glass-card flex items-center justify-between px-6 py-4">
        {/* Logo & System Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-gold-400 rounded-lg flex items-center justify-center glow-blue-gold">
                <span className="text-black font-bold text-lg">L</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-white to-gold-400 bg-clip-text text-transparent">
                LUNARIS
              </span>
              <div className="text-xs text-gray-400">v0.8.2-beta</div>
            </div>
          </div>

          {/* System Metrics */}
          <div className="hidden md:flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Database className="w-3 h-3 text-blue-400" />
              <span className="text-gray-300">{keyStats.available} keys</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full" />
            <div className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-green-400" />
              <span className="text-gray-300">Active</span>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <h1 className="hidden md:block text-lg font-medium text-white">
          Secure Dashboard Portal
        </h1>

        {/* Status & Access Level */}
        <div className="flex items-center space-x-4">
          {userType && (
            <div className="flex items-center space-x-2">
              <Shield className={`w-4 h-4 ${
                userType === 'developer' ? 'text-gold-400' :
                userType === 'premium' ? 'text-purple-400' : 'text-blue-400'
              }`} />
              <span className={`text-sm font-medium ${
                userType === 'developer' ? 'text-gold-400' :
                userType === 'premium' ? 'text-purple-400' : 'text-blue-400'
              }`}>
                {userType.toUpperCase()}
              </span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-green-400 glow-green' : 'bg-red-400 glow-red'
              } animate-pulse`}
            />
            <span className="text-sm text-gray-300">
              {isOnline ? 'SECURE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}