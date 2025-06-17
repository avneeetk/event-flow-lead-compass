
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, Loader2 } from 'lucide-react';

interface AISnapCaptureProps {
  onCapture: (extractedData: any) => void;
}

const AISnapCapture = ({ onCapture }: AISnapCaptureProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateAIExtraction = (imageFile: File) => {
    setIsProcessing(true);
    
    // Simulate AI processing time
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
      setCapturedImage(null);
      onCapture(extractedData);
    }, 2000);
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
    // In a real app, this would open the camera
    // For demo, we'll simulate with file input
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageCapture(file);
    }
  };

  if (isProcessing) {
    return (
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
        <CardContent className="p-8 text-center">
          <div className="relative mb-6">
            {capturedImage && (
              <img 
                src={capturedImage} 
                alt="Captured card" 
                className="w-full h-32 object-cover rounded-lg"
              />
            )}
            <div className="absolute inset-0 bg-cyan-600/20 rounded-lg flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Processing Card...</h3>
          <p className="text-slate-600 mb-4">Extracting contact information</p>
          
          <div className="w-full bg-cyan-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
          <p className="text-sm text-slate-500 mt-2">95% confidence detected</p>
        </CardContent>
      </Card>
    );
  }

  return (
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
          <Button
            onClick={handleCameraClick}
            className="w-full h-24 text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <Camera className="w-8 h-8" />
              <span>AI Snap Card</span>
            </div>
          </Button>
          
          <p className="text-slate-600 mt-3 text-center">
            Point camera at business card for instant capture
          </p>
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
  );
};

export default AISnapCapture;
