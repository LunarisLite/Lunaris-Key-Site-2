import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, Lock, Eye, EyeOff, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';
import { EnhancedLunarisKeyAPI } from '../utils/enhancedKeySystem';

interface AuthenticationScreenProps {
  onAuthenticated: (userType: 'developer' | 'premium' | 'standard', keyExpiry?: Date) => void;
}

export function AuthenticationScreen({ onAuthenticated }: AuthenticationScreenProps) {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [systemStatus] = useState(() => EnhancedLunarisKeyAPI.getPublicStats());

  const MAX_ATTEMPTS = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attempts >= MAX_ATTEMPTS) {
      setError('Maximum attempts exceeded. Please refresh the page and try again.');
      return;
    }

    if (!EnhancedLunarisKeyAPI.isValidKeyFormat(key)) {
      setError('Invalid key format. Please check your key and try again.');
      setAttempts(prev => prev + 1);
      return;
    }

    setIsVerifying(true);
    setError('');
    setSuccess('');

    // Simulate secure verification process
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const validation = await EnhancedLunarisKeyAPI.validateKey(key);
      
      if (validation.isValid && validation.key) {
        setSuccess(`Access granted! Welcome to Lunaris ${validation.accessLevel} tier.`);
        setError('');
        
        // Show success state briefly before transitioning
        await new Promise(resolve => setTimeout(resolve, 1200));
        onAuthenticated(validation.accessLevel as 'developer' | 'premium' | 'standard', validation.expiresAt);
      } else {
        setAttempts(prev => prev + 1);
        setError(`${validation.reason}. ${MAX_ATTEMPTS - attempts - 1} attempts remaining.`);
        setKey('');
      }
    } catch (error) {
      setError('Authentication service temporarily unavailable. Please try again.');
      setAttempts(prev => prev + 1);
    }
    
    setIsVerifying(false);
  };

  const isLocked = attempts >= MAX_ATTEMPTS;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-yellow-900/20" />
        
        {/* Animated Particles */}
        <div className="particles-container">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="glowing-orb glowing-orb-1" />
        <div className="glowing-orb glowing-orb-2" />
      </div>

      {/* Authentication Card */}
      <Card className="glass-card w-full max-w-lg p-8 relative z-10">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-gold-500/20 border border-blue-500/30 glow-blue-gold">
                  <KeyRound className="w-8 h-8 text-blue-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-white to-gold-400 bg-clip-text text-transparent mb-2">
                LUNARIS
              </h1>
              <p className="text-gray-400 text-sm font-medium">
                Secure Authentication Portal
              </p>
              <div className="mt-3 glass-card-inner p-3 rounded-lg">
                <div className="flex items-center justify-center space-x-4 text-xs">
                  <span className="text-green-400">System Online</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="text-blue-400">Military-Grade Security</span>
                </div>
              </div>
            </div>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessKey" className="text-sm text-gray-300 text-left block">
                Access Key
              </Label>
              <div className="relative">
                <Input
                  id="accessKey"
                  type={showKey ? 'text' : 'password'}
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Enter your access key"
                  disabled={isVerifying || isLocked}
                  className="glass-card-inner border-gray-600/50 bg-gray-800/30 text-white placeholder-gray-500 pr-10 focus:border-blue-500/50 focus:ring-blue-500/20"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  disabled={isVerifying || isLocked}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <div className="glass-card-inner p-3 border-red-500/30 bg-red-500/10 glow-red">
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            )}
            
            {success && (
              <div className="glass-card-inner p-3 border-green-500/30 bg-green-500/10 glow-green">
                <div className="flex items-center space-x-2 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!key || isVerifying || isLocked}
              className={`
                w-full py-3 transition-all duration-300
                ${isVerifying 
                  ? 'bg-blue-600 text-white' 
                  : isLocked
                  ? 'bg-red-600/50 text-red-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 glow-blue-gold text-white'
                }
              `}
            >
              {isVerifying ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : isLocked ? (
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Access Locked</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Authenticate</span>
                </div>
              )}
            </Button>
          </form>

          {/* Security Info */}
          <div className="space-y-4">
            <div className="glass-card-inner p-4 space-y-3">
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
                <Lock className="w-3 h-3" />
                <span>Enterprise-Grade Security</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center">
                  <div className="text-green-400 font-medium">Active</div>
                  <div className="text-gray-500">Device Binding</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-medium">Enabled</div>
                  <div className="text-gray-500">IP Tracking</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-gold-400 font-medium">Protected</div>
                  <div className="text-gray-500">Hardware Fingerprinting</div>
                </div>
              </div>
            </div>

            {/* Attempts Counter */}
            <div className="flex items-center justify-center space-x-3 text-xs">
              <span className="text-gray-500">Security Attempts:</span>
              <div className="flex space-x-1">
                {[...Array(MAX_ATTEMPTS)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full border ${
                      i < attempts 
                        ? 'bg-red-500 border-red-400 glow-red' 
                        : 'bg-gray-700 border-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>🔒 Keys are single-use and expire automatically</p>
              <p>⚡ Real-time validation with anti-fraud protection</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}