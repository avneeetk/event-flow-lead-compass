
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Badge as BadgeIcon, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LeadCaptureScreen = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [quickNote, setQuickNote] = useState('');
  const [todayCount, setTodayCount] = useState(47);

  const simulateBadgeScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      setTodayCount(prev => prev + 1);
      toast({
        title: "Lead Captured!",
        description: "Saved offline - will sync when connected",
      });
      setQuickNote('');
    }, 1500);
  };

  const quickTags = ["Hot Lead", "Pharmacist", "Distributor", "Decision Maker", "Follow up tomorrow"];

  return (
    <div className="p-4 pb-20 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header with offline status */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Event Mode</h1>
          <p className="text-gray-600">BioAsia Expo 2024</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isOfflineMode ? "secondary" : "default"} className="px-3 py-1">
            {isOfflineMode ? "Offline Ready" : "Auto Sync"}
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Capture Button */}
      <Card className="mb-6">
        <CardContent className="p-6 text-center">
          <Button
            onClick={simulateBadgeScan}
            disabled={isScanning}
            className="w-full h-24 text-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
          >
            {isScanning ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Scanning Badge...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <BadgeIcon className="w-8 h-8" />
                <span>Scan Badge</span>
              </div>
            )}
          </Button>
          
          <p className="text-gray-500 mt-3">Tap to scan business card or badge</p>
        </CardContent>
      </Card>

      {/* Quick Note */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Quick Note</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Add a quick note about this lead..."
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            className="mb-4"
          />
          
          <div className="flex flex-wrap gap-2">
            {quickTags.map((tag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setQuickNote(prev => prev ? `${prev}, ${tag}` : tag)}
                className="text-xs"
              >
                {tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-16 flex flex-col space-y-1">
          <span className="font-semibold">Snap Card</span>
          <span className="text-xs text-gray-500">Take photo</span>
        </Button>
        <Button variant="outline" className="h-16 flex flex-col space-y-1">
          <span className="font-semibold">Voice Note</span>
          <span className="text-xs text-gray-500">Record audio</span>
        </Button>
      </div>
    </div>
  );
};

export default LeadCaptureScreen;
