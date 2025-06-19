import { useState, useEffect } from 'react';
import LoginScreen from '../components/LoginScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import OnboardingScreen from '../components/OnboardingScreen';
import LeadCaptureScreen from '../components/LeadCaptureScreen';
import ContactDashboard from '../components/ContactDashboard';
import FollowUpAssistant from '../components/FollowUpAssistant';
import ROIDashboard from '../components/ROIDashboard';
import TeamCollaboration from '../components/TeamCollaboration';
import TeamManagement from '../components/TeamManagement';
import BottomNavigation from '../components/BottomNavigation';
import SupportChat from '../components/SupportChat';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState('capture');
  const [isEventModeActive, setIsEventModeActive] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isGuestMode, setIsGuestMode] = useState(false);

  useEffect(() => {
    const loginComplete = localStorage.getItem('loginComplete');
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    const eventMode = localStorage.getItem('eventModeActive');
    const guestMode = localStorage.getItem('guestMode');
    
    if (loginComplete === 'true' || guestMode === 'true') {
      setHasLoggedIn(true);
      if (guestMode === 'true') {
        setIsGuestMode(true);
      }
    }
    if (onboardingComplete === 'true') {
      setHasCompletedOnboarding(true);
    }
    if (eventMode === 'true') {
      setIsEventModeActive(true);
    }
  }, []);

  const completeLogin = (credentials: any) => {
    localStorage.setItem('loginComplete', 'true');
    setHasLoggedIn(true);
  };

  const completeRegistration = (userData: any) => {
    localStorage.setItem('loginComplete', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    setHasLoggedIn(true);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setHasCompletedOnboarding(true);
  };

  const activateEventMode = () => {
    localStorage.setItem('eventModeActive', 'true');
    setIsEventModeActive(true);
  };

  const handleGuestMode = () => {
    localStorage.setItem('guestMode', 'true');
    setIsGuestMode(true);
    setHasLoggedIn(true);
    toast({
      title: "Guest Mode Activated",
      description: "You can explore the app. Some features may be limited.",
    });
  };

  // Handle auth flow
  if (!hasLoggedIn) {
    if (authMode === 'login') {
      return (
        <LoginScreen
          onLogin={completeLogin}
          onSwitchToRegister={() => setAuthMode('register')}
          onGuestMode={handleGuestMode}
        />
      );
    } else {
      return (
        <RegistrationScreen
          onComplete={completeRegistration}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  if (!hasCompletedOnboarding && !isGuestMode) {
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
      case 'team-manage':
        return <TeamManagement />;
      default:
        return <LeadCaptureScreen isEventModeActive={isEventModeActive} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {/* Event Mode Banner */}
        {isEventModeActive && (
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center py-2 text-sm font-medium">
            🟢 Event Mode Active - 3 days left in free trial
          </div>
        )}
        
        {/* Guest Mode Banner */}
        {isGuestMode && !isEventModeActive && (
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-2 text-sm font-medium">
            👤 Guest Mode - Limited Features Available
          </div>
        )}
        
        {renderCurrentView()}
        <BottomNavigation currentView={currentView} onViewChange={setCurrentView} />
        <SupportChat />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
