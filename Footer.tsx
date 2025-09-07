import React from 'react';
import { Github, MessageCircle, Twitter } from 'lucide-react';

export function Footer() {
  const socialLinks = [
    { icon: MessageCircle, label: 'Discord (500 members)', href: 'https://discord.gg/q2fwB2KMPX', members: '500' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' }
  ];

  return (
    <footer className="mt-12 mb-8">
      <div className="text-center space-y-4">
        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-6">
          {socialLinks.map((link, index) => (
            <div key={index} className="relative group">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
              {link.members && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full border border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.members}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="text-sm text-gray-500">
          <span className="glow-text">© Lunaris 2025</span>
        </div>
      </div>
    </footer>
  );
}