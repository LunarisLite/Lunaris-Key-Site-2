import React from 'react';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

const updates = [
  {
    version: 'v1.3.0',
    date: 'Sep 2025',
    changes: [
      'Enhanced security with device binding',
      'Real-time key management system',
      'Developer analytics dashboard',
      'Hardware fingerprinting protection'
    ]
  },
  {
    version: 'v1.2.4',
    date: 'Sep 2025',
    changes: [
      'Added AutoOptimize 2.0',
      'Improved Shizuku integration', 
      'Fixed launch crash on Android 15',
      'Enhanced graphics performance'
    ]
  },
  {
    version: 'v1.2.3',
    date: 'Aug 2025',
    changes: [
      'UI polish, new animations',
      'Faster startup time',
      'Bug fixes for Samsung devices',
      'New injection methods'
    ]
  },
  {
    version: 'v1.2.2',
    date: 'Jul 2025',
    changes: [
      'Critical stability fixes',
      'Memory leak patches',
      'Improved compatibility',
      'Performance optimizations'
    ]
  }
];

export function UpdateNotes() {
  return (
    <Card className="glass-card p-6 h-80">
      <h3 className="text-lg font-medium text-white mb-4">Update Notes</h3>
      <ScrollArea className="h-60">
        <div className="space-y-4">
          {updates.map((update, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-blue-400">{update.version}</h4>
                <span className="text-xs text-gray-500">{update.date}</span>
              </div>
              <ul className="space-y-1 ml-4">
                {update.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className="text-sm text-gray-300 flex items-start">
                    <span className="text-gold-400 mr-2">•</span>
                    {change}
                  </li>
                ))}
              </ul>
              {index < updates.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mt-3" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}