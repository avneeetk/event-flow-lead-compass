import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mic, Plus, HelpCircle, Crown, Coins } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AISnapCapture from './AISnapCapture';
import LeadEditModal from './LeadEditModal';
import WalkthroughModal from './WalkthroughModal';

interface LeadCaptureScreenProps {
  isEventModeActive: boolean;
}

const LeadCaptureScreen = ({ isEventModeActive }: LeadCaptureScreenProps) => {
  const [todayCount, setTodayCount] = useState(47);
  const [showEditModal, setShowEditModal] = useState(false);
  const [capturedLead, setCapturedLead] = useState<any>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [coinBalance, setCoinBalance] = useState(150);
  const [isProUser, setIsProUser] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(12);
  const [freeSnapsUsed, setFreeSnapsUsed] = useState(0);
  const [teamMembersCount, setTeamMembersCount] = useState(1);

  const freeSnapsLeft = Math.max(0, 3 - freeSnapsUsed);
  const maxFreeTeamMembers = 1;

  useEffect(() => {
    // Check if user should see walkthrough
    const shouldShowWalkthrough = localStorage.getItem('showWalkthrough');
    const walkthroughCompleted = localStorage.getItem('walkthroughCompleted');
    
    if (shouldShowWalkthrough === 'true' && !walkthroughCompleted) {
      setTimeout(() => setShowWalkthrough(true), 1000); // Delay for smooth transition
      localStorage.removeItem('showWalkthrough');
    }
  }, []);

  const handleLeadCapture = (extractedData: any) => {
    setCapturedLead(extractedData);
    setShowEditModal(true);
    
    // Update usage counters
    if (!isProUser && freeSnapsLeft > 0) {
      setFreeSnapsUsed(prev => prev + 1);
    } else if (!isProUser) {
      setCoinBalance(prev => Math.max(0, prev - 1));
    }
  };

  const handleSaveLead = (leadData: any) => {
    setTodayCount(prev => prev + 1);
    setShowEditModal(false);
    setCapturedLead(null);
    
    // Save to localStorage for offline functionality
    const existingLeads = JSON.parse(localStorage.getItem('capturedLeads') || '[]');
    const newLead = { ...leadData, id: Date.now() };
    localStorage.setItem('capturedLeads', JSON.stringify([...existingLeads, newLead]));
    
    toast({
      title: "Contact Captured!",
      description: isOfflineMode 
        ? "Saved offline - will sync when connected" 
        : "Contact saved and synced successfully",
    });
  };

  const simulateQuickCapture = () => {
    setTodayCount(prev => prev + 1);
    toast({
      title: "Quick Contact Added!",
      description: "Contact captured via manual entry",
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade to WowPro",
      description: "Unlock unlimited AI Snaps, team members & advanced features.",
    });
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header with status */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEventModeActive ? "Event Mode" : "Contact Capture"}
          </h1>
          <p className="text-slate-600">BioAsia Expo 2024</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isOfflineMode ? "secondary" : "default"} className="px-3 py-1">
            {isOfflineMode ? "📱 Offline Ready" : "🌐 Auto Sync"}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowWalkthrough(true)}
            className="text-slate-600 hover:text-slate-800"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Usage & Trial Banner */}
      {!isProUser && (
        <Card className="mb-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Crown className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-orange-800">Free Trial</span>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    {trialDaysLeft} days left
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-orange-700">
                  <div className="flex items-center space-x-1">
                    <span>⚡ AI Snaps: {freeSnapsLeft}/3 free</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Coins className="w-3 h-3" />
                    <span>{coinBalance} coins</span>
                  </div>
                </div>
              </div>
              <Button onClick={handleUpgrade} size="sm" className="bg-orange-600 hover:bg-orange-700">
                Upgrade to Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upgrade Nudge based on usage */}
      {!isProUser && freeSnapsLeft === 0 && coinBalance < 5 && (
        <Card className="mb-4 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-3 text-center">
            <p className="text-sm text-red-800 mb-2">
              🚨 Low on AI Snaps & Coins - Upgrade to continue capturing!
            </p>
            <Button onClick={handleUpgrade} size="sm" variant="outline" className="border-red-300 text-red-700">
              Get Unlimited Access
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats Card */}
      <Card className="mb-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-300">Today's Captures</p>
              <p className="text-3xl font-bold">{todayCount}</p>
              {!isProUser && (
                <p className="text-xs text-slate-400 mt-1">
                  💡 You've saved 4 hours with AI features
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-slate-300">Target: 200</p>
              <div className="w-20 h-2 bg-slate-600 rounded-full mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((todayCount / 200) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {Math.round((todayCount / 200) * 100)}% complete
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Snap Capture */}
      <div className="mb-6">
        <AISnapCapture 
          onCapture={handleLeadCapture} 
          coinBalance={coinBalance}
          isProUser={isProUser}
          freeSnapsLeft={freeSnapsLeft}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline" 
          className="h-16 flex flex-col space-y-1 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50"
          onClick={simulateQuickCapture}
        >
          <Plus className="w-6 h-6 text-slate-600" />
          <span className="font-semibold text-slate-700">Manual Entry</span>
          <span className="text-xs text-slate-500">Free</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex flex-col space-y-1 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50"
        >
          <Mic className="w-6 h-6 text-slate-600" />
          <span className="font-semibold text-slate-700">Voice Note</span>
          <span className="text-xs text-slate-500">Pro feature</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-slate-800">
            <MessageSquare className="w-5 h-5" />
            <span>Recent Captures</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Dr. Priya Patel", company: "HealthFirst", time: "2 min ago", tags: ["Hot Lead"], assignedTo: "You" },
              { name: "Rakesh Kumar", company: "MedCore", time: "15 min ago", tags: ["Distributor"], assignedTo: "Sarah" },
              { name: "Johnson Bros", company: "BioTech", time: "1 hour ago", tags: ["Follow-up"], assignedTo: "You" }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{lead.name}</p>
                  <p className="text-sm text-slate-600">{lead.company}</p>
                  <p className="text-xs text-slate-500">Assigned to {lead.assignedTo}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">{lead.time}</p>
                  <div className="flex gap-1 mt-1">
                    {lead.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs bg-cyan-100 text-cyan-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {showEditModal && capturedLead && (
        <LeadEditModal
          leadData={capturedLead}
          onSave={handleSaveLead}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* Walkthrough Modal */}
      <WalkthroughModal
        isOpen={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
      />
    </div>
  );
};

export default LeadCaptureScreen;
