
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Badge as BadgeIcon, MessageSquare, Mic, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AISnapCapture from './AISnapCapture';
import LeadEditModal from './LeadEditModal';

interface LeadCaptureScreenProps {
  isEventModeActive: boolean;
}

const LeadCaptureScreen = ({ isEventModeActive }: LeadCaptureScreenProps) => {
  const [todayCount, setTodayCount] = useState(47);
  const [showEditModal, setShowEditModal] = useState(false);
  const [capturedLead, setCapturedLead] = useState<any>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(true);

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
      title: "Lead Captured!",
      description: isOfflineMode 
        ? "Saved offline - will sync when connected" 
        : "Lead saved and synced successfully",
    });
  };

  const simulateQuickCapture = () => {
    setTodayCount(prev => prev + 1);
    toast({
      title: "Quick Lead Added!",
      description: "Lead captured via manual entry",
    });
  };

  return (
    <div className="p-4 pb-20 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with status */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEventModeActive ? "Event Mode" : "Lead Capture"}
          </h1>
          <p className="text-gray-600">BioAsia Expo 2024</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isOfflineMode ? "secondary" : "default"} className="px-3 py-1">
            {isOfflineMode ? "📱 Offline Ready" : "🌐 Auto Sync"}
          </Badge>
        </div>
      </div>

      {/* Stats Card */}
      <Card className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Today's Captures</p>
              <p className="text-3xl font-bold">{todayCount}</p>
            </div>
            <div className="text-right">
              <p className="text-blue-100">Target: 200</p>
              <div className="w-20 h-2 bg-blue-400 rounded-full mt-2">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((todayCount / 200) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-blue-100 mt-1">
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
          className="h-16 flex flex-col space-y-1"
          onClick={simulateQuickCapture}
        >
          <Plus className="w-6 h-6" />
          <span className="font-semibold">Manual Entry</span>
          <span className="text-xs text-gray-500">Quick add</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col space-y-1">
          <Mic className="w-6 h-6" />
          <span className="font-semibold">Voice Note</span>
          <span className="text-xs text-gray-500">Record audio</span>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Recent Captures</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Dr. Priya Patel", company: "HealthFirst", time: "2 min ago", tags: ["Hot Lead"] },
              { name: "Rakesh Kumar", company: "MedCore", time: "15 min ago", tags: ["Distributor"] },
              { name: "Sarah Johnson", company: "BioTech", time: "1 hour ago", tags: ["Decision Maker"] }
            ].map((lead, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{lead.name}</p>
                  <p className="text-sm text-gray-600">{lead.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{lead.time}</p>
                  <div className="flex gap-1 mt-1">
                    {lead.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
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
    </div>
  );
};

export default LeadCaptureScreen;
