import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, ExternalLink, Users, Shield, Clock } from 'lucide-react';

export function SupportPanel() {
  const handleDiscordClick = () => {
    window.open('https://discord.gg/q2fwB2KMPX', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Support Center</h2>
        <p className="text-gray-400">Get help, join our community, and stay updated with the latest news.</p>
      </div>

      {/* Discord Community */}
      <Card className="glass-card p-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Join Our Discord Community</h3>
            <p className="text-gray-400 mb-6">
              Connect with other users, get instant support, and stay updated with the latest announcements.
            </p>
          </div>

          <Button
            onClick={handleDiscordClick}
            className="w-full py-4 text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 btn-glow"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Join Discord Server
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-600/30">
            <div className="text-center">
              <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Active Community</p>
              <p className="text-xs text-gray-500">500+ Members</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Expert Support</p>
              <p className="text-xs text-gray-500">24/7 Help</p>
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 text-gold-400 mx-auto mb-2" />
              <p className="text-sm text-gray-300">Quick Response</p>
              <p className="text-xs text-gray-500">&lt; 30 mins</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card p-6 tutorial-item">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="text-lg font-medium text-white">Live Chat Support</h4>
            <p className="text-sm text-gray-400">
              Get real-time help from our support team and community moderators in Discord.
            </p>
          </div>
        </Card>

        <Card className="glass-card p-6 tutorial-item">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <h4 className="text-lg font-medium text-white">Verified Support</h4>
            <p className="text-sm text-gray-400">
              Our verified support staff are available to help with any technical issues or questions.
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Links */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-medium text-white mb-4">Quick Help</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 glass-card-inner rounded-lg">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <div className="flex-1">
              <p className="text-sm text-white">How to get a key?</p>
              <p className="text-xs text-gray-400">Join Discord for key distribution events</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 glass-card-inner rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <div className="flex-1">
              <p className="text-sm text-white">Key expired?</p>
              <p className="text-xs text-gray-400">Request a new key in #key-requests</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 glass-card-inner rounded-lg">
            <div className="w-2 h-2 rounded-full bg-gold-400"></div>
            <div className="flex-1">
              <p className="text-sm text-white">Installation help?</p>
              <p className="text-xs text-gray-400">Check #tutorials channel for guides</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}