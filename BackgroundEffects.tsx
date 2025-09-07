import React from 'react';

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-yellow-900/20" />
      
      {/* Animated Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
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

      {/* Circuit Lines */}
      <div className="circuit-lines">
        <div className="circuit-line circuit-line-1" />
        <div className="circuit-line circuit-line-2" />
        <div className="circuit-line circuit-line-3" />
      </div>

      {/* Glowing Orbs */}
      <div className="glowing-orb glowing-orb-1" />
      <div className="glowing-orb glowing-orb-2" />
    </div>
  );
}