
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, Camera, Wifi, Users, BarChart3 } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
  onActivateEventMode: () => void;
}

const OnboardingScreen = ({ onComplete, onActivateEventMode }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to WOW Circle",
      subtitle: "Event Mode",
      description: "The AI-powered contact capture system that works offline and converts connections 3x faster.",
      icon: <Badge className="w-16 h-16 text-cyan-400" />,
      features: [
        "AI Snap card recognition",
        "Offline-first design",
        "Auto follow-up emails",
        "ROI tracking dashboard"
      ]
    },
    {
      title: "AI Snap Technology",
      subtitle: "Instant Contact Capture",
      description: "Just snap a business card and watch AI extract all contact details instantly.",
      icon: <Camera className="w-16 h-16 text-cyan-400" />,
      features: [
        "Camera-based card scanning",
        "Auto-fill contact forms",
        "Voice note integration", 
        "Instant email drafting"
      ]
    },
    {
      title: "Offline Ready",
      subtitle: "Never Miss a Contact",
      description: "Capture contacts even with poor Wi-Fi. Everything syncs when you're back online.",
      icon: <Wifi className="w-16 h-16 text-cyan-400" />,
      features: [
        "Works without internet",
        "Auto-sync when connected",
        "Secure local storage",
        "Progress indicators"
      ]
    },
    {
      title: "Team Collaboration",
      subtitle: "Scale Your Success",
      description: "Share contacts with your team, track assignments, and collaborate in real-time.",
      icon: <Users className="w-16 h-16 text-cyan-400" />,
      features: [
        "Team contact sharing",
        "Assignment tracking",
        "Activity audit logs",
        "Role-based access"
      ]
    },
    {
      title: "ROI Dashboard",
      subtitle: "Prove Your Impact",
      description: "Track conversions, measure event ROI, and generate reports for your manager.",
      icon: <BarChart3 className="w-16 h-16 text-cyan-400" />,
      features: [
        "Conversion tracking",
        "Event ROI analysis",
        "Exportable reports",
        "Pipeline visibility"
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      activateAndComplete();
    }
  };

  const activateAndComplete = () => {
    onActivateEventMode();
    // Set flag to show walkthrough on first app load
    localStorage.setItem('showWalkthrough', 'true');
    onComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Progress indicators */}
        <div className="flex justify-center mb-8 space-x-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-cyan-400 w-8' : 'bg-white/30 w-2'
              }`}
            />
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              {currentStepData.icon}
            </div>
            
            <h1 className="text-2xl font-bold mb-2">{currentStepData.title}</h1>
            <p className="text-lg font-medium text-cyan-300 mb-4">{currentStepData.subtitle}</p>
            <p className="text-white/80 mb-8 leading-relaxed">{currentStepData.description}</p>

            <div className="space-y-3 mb-8">
              {currentStepData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-left">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:from-cyan-300 hover:to-blue-400 font-semibold py-6 text-lg"
              >
                {currentStep === steps.length - 1 ? "Activate Event Mode" : "Continue"}
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button
                  onClick={activateAndComplete}
                  variant="ghost"
                  className="w-full text-white/80 hover:text-white hover:bg-white/10"
                >
                  Skip & Activate Event Mode
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingScreen;
