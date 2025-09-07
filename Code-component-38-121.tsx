import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Server, 
  Users, 
  Key, 
  Shield, 
  Activity, 
  AlertTriangle, 
  Eye, 
  Ban, 
  RefreshCw,
  Database,
  Globe,
  Clock,
  Smartphone,
  MapPin,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { EnhancedLunarisKeyAPI } from '../utils/enhancedKeySystem';

export function DeveloperPanel() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [revokeKeyId, setRevokeKeyId] = useState('');
  const [revokeReason, setRevokeReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionResult, setActionResult] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const analyticsData = EnhancedLunarisKeyAPI.getKeyAnalytics();
      const sessionsData = EnhancedLunarisKeyAPI.getActiveSessions();
      
      setAnalytics(analyticsData);
      setActiveSessions(sessionsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      setLoading(false);
    }
  };

  const handleRevokeKey = async () => {
    if (!revokeKeyId || !revokeReason) {
      setActionResult({ type: 'error', message: 'Please provide both key ID and reason' });
      return;
    }

    const success = await EnhancedLunarisKeyAPI.revokeKey(revokeKeyId, revokeReason, 'admin');
    
    if (success) {
      setActionResult({ type: 'success', message: `Key ${revokeKeyId} revoked successfully` });
      setRevokeKeyId('');
      setRevokeReason('');
      loadData();
    } else {
      setActionResult({ type: 'error', message: 'Failed to revoke key' });
    }

    setTimeout(() => setActionResult(null), 5000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSessionStatusIcon = (session: any) => {
    const now = new Date();
    const lastActive = new Date(session.usedAt);
    const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceActive < 1) return <CheckCircle className="w-4 h-4 text-green-400" />;
    if (hoursSinceActive < 24) return <Clock className="w-4 h-4 text-yellow-400" />;
    return <XCircle className="w-4 h-4 text-red-400" />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="glass-card p-6">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Loading developer dashboard...</span>
          </div>
        </Card>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Unable to load analytics data. Please check your permissions.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Developer Console</h2>
          <p className="text-gray-400">Advanced system management and analytics</p>
        </div>
        <Button onClick={loadData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {actionResult && (
        <Alert className={actionResult.type === 'success' ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}>
          {actionResult.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertDescription>{actionResult.message}</AlertDescription>
        </Alert>
      )}

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card p-4 stats-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Database className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Keys</p>
              <p className="text-xl font-bold text-white">{analytics.totalKeys}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stats-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Today</p>
              <p className="text-xl font-bold text-white">{analytics.activeToday}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stats-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Unique Devices</p>
              <p className="text-xl font-bold text-white">{analytics.uniqueDevices}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stats-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-red-500/20">
              <Ban className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Revoked Keys</p>
              <p className="text-xl font-bold text-white">{analytics.revokedKeys}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
          <TabsTrigger value="keys">Key Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Server className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-medium text-white">Active Sessions</h3>
              <Badge variant="secondary">{activeSessions.length}</Badge>
            </div>
            
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {activeSessions.map((session, index) => (
                  <div key={index} className="glass-card-inner p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          {getSessionStatusIcon(session)}
                          <span className="text-sm font-medium text-white">
                            {session.keyType.toUpperCase()} - {session.keyId}
                          </span>
                          <Badge 
                            variant={session.keyType === 'developer' ? 'default' : 
                                   session.keyType === 'premium' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {session.keyType}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-gray-400 space-y-1">
                          <div className="flex items-center space-x-1">
                            <Globe className="w-3 h-3" />
                            <span>IP: {session.ipAddress}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Smartphone className="w-3 h-3" />
                            <span>Device: {session.deviceFingerprint.platform}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Last Active: {formatDate(session.usedAt)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right text-xs text-gray-500">
                        <div>Session ID</div>
                        <div className="font-mono">{session.sessionId.substring(0, 12)}...</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {activeSessions.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No active sessions</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Key className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-medium text-white">Key Revocation</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="keyId" className="text-sm text-gray-300">Key ID</Label>
                  <Input
                    id="keyId"
                    value={revokeKeyId}
                    onChange={(e) => setRevokeKeyId(e.target.value)}
                    placeholder="e.g., std-1, prm-1, dev-1"
                    className="glass-card-inner border-gray-600/50 bg-gray-800/30"
                  />
                </div>
                
                <div>
                  <Label htmlFor="reason" className="text-sm text-gray-300">Reason</Label>
                  <Input
                    id="reason"
                    value={revokeReason}
                    onChange={(e) => setRevokeReason(e.target.value)}
                    placeholder="Violation reason"
                    className="glass-card-inner border-gray-600/50 bg-gray-800/30"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleRevokeKey}
                className="bg-red-600 hover:bg-red-700"
                disabled={!revokeKeyId || !revokeReason}
              >
                <Ban className="w-4 h-4 mr-2" />
                Revoke Key
              </Button>
            </div>
          </Card>

          {/* Key Distribution */}
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-medium text-white">Key Distribution</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center glass-card-inner p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{analytics.keysByType.developer}</div>
                <div className="text-sm text-gray-400">Developer Keys</div>
              </div>
              <div className="text-center glass-card-inner p-4 rounded-lg">
                <div className="text-2xl font-bold text-gold-400">{analytics.keysByType.premium}</div>
                <div className="text-sm text-gray-400">Premium Keys</div>
              </div>
              <div className="text-center glass-card-inner p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{analytics.keysByType.standard}</div>
                <div className="text-sm text-gray-400">Standard Keys</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="glass-card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-medium text-white">Usage Analytics</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="glass-card-inner p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Total Activations</div>
                  <div className="text-3xl font-bold text-white">{analytics.totalActivations}</div>
                </div>
                
                <div className="glass-card-inner p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Keys in Use</div>
                  <div className="text-3xl font-bold text-white">
                    {analytics.usedKeys}/{analytics.totalKeys}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {((analytics.usedKeys / analytics.totalKeys) * 100).toFixed(1)}% utilization
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="glass-card-inner p-4 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Daily Active Users (Last 7 days)</div>
                  <div className="space-y-2">
                    {Object.entries(analytics.dailyActive || {})
                      .slice(-7)
                      .map(([date, count]) => (
                        <div key={date} className="flex justify-between text-xs">
                          <span className="text-gray-400">{date}</span>
                          <span className="text-white font-medium">{count as number}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}