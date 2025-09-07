import React from 'react';
import { Card } from './ui/card';
import { Play, BookOpen, Settings, Smartphone } from 'lucide-react';

const tutorials = [
  {
    title: 'Getting Started with Lunaris',
    description: 'Complete setup guide for beginners',
    icon: BookOpen,
    type: 'text'
  },
  {
    title: 'Using Shizuku Mode',
    description: 'Advanced rootless injection tutorial',
    icon: Smartphone,
    type: 'video'
  },
  {
    title: 'Customizing Roblox Flags',
    description: 'Optimize performance with custom flags',
    icon: Settings,
    type: 'text'
  },
  {
    title: 'Script Execution Tutorial',
    description: 'Learn to run and manage scripts',
    icon: Play,
    type: 'video'
  }
];

export function Tutorials() {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-medium text-white mb-4">Tutorials & Help</h3>
      <div className="space-y-3">
        {tutorials.map((tutorial, index) => (
          <div 
            key={index}
            className="tutorial-item glass-card-inner p-4 cursor-pointer transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-400/50 group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                <tutorial.icon className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                  {tutorial.title}
                </h4>
                <p className="text-xs text-gray-400">
                  {tutorial.description}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                  {tutorial.type}
                </span>
                {tutorial.type === 'video' && (
                  <Play className="w-3 h-3 text-gold-400" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}