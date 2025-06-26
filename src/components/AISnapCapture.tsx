
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Camera, Upload, Loader2, Lock, Coins, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/hooks/use-toast';

interface AISnapCaptureProps {
  onCapture: (extractedData: any) => void;
  coinBalance?: number;
  isProUser?: boolean;
  freeSnapsLeft?: number;
}

const AISnapCapture = ({ 
  onCapture, 
  coinBalance = 0, 
  isProUser = false, 
  freeSnapsLeft = 3 
}: AISnapCaptureProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canUseAISnap = isProUser || freeSnapsLeft > 0 || coinBalance >= 1;

  const simulateAIExtraction = (imageFile: File) => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    // Simulate AI processing time
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        // Mock extracted data
        const extractedData = {
          name: "Dr. Rakesh Sharma",
          company: "MedCore Pharmaceuticals",
          email: "rakesh.sharma@medcore.com",
          phone: "+91 98765 43210",
          designation: "Chief Pharmacist",
          event: "BioAsia Expo 2024",
          capturedAt: new Date().toISOString(),
          confidence: 95
        };
        
        setIsProcessing(false);
        setProgress(0);
        setCapturedImage(null);
        onCapture(extractedData);
      }, 500);
    }, 3000);
  };

  const handleImageCapture = (file: File) => {
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Start AI processing
    simulateAIExtraction(file);
  };

  const handleCameraClick = () => {
    if (!canUseAISnap) {
      toast({
        title: "AI Snap requires coins or upgrade",
        description: `You need 1 WowCoin per scan or upgrade to Pro. Current balance: ${coinBalance} coins.`,
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would open the camera
    // For demo, we'll simulate with file input
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && canUseAISnap) {
      handleImageCapture(file);
    }
  };

  if (isProcessing) {
    return (
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
        <CardContent className="p-8 text-center space-y-4">
          <div className="relative mb-6">
            {capturedImage && (
              <img 
                src={capturedImage} 
                alt="Captured card" 
                className="w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-5 h-5 text-cyan-600 animate-spin" />
              <h3 className="text-lg font-semibold text-slate-800">Uploading & Extracting Details...</h3>
            </div>
            <p className="text-slate-600">AI is analyzing the business card</p>
            
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-slate-500">{Math.round(progress)}% confidence detected</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          capture="environment"
        />
        
        <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">AI Snap Card</h3>
                <div className="flex items-center space-x-2">
                  {!isProUser && (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      {freeSnapsLeft} free left
                    </Badge>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-1 text-sm text-slate-600">
                        <Coins className="w-4 h-4" />
                        <span>1 coin</span>
                        <HelpCircle className="w-3 h-3" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Uses 1 WowCoin per scan</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              
              <Button
                onClick={handleCameraClick}
                disabled={!canUseAISnap}
                className={`w-full h-20 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  canUseAISnap 
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {!canUseAISnap && <Lock className="w-5 h-5" />}
                  <Camera className="w-6 h-6" />
                  <div className="flex flex-col items-start">
                    <span>Snap Business Card</span>
                    <span className="text-sm opacity-80">Instant extraction</span>
                  </div>
                </div>
              </Button>
              
              {!canUseAISnap && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800 text-center">
                    🔒 Need 1 WowCoin or upgrade to Pro for unlimited scans
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-4">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-500 text-sm">or</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="w-full h-16 flex items-center space-x-3 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50"
        >
          <Upload className="w-6 h-6" />
          <span>Upload from Gallery</span>
        </Button>
      </div>
    </TooltipProvider>
  );
};

export default AISnapCapture;
