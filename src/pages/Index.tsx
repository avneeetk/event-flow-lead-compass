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
import WalletScreen from '../components/WalletScreen';
import BottomNavigation from '../components/BottomNavigation';
import SupportChat from '../components/SupportChat';
import WowCoinIndicator from '../components/WowCoinIndicator';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/hooks/use-toast';
import OnboardingCards from '../components/OnboardingCards';
import { WowCoinProvider } from '../contexts/WowCoinContext';

const Index = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState('capture');
  const [isEventModeActive, setIsEventModeActive] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [userProfileData, setUserProfileData] = useState<any>(null);

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

  useEffect(() => {
    // Load user profile data
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUserProfileData(JSON.parse(userData));
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
    setUserProfileData(userData);
    
    // Welcome new users with coins
    toast({
      title: "🎉 Your profile is ready – Start capturing leads now!",
      description: "Welcome to WOW Circle. Your 14-day free trial has started.",
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

  const handleCompleteProfile = () => {
    setCurrentView('account');
    toast({
      title: "Complete Your Profile",
      description: "Add more details to increase trust and conversions.",
    });
  };

  const handleStartTrial = () => {
    toast({
      title: "Free Trial Started! 🎉",
      description: "You now have access to all Pro features for 14 days.",
    });
  };

  // Handle auth flow
  if (!hasLoggedIn) {
    if (authMode === 'login') {
      return (
        <WowCoinProvider>
          <LoginScreen
            onLogin={completeLogin}
            onSwitchToRegister={() => setAuthMode('register')}
            onGuestMode={handleGuestMode}
          />
        </WowCoinProvider>
      );
    } else {
      return (
        <WowCoinProvider>
          <RegistrationScreen
            onComplete={completeRegistration}
            onSwitchToLogin={() => setAuthMode('login')}
          />
        </WowCoinProvider>
      );
    }
  }

  if (!hasCompletedOnboarding && !isGuestMode) {
    return (
      <WowCoinProvider>
        <OnboardingScreen onComplete={completeOnboarding} onActivateEventMode={activateEventMode} />
      </WowCoinProvider>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'capture':
        return (
          <>
            <OnboardingCards 
              profileCompleteness={userProfileData?.profileCompleteness || 20}
              onCompleteProfile={handleCompleteProfile}
              onStartTrial={handleStartTrial}
            />
            <LeadCaptureScreen isEventModeActive={isEventModeActive} />
          </>
        );
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
      case 'wallet':
        return <WalletScreen />;
      default:
        return (
          <>
            <OnboardingCards 
              profileCompleteness={userProfileData?.profileCompleteness || 20}
              onCompleteProfile={handleCompleteProfile}
              onStartTrial={handleStartTrial}
            />
            <LeadCaptureScreen isEventModeActive={isEventModeActive} />
          </>
        );
    }
  };

  return (
    <WowCoinProvider>
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
          {/* Header with WowCoin Indicator */}
          <div className="flex justify-between items-center p-4 bg-white border-b">
            <div className="text-lg font-semibold text-gray-800">WOW Circle</div>
            <WowCoinIndicator />
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
    </WowCoinProvider>
  );
};

export default Index;
