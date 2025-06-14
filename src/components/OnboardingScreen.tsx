
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, Calendar, User } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Wow Circle",
      subtitle: "Event Mode",
      description: "The fastest way to capture and convert trade show leads",
      icon: <Badge className="w-16 h-16 text-blue-600" />,
      features: [
        "One-tap badge scanning",
        "Works offline",
        "Team collaboration",
        "ROI tracking"
      ]
    },
    {
      title: "Ready for Action",
      subtitle: "Offline-First Design",
      description: "Capture leads even with poor Wi-Fi. Everything syncs automatically when connected.",
      icon: <Calendar className="w-16 h-16 text-green-600" />,
      features: [
        "Offline capture ready",
        "Auto-sync when online",
        "Voice notes supported",
        "Quick tagging system"
      ]
    },
    {
      title: "Let's Get Started",
      subtitle: "Time to Capture Leads",
      description: "Ready to turn your next trade show into a lead generation machine?",
      icon: <User className="w-16 h-16 text-purple-600" />,
      features: [
        "24hr follow-up reminders",
        "Email templates ready",
        "Performance analytics",
        "Export capabilities"
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const skip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Progress indicators */}
        <div className="flex justify-center mb-8 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-white' : 'bg-white/30'
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
            <p className="text-lg font-medium text-white/90 mb-4">{currentStepData.subtitle}</p>
            <p className="text-white/80 mb-8 leading-relaxed">{currentStepData.description}</p>

            <div className="space-y-3 mb-8">
              {currentStepData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-left">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                onClick={nextStep}
                className="w-full bg-white text-blue-700 hover:bg-white/90 font-semibold py-6 text-lg"
              >
                {currentStep === steps.length - 1 ? "Start Capturing Leads" : "Continue"}
              </Button>
              
              {currentStep < steps.length - 1 && (
                <Button
                  onClick={skip}
                  variant="ghost"
                  className="w-full text-white/80 hover:text-white hover:bg-white/10"
                >
                  Skip Introduction
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
