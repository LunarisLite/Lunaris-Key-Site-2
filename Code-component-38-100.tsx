// Enhanced Lunaris Key System - Enterprise-grade key management with device tracking and server simulation

export interface DeviceFingerprint {
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  hardwareConcurrency: number;
  deviceMemory?: number;
  cookieEnabled: boolean;
  doNotTrack: string | null;
  fingerprint: string;
}

export interface LunarisKey {
  id: string;
  key: string;
  type: 'developer' | 'premium' | 'standard';
  createdAt: string;
  expiresAt: string;
  used?: boolean;
  usedAt?: string;
  boundTo?: {
    ip?: string;
    deviceId?: string;
    fingerprint?: string;
    location?: string;
  };
  permissions: string[];
  metadata: {
    generatedBy?: string;
    notes?: string;
    usageCount: number;
    lastActive?: string;
  };
}

export interface SessionData {
  keyId: string;
  keyType: 'developer' | 'premium' | 'standard';
  expiresAt: string;
  usedAt: string;
  sessionId: string;
  deviceFingerprint: DeviceFingerprint;
  ipAddress: string;
  permissions: string[];
}

export interface KeyValidationResult {
  isValid: boolean;
  key?: LunarisKey;
  reason?: string;
  accessLevel: 'developer' | 'premium' | 'standard' | 'none';
  expiresAt?: Date;
  permissions: string[];
  sessionData?: SessionData;
}

export interface KeyManagementAction {
  action: 'revoke' | 'extend' | 'modify' | 'transfer';
  keyId: string;
  reason?: string;
  newExpiry?: string;
  newPermissions?: string[];
  targetDevice?: string;
}

// Enhanced key database with permissions and metadata
const LUNARIS_KEYS: LunarisKey[] = [
  // Developer Keys (10) - Full access
  {
    id: "dev-1",
    key: "DEV-mf92ujes-1pUqsVIY-002j",
    type: "developer",
    createdAt: "2025-09-07T02:32:04.804Z",
    expiresAt: "2027-09-07T02:32:04.804Z",
    permissions: ["download", "admin", "revoke_keys", "view_analytics", "manage_users", "debug_mode"],
    metadata: {
      generatedBy: "system",
      notes: "Lead developer access",
      usageCount: 0
    }
  },
  {
    id: "dev-2",
    key: "DEV-mf92ujes-pErPQHKY-002k",
    type: "developer",
    createdAt: "2025-09-07T02:32:04.804Z",
    expiresAt: "2027-09-07T02:32:04.804Z",
    permissions: ["download", "admin", "revoke_keys", "view_analytics", "manage_users", "debug_mode"],
    metadata: {
      generatedBy: "system",
      notes: "Senior developer access",
      usageCount: 0
    }
  },
  // Premium Keys (20) - Enhanced features
  {
    id: "prm-1",
    key: "PRM-mf92ujes-fWaE7L9z-001z",
    type: "premium",
    createdAt: "2025-09-07T02:32:04.804Z",
    expiresAt: "2026-09-07T02:32:04.804Z",
    permissions: ["download", "priority_support", "beta_access", "advanced_features"],
    metadata: {
      generatedBy: "system",
      notes: "Premium subscriber",
      usageCount: 0
    }
  },
  // Standard Keys (70) - Basic access
  {
    id: "std-1",
    key: "STD-mf92ujer-JkINbLb0-0001",
    type: "standard",
    createdAt: "2025-09-07T02:32:04.803Z",
    expiresAt: "2025-10-07T02:32:04.803Z",
    permissions: ["download"],
    metadata: {
      generatedBy: "system",
      notes: "Standard access",
      usageCount: 0
    }
  }
];

// Server-side storage simulation
const SERVER_STORAGE_KEY = 'lunaris_server_data';
const SESSION_STORAGE_KEY = 'lunaris_session_data';
const DEVICE_STORAGE_KEY = 'lunaris_device_data';

interface ServerData {
  usedKeys: Array<{
    keyId: string;
    deviceId: string;
    ipAddress: string;
    usedAt: string;
    fingerprint: string;
  }>;
  sessions: Record<string, SessionData>;
  deviceBindings: Record<string, string[]>; // deviceId -> keyIds
  keyRevocations: Record<string, { revokedAt: string; reason: string; revokedBy: string }>;
  analytics: {
    totalActivations: number;
    uniqueDevices: number;
    dailyActive: Record<string, number>;
  };
}

export class EnhancedLunarisKeyAPI {
  private static async generateDeviceFingerprint(): Promise<DeviceFingerprint> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('Lunaris', 10, 10);
    
    const fingerprint = {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: (navigator as any).deviceMemory,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,
      fingerprint: ''
    };

    // Create a unique fingerprint hash
    const fingerprintString = JSON.stringify(fingerprint);
    fingerprint.fingerprint = await this.simpleHash(fingerprintString);
    
    return fingerprint;
  }

  private static async simpleHash(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
  }

  private static async getPublicIP(): Promise<string> {
    try {
      // Simulate IP detection - in real implementation, use a service like ipify
      return '192.168.1.' + Math.floor(Math.random() * 255);
    } catch {
      return 'unknown';
    }
  }

  private static getServerData(): ServerData {
    try {
      const stored = localStorage.getItem(SERVER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {
        usedKeys: [],
        sessions: {},
        deviceBindings: {},
        keyRevocations: {},
        analytics: {
          totalActivations: 0,
          uniqueDevices: 0,
          dailyActive: {}
        }
      };
    } catch {
      return {
        usedKeys: [],
        sessions: {},
        deviceBindings: {},
        keyRevocations: {},
        analytics: {
          totalActivations: 0,
          uniqueDevices: 0,
          dailyActive: {}
        }
      };
    }
  }

  private static saveServerData(data: ServerData): void {
    try {
      localStorage.setItem(SERVER_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save server data:', error);
    }
  }

  private static generateSessionId(): string {
    return 'LNR_' + Math.random().toString(36).substr(2, 12) + '_' + Date.now().toString(36);
  }

  private static isKeyExpired(expiresAt: string): boolean {
    return new Date() > new Date(expiresAt);
  }

  private static updateAnalytics(serverData: ServerData, deviceId: string): void {
    const today = new Date().toISOString().split('T')[0];
    serverData.analytics.totalActivations++;
    serverData.analytics.dailyActive[today] = (serverData.analytics.dailyActive[today] || 0) + 1;
    
    // Update unique devices count
    const uniqueDevices = new Set([
      ...serverData.usedKeys.map(k => k.deviceId),
      deviceId
    ]).size;
    serverData.analytics.uniqueDevices = uniqueDevices;
  }

  // Enhanced key validation
  public static async validateKey(inputKey: string): Promise<KeyValidationResult> {
    const serverData = this.getServerData();
    const deviceFingerprint = await this.generateDeviceFingerprint();
    const ipAddress = await this.getPublicIP();
    
    const cleanKey = inputKey.trim();
    const foundKey = LUNARIS_KEYS.find(k => k.key === cleanKey);
    
    if (!foundKey) {
      return {
        isValid: false,
        reason: 'Invalid key or key not found',
        accessLevel: 'none',
        permissions: []
      };
    }

    // Check if key is revoked
    if (serverData.keyRevocations[foundKey.id]) {
      const revocation = serverData.keyRevocations[foundKey.id];
      return {
        isValid: false,
        reason: `Key revoked: ${revocation.reason}`,
        accessLevel: 'none',
        permissions: []
      };
    }

    // Check if key has expired
    if (this.isKeyExpired(foundKey.expiresAt)) {
      return {
        isValid: false,
        reason: 'Key has expired',
        accessLevel: 'none',
        permissions: []
      };
    }

    // Check if key is already bound to a different device
    const deviceId = deviceFingerprint.fingerprint;
    const existingUsage = serverData.usedKeys.find(k => k.keyId === foundKey.id);
    
    if (existingUsage && existingUsage.deviceId !== deviceId) {
      return {
        isValid: false,
        reason: 'Key is bound to another device',
        accessLevel: 'none',
        permissions: []
      };
    }

    // If key hasn't been used, bind it to this device
    if (!existingUsage) {
      serverData.usedKeys.push({
        keyId: foundKey.id,
        deviceId,
        ipAddress,
        usedAt: new Date().toISOString(),
        fingerprint: deviceFingerprint.fingerprint
      });
      
      if (!serverData.deviceBindings[deviceId]) {
        serverData.deviceBindings[deviceId] = [];
      }
      serverData.deviceBindings[deviceId].push(foundKey.id);
    }

    // Create session
    const sessionId = this.generateSessionId();
    const sessionData: SessionData = {
      keyId: foundKey.id,
      keyType: foundKey.type,
      expiresAt: foundKey.expiresAt,
      usedAt: new Date().toISOString(),
      sessionId,
      deviceFingerprint,
      ipAddress,
      permissions: foundKey.permissions
    };

    serverData.sessions[sessionId] = sessionData;
    this.updateAnalytics(serverData, deviceId);
    this.saveServerData(serverData);

    // Save session locally
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));

    return {
      isValid: true,
      key: foundKey,
      accessLevel: foundKey.type,
      expiresAt: new Date(foundKey.expiresAt),
      permissions: foundKey.permissions,
      sessionData
    };
  }

  public static getCurrentSession(): SessionData | null {
    try {
      const session = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!session) return null;

      const sessionData: SessionData = JSON.parse(session);
      
      if (this.isKeyExpired(sessionData.expiresAt)) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
      }

      return sessionData;
    } catch {
      return null;
    }
  }

  public static clearSession(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }

  // Developer-only functions
  public static async revokeKey(keyId: string, reason: string, revokedBy: string): Promise<boolean> {
    const session = this.getCurrentSession();
    if (!session || !session.permissions.includes('revoke_keys')) {
      return false;
    }

    const serverData = this.getServerData();
    serverData.keyRevocations[keyId] = {
      revokedAt: new Date().toISOString(),
      reason,
      revokedBy
    };
    
    // Remove from active sessions
    Object.keys(serverData.sessions).forEach(sessionId => {
      if (serverData.sessions[sessionId].keyId === keyId) {
        delete serverData.sessions[sessionId];
      }
    });

    this.saveServerData(serverData);
    return true;
  }

  public static getKeyAnalytics(): any {
    const session = this.getCurrentSession();
    if (!session || !session.permissions.includes('view_analytics')) {
      return null;
    }

    const serverData = this.getServerData();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    return {
      totalKeys: LUNARIS_KEYS.length,
      usedKeys: serverData.usedKeys.length,
      activeToday: Object.keys(serverData.sessions).length,
      uniqueDevices: serverData.analytics.uniqueDevices,
      totalActivations: serverData.analytics.totalActivations,
      keysByType: {
        developer: LUNARIS_KEYS.filter(k => k.type === 'developer').length,
        premium: LUNARIS_KEYS.filter(k => k.type === 'premium').length,
        standard: LUNARIS_KEYS.filter(k => k.type === 'standard').length
      },
      revokedKeys: Object.keys(serverData.keyRevocations).length,
      dailyActive: serverData.analytics.dailyActive
    };
  }

  public static getActiveSessions(): SessionData[] {
    const session = this.getCurrentSession();
    if (!session || !session.permissions.includes('view_analytics')) {
      return [];
    }

    const serverData = this.getServerData();
    return Object.values(serverData.sessions).filter(s => 
      !this.isKeyExpired(s.expiresAt)
    );
  }

  public static hasPermission(permission: string): boolean {
    const session = this.getCurrentSession();
    return session ? session.permissions.includes(permission) : false;
  }

  // Public stats (limited)
  public static getPublicStats() {
    return {
      systemOnline: true,
      lastUpdate: new Date().toISOString()
    };
  }

  // Format validation
  public static isValidKeyFormat(key: string): boolean {
    const patterns = {
      developer: /^DEV-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}$/,
      premium: /^PRM-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}$/,
      standard: /^STD-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}$/
    };

    const cleanKey = key.trim();
    return Object.values(patterns).some(pattern => pattern.test(cleanKey));
  }
}

export default EnhancedLunarisKeyAPI;