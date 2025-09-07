import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Download, Shield, ExternalLink, CheckCircle, Clock, Zap } from 'lucide-react';
import { EnhancedLunarisKeyAPI } from '../utils/enhancedKeySystem';

interface DownloadPanelProps {
  userType: 'developer' | 'premium' | 'standard';
}

export function DownloadPanel({ userType }: DownloadPanelProps) {
  const [isKeyVerified, setIsKeyVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [downloadStats, setDownloadStats] = useState({
    fileSize: '47.2 MB',
    lastUpdated: '2 hours ago',
    downloads: userType === 'developer' ? '1,247' : '---',
    version: userType === 'developer' ? 'v1.3.0-dev' : 'v1.2.4'
  });

  useEffect(() => {
    // Check if user has necessary permissions
    const hasDownloadPermission = EnhancedLunarisKeyAPI.hasPermission('download');
    if (hasDownloadPermission) {
      setIsKeyVerified(true);
    }
  }, []);

  const handleKeyVerification = () => {
    setIsVerifying(true);
    // Simulate Linkvertise verification process
    setTimeout(() => {
      // Simulate verification response
      window.open('https://linkvertise.com/1267303/lunaris-download', '_blank');
      
      // After a delay, simulate successful verification
      setTimeout(() => {
        setIsVerifying(false);
        setIsKeyVerified(true);
      }, 3000);
    }, 1000);
  };

  const handleDownload = () => {
    if (!isKeyVerified) return;
    
    // Simulate file download based on user type
    const fileName = userType === 'developer' 
      ? 'Lunaris-v1.3.0-dev-build.apk' 
      : userType === 'premium'
      ? 'Lunaris-v1.2.4-premium.apk'
      : 'Lunaris-v1.2.4-standard.apk';
    
    // Create a dummy download (in real implementation, this would be a real file)
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,Lunaris Download - Replace with actual file');
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getFeatureList = () => {
    const baseFeatures = ['Core Exploit Framework', 'Script Injection', 'Anti-Detection'];
    
    if (userType === 'premium') {
      baseFeatures.push('Priority Updates', 'Advanced Scripts', 'Premium Support');
    }
    
    if (userType === 'developer') {
      baseFeatures.push('Debug Console', 'API Access', 'Beta Features', 'Source Access');
    }
    
    return baseFeatures;
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-white">
                  Lunaris {downloadStats.version}
                </h2>
                <Badge 
                  variant={userType === 'developer' ? 'default' : userType === 'premium' ? 'secondary' : 'outline'}
                  className={`${
                    userType === 'developer' ? 'bg-gold-500/20 text-gold-400 border-gold-500/30' :
                    userType === 'premium' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                    'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}
                >
                  {userType === 'developer' ? 'DEV BUILD' : userType.toUpperCase()}
                </Badge>
              </div>
              <p className="text-gray-400">
                {userType === 'developer' 
                  ? 'Latest development build with experimental features'
                  : userType === 'premium'
                  ? 'Premium release with enhanced capabilities'
                  : 'Stable release with core functionality'
                }
              </p>
            </div>
            <div className="text-right text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Updated {downloadStats.lastUpdated}</span>
              </div>
              <div className="mt-1">Size: {downloadStats.fileSize}</div>
              {userType === 'developer' && (
                <div className="mt-1">Downloads: {downloadStats.downloads}</div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="glass-card-inner p-4">
            <h3 className="text-lg font-medium text-white mb-3">Included Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {getFeatureList().map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-4">
            <Button
              onClick={handleDownload}
              disabled={!isKeyVerified}
              className={`
                w-full py-4 text-lg font-medium transition-all duration-300 btn-glow
                ${isKeyVerified 
                  ? `bg-gradient-to-r from-${userType === 'developer' ? 'gold' : userType === 'premium' ? 'purple' : 'blue'}-500 to-${userType === 'developer' ? 'gold' : userType === 'premium' ? 'purple' : 'blue'}-600 hover:from-${userType === 'developer' ? 'gold' : userType === 'premium' ? 'purple' : 'blue'}-400 hover:to-${userType === 'developer' ? 'gold' : userType === 'premium' ? 'purple' : 'blue'}-500 glow-blue-gold` 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              <Download className="w-5 h-5 mr-2" />
              {isKeyVerified ? 'Download Now' : 'Verify Key to Continue'}
            </Button>

            {/* Key Verification */}
            {!isKeyVerified && (
              <div className="glass-card-inner p-4 space-y-4">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-white mb-1">Security Verification Required</h3>
                  <p className="text-sm text-gray-400">
                    Complete Linkvertise verification to unlock your download
                  </p>
                </div>
                
                <Button
                  onClick={handleKeyVerification}
                  disabled={isVerifying}
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400 py-3"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mr-2" />
                      Redirecting to Linkvertise...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Start Verification
                    </>
                  )}
                </Button>
              </div>
            )}

            {isKeyVerified && (
              <div className="glass-card-inner p-4 bg-green-500/10 border-green-500/30">
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Verification Complete!</span>
                </div>
                <p className="text-sm text-gray-300 text-center mt-2">
                  Your download is ready. Click the button above to begin.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Additional Info for Developers */}
      {userType === 'developer' && (
        <Card className="glass-card p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-4 h-4 text-gold-400" />
            <h3 className="text-sm font-medium text-white">Developer Information</h3>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Build includes debug symbols and logging</p>
            <p>• API endpoints accessible for testing</p>
            <p>• Source maps included for debugging</p>
            <p>• Experimental features may be unstable</p>
          </div>
        </Card>
      )}
    </div>
  );
}