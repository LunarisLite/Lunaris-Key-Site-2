import React, { useState, useEffect } from 'react';
import { AuthenticationScreen } from './components/AuthenticationScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { EnhancedLunarisKeyAPI } from './utils/enhancedKeySystem';

type AppState = 'auth' | 'loading' | 'dashboard';
type UserType = 'developer' | 'premium' | 'standard';

export default function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userType, setUserType] = useState<UserType>('standard');
  const [keyExpiry, setKeyExpiry] = useState<Date | undefined>();

  // Check for existing session on app load
  useEffect(() => {
    const existingSession = EnhancedLunarisKeyAPI.getCurrentSession();
    if (existingSession) {
      setUserType(existingSession.keyType);
      setKeyExpiry(new Date(existingSession.expiresAt));
      setAppState('dashboard');
    }
  }, []);

  const handleAuthentication = (type: UserType, expiry?: Date) => {
    setUserType(type);
    setKeyExpiry(expiry);
    setAppState('loading');
  };

  const handleLoadingComplete = () => {
    setAppState('dashboard');
  };

  const handleLogout = () => {
    EnhancedLunarisKeyAPI.clearSession();
    setAppState('auth');
    setActiveSection('dashboard');
    setUserType('standard');
    setKeyExpiry(undefined);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  if (appState === 'auth') {
    return <AuthenticationScreen onAuthenticated={handleAuthentication} />;
  }

  if (appState === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative dashboard-enter">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* Header */}
      <Header isOnline={true} userType={userType} />
      
      {/* Sidebar Navigation */}
      <div className="sidebar-enter">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onLogout={handleLogout}
          userType={userType}
          keyExpiry={keyExpiry}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 content-transition pt-20">
        <DashboardContent 
          activeSection={activeSection} 
          userType={userType}
          keyExpiry={keyExpiry}
        />
        
        {/* Footer */}
        <div className="ml-72 px-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}