import { useEffect, useState } from 'react';

export type UserTier = 'developer' | 'premium' | 'public';

export interface KeyData {
  key: string;
  tier: UserTier;
  expiresAt: Date;
  createdAt: Date;
  isActive: boolean;
}

// Secure key storage (in production, this would be a database)
const VALID_KEYS: Record<string, KeyData> = {
  // Developer Keys (Lifetime)
  'WAVEZQ-DEV-7K9M2P8X4N': {
    key: 'WAVEZQ-DEV-7K9M2P8X4N',
    tier: 'developer',
    expiresAt: new Date('2099-12-31'),
    createdAt: new Date(),
    isActive: true
  },
  'LUNARIS-CORE-9X7V3Q1Z': {
    key: 'LUNARIS-CORE-9X7V3Q1Z',
    tier: 'developer',
    expiresAt: new Date('2099-12-31'),
    createdAt: new Date(),
    isActive: true
  },
  'WAVEZQLITE446722': { // Your existing key
    key: 'WAVEZQLITE446722',
    tier: 'developer',
    expiresAt: new Date('2099-12-31'),
    createdAt: new Date(),
    isActive: true
  },
  
  // Premium Keys (30 days)
  'LUNARIS-PRO-H4K8L9M3': {
    key: 'LUNARIS-PRO-H4K8L9M3',
    tier: 'premium',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    isActive: true
  },
  'PREMIUM-X9V7B4N2Q6': {
    key: 'PREMIUM-X9V7B4N2Q6',
    tier: 'premium',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    isActive: true
  },
  'LUNARIS-ELITE-5T8R3W': {
    key: 'LUNARIS-ELITE-5T8R3W',
    tier: 'premium',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    isActive: true
  },
  
  // Public Keys (24 hours) - Auto-generated examples
  'PUBLIC-2M9K7X4L6P': {
    key: 'PUBLIC-2M9K7X4L6P',
    tier: 'public',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    isActive: true
  },
  'TEMP-8N3V9Q1Z7R': {
    key: 'TEMP-8N3V9Q1Z7R',
    tier: 'public',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    isActive: true
  },
  'TRIAL-4X6M2L9K5W': {
    key: 'TRIAL-4X6M2L9K5W',
    tier: 'public',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    isActive: true
  }
};

export class KeyManager {
  private static instance: KeyManager;
  private keys: Record<string, KeyData> = VALID_KEYS;

  public static getInstance(): KeyManager {
    if (!KeyManager.instance) {
      KeyManager.instance = new KeyManager();
    }
    return KeyManager.instance;
  }

  private generateSecureId(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public generateKey(tier: UserTier): KeyData {
    const now = new Date();
    let expiresAt: Date;
    let prefix: string;

    switch (tier) {
      case 'developer':
        expiresAt = new Date('2099-12-31'); // Lifetime
        prefix = 'WAVEZQ-DEV';
        break;
      case 'premium':
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
        prefix = 'LUNARIS-PRO';
        break;
      case 'public':
        expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        prefix = 'PUBLIC';
        break;
      default:
        throw new Error('Invalid tier');
    }

    const keyId = this.generateSecureId();
    const key = `${prefix}-${keyId}`;

    const keyData: KeyData = {
      key,
      tier,
      expiresAt,
      createdAt: now,
      isActive: true
    };

    this.keys[key] = keyData;
    return keyData;
  }

  public validateKey(key: string): { isValid: boolean; keyData?: KeyData; reason?: string } {
    const upperKey = key.toUpperCase().trim();
    const keyData = this.keys[upperKey];

    if (!keyData) {
      return { isValid: false, reason: 'Key not found' };
    }

    if (!keyData.isActive) {
      return { isValid: false, reason: 'Key has been deactivated' };
    }

    if (new Date() > keyData.expiresAt) {
      return { isValid: false, reason: 'Key has expired' };
    }

    return { isValid: true, keyData };
  }

  public getKeyData(key: string): KeyData | null {
    return this.keys[key.toUpperCase().trim()] || null;
  }

  public deactivateKey(key: string): boolean {
    const keyData = this.keys[key.toUpperCase().trim()];
    if (keyData) {
      keyData.isActive = false;
      return true;
    }
    return false;
  }

  public getAllKeys(): KeyData[] {
    return Object.values(this.keys);
  }
}

// Hook for using KeyManager in components
export function useKeyManager() {
  const [keyManager] = useState(() => KeyManager.getInstance());
  return keyManager;
}

// Export pre-generated secure keys for immediate use
export const SECURE_KEYS = {
  developer: [
    'WAVEZQ-DEV-7K9M2P8X4N',
    'LUNARIS-CORE-9X7V3Q1Z',
    'WAVEZQLITE446722'
  ],
  premium: [
    'LUNARIS-PRO-H4K8L9M3',
    'PREMIUM-X9V7B4N2Q6',
    'LUNARIS-ELITE-5T8R3W'
  ],
  public: [
    'PUBLIC-2M9K7X4L6P',
    'TEMP-8N3V9Q1Z7R',
    'TRIAL-4X6M2L9K5W'
  ]
};