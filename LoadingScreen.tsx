import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { CheckCircle, Loader2, Shield, Database, Key, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface ValidationStep {
  id: string;
  label: string;
  icon: React.ElementType;
  duration: number;
  status: 'pending' | 'loading' | 'complete';
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ValidationStep[]>([
    { id: 'auth', label: 'Validating Authentication', icon: Shield, duration: 1200, status: 'pending' },
    { id: 'perms', label: 'Checking Permissions', icon: Key, duration: 800, status: 'pending' },
    { id: 'database', label: 'Connecting to Database', icon: Database, duration: 1000, status: 'pending' },
    { id: 'systems', label: 'Initializing Systems', icon: Zap, duration: 900, status: 'pending' }
  ]);

  useEffect(() => {
    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        // Set current step to loading
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index === i ? 'loading' : index < i ? 'complete' : 'pending'
        })));
        setCurrentStep(i);

        // Wait for step duration
        await new Promise(resolve => setTimeout(resolve, steps[i].duration));

        // Mark step as complete
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index <= i ? 'complete' : 'pending'
        })));
      }

      // Wait a bit before transitioning
      await new Promise(resolve => setTimeout(resolve, 800));
      onComplete();
    };

    processSteps();
  }, [onComplete, steps.length]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-yellow-900/20" />
        
        {/* Animated Particles */}
        <div className="particles-container">
          {[...Array(12)].map((_, i) => (
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

      {/* Loading Card */}
      <Card className="glass-card w-full max-w-lg p-8 relative z-10 loading-card">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-gold-400 rounded-full flex items-center justify-center loading-logo">
                <span className="text-black font-bold text-2xl">L</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Lunaris System</h1>
              <p className="text-gray-400 text-sm">Initializing secure connection...</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`
                  flex items-center space-x-4 p-4 rounded-lg transition-all duration-500
                  ${step.status === 'complete' ? 'validation-step-complete' : 
                    step.status === 'loading' ? 'validation-step-loading' : 
                    'validation-step-pending'}
                `}
              >
                <div className="flex-shrink-0">
                  {step.status === 'complete' ? (
                    <CheckCircle className="w-6 h-6 text-green-400 validation-check" />
                  ) : step.status === 'loading' ? (
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  ) : (
                    <step.icon className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className={`
                    text-sm transition-colors duration-300
                    ${step.status === 'complete' ? 'text-green-400' :
                      step.status === 'loading' ? 'text-blue-400' :
                      'text-gray-500'}
                  `}>
                    {step.label}
                  </p>
                  {step.status === 'loading' && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div className="bg-gradient-to-r from-blue-500 to-gold-500 h-1 rounded-full loading-progress" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="glass-card-inner p-4">
            <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
              <Shield className="w-3 h-3" />
              <span>256-bit Encrypted Connection</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}