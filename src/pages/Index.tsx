import { useState, useEffect } from 'react';
import LoginScreen from '../components/LoginScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import OnboardingScreen from '../components/OnboardingScreen';
import LeadCaptureScreen from '../components/LeadCaptureScreen';
import ContactDashboard from '../components/ContactDashboard';
import FollowUpAssistant from '../components/FollowUpAssistant';
import ROIDashboard from '../components/ROIDashboard';
import TeamCollaboration from '../components/TeamCollaboration';
import AccountSettings from '../components/AccountSettings';
import BottomNavigation from '../components/BottomNavigation';
import SupportChat from '../components/SupportChat';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import { Coins } from 'lucide-react';

const Index = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState('capture');
  const [isEventModeActive, setIsEventModeActive] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [coinBalance, setCoinBalance] = useState(150);

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
    
    // Welcome new users with coins
    setCoinBalance(200);
    toast({
      title: "🎉 You've received 200 WowCoins with your registration!",
      description: "Start capturing leads with AI Snap technology.",
    });
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
      description: "14-day free trial started. Some features may be limited.",
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
      case 'account':
        return <AccountSettings />;
      default:
        return <LeadCaptureScreen isEventModeActive={isEventModeActive} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {/* Header with Coin Balance */}
        <div className="flex justify-between items-center p-4 bg-white border-b">
          <div className="text-lg font-semibold text-gray-800">WOW Circle</div>
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">{coinBalance}</span>
          </div>
        </div>

        {/* Event Mode Banner */}
        {isEventModeActive && (
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center py-2 text-sm font-medium">
            🟢 Event Mode Active - 12 days left in free trial
          </div>
        )}
        
        {/* Guest Mode Banner */}
        {isGuestMode && !isEventModeActive && (
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-center py-2 text-sm font-medium">
            👤 Guest Mode - 12 days free trial remaining
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
