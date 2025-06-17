
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mic, Plus, HelpCircle } from 'lucide-react';
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

      {/* Stats Card */}
      <Card className="mb-6 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-300">Today's Captures</p>
              <p className="text-3xl font-bold">{todayCount}</p>
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
        <AISnapCapture onCapture={handleLeadCapture} />
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
          <span className="text-xs text-slate-500">Quick add</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-16 flex flex-col space-y-1 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50"
        >
          <Mic className="w-6 h-6 text-slate-600" />
          <span className="font-semibold text-slate-700">Voice Note</span>
          <span className="text-xs text-slate-500">Record audio</span>
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
              { name: "Dr. Priya Patel", company: "HealthFirst", time: "2 min ago", tags: ["Hot Contact"] },
              { name: "Rakesh Kumar", company: "MedCore", time: "15 min ago", tags: ["Distributor"] },
              { name: "Sarah Johnson", company: "BioTech", time: "1 hour ago", tags: ["Decision Maker"] }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{lead.name}</p>
                  <p className="text-sm text-slate-600">{lead.company}</p>
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
