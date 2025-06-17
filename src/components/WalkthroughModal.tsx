
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Camera, Mail, Filter, Users } from 'lucide-react';

interface WalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalkthroughModal = ({ isOpen, onClose }: WalkthroughModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Scan Your First Card",
      description: "Tap the AI Snap button to scan business cards instantly. The AI will extract all contact details automatically.",
      icon: <Camera className="w-12 h-12 text-cyan-400" />,
      highlight: "Try scanning a business card now!"
    },
    {
      title: "Review & Edit Details",
      description: "After scanning, review the extracted information and add personal notes or tags before saving.",
      icon: <Mail className="w-12 h-12 text-cyan-400" />,
      highlight: "Add context like 'Interested in diabetes products'"
    },
    {
      title: "Smart Follow-up",
      description: "Send personalized follow-up emails with AI-generated templates. Include your WOW Circle signature to grow our community.",
      icon: <Mail className="w-12 h-12 text-cyan-400" />,
      highlight: "Professional emails in seconds, not minutes"
    },
    {
      title: "Filter & Organize",
      description: "Use smart filters to organize your contacts by type, status, or event. Find any contact instantly.",
      icon: <Filter className="w-12 h-12 text-cyan-400" />,
      highlight: "Hot leads, warm prospects, or cold contacts"
    },
    {
      title: "Team Collaboration",
      description: "Share contacts with teammates, assign follow-ups, and track team activity with full audit logs.",
      icon: <Users className="w-12 h-12 text-cyan-400" />,
      highlight: "Perfect for sales teams and managers"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeWalkthrough();
    }
  };

  const completeWalkthrough = () => {
    localStorage.setItem('walkthroughCompleted', 'true');
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white border-cyan-200 shadow-xl">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            {currentStepData.icon}
            <div>
              <CardTitle className="text-slate-800">{currentStepData.title}</CardTitle>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{currentStepData.description}</p>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
              <p className="text-cyan-800 font-medium text-sm">{currentStepData.highlight}</p>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-cyan-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={completeWalkthrough}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Skip
            </Button>
            <Button
              onClick={nextStep}
              className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-300 hover:to-blue-400"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalkthroughModal;
