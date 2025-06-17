
import { useState, useEffect } from 'react';
import RegistrationScreen from '../components/RegistrationScreen';
import OnboardingScreen from '../components/OnboardingScreen';
import LeadCaptureScreen from '../components/LeadCaptureScreen';
import ContactDashboard from '../components/ContactDashboard';
import FollowUpAssistant from '../components/FollowUpAssistant';
import ROIDashboard from '../components/ROIDashboard';
import TeamCollaboration from '../components/TeamCollaboration';
import BottomNavigation from '../components/BottomNavigation';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState('capture');
  const [isEventModeActive, setIsEventModeActive] = useState(false);

  useEffect(() => {
    const registrationComplete = localStorage.getItem('registrationComplete');
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    const eventMode = localStorage.getItem('eventModeActive');
    
    if (registrationComplete === 'true') {
      setHasRegistered(true);
    }
    if (onboardingComplete === 'true') {
      setHasCompletedOnboarding(true);
    }
    if (eventMode === 'true') {
      setIsEventModeActive(true);
    }
  }, []);

  const completeRegistration = (userData: any) => {
    localStorage.setItem('registrationComplete', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    setHasRegistered(true);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setHasCompletedOnboarding(true);
  };

  const activateEventMode = () => {
    localStorage.setItem('eventModeActive', 'true');
    setIsEventModeActive(true);
  };

  if (!hasRegistered) {
    return <RegistrationScreen onComplete={completeRegistration} />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={completeOnboarding} onActivateEventMode={activateEventMode} />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'capture':
        return <LeadCaptureScreen isEventModeActive={isEventModeActive} />;
      case 'contacts':
        return <ContactDashboard />;
      case 'followup':
        return <FollowUpAssistant />;
      case 'roi':
        return <ROIDashboard />;
      case 'team':
        return <TeamCollaboration />;
      default:
        return <LeadCaptureScreen isEventModeActive={isEventModeActive} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {/* Event Mode Banner */}
        {isEventModeActive && (
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 text-sm font-medium">
            🟢 Event Mode Active - 3 days left in free trial
          </div>
        )}
        
        {renderCurrentView()}
        <BottomNavigation currentView={currentView} onViewChange={setCurrentView} />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
