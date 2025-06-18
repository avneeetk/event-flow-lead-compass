
import { useState, useEffect } from 'react';
import RegistrationScreen from '../components/RegistrationScreen';
import LoginScreen from '../components/LoginScreen';
import OnboardingScreen from '../components/OnboardingScreen';
import LeadCaptureScreen from '../components/LeadCaptureScreen';
import ContactDashboard from '../components/ContactDashboard';
import FollowUpAssistant from '../components/FollowUpAssistant';
import ROIDashboard from '../components/ROIDashboard';
import TeamCollaboration from '../components/TeamCollaboration';
import TeamManagement from '../components/TeamManagement';
import SupportChat from '../components/SupportChat';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [authState, setAuthState] = useState<'login' | 'register'>('register');
  const [hasRegistered, setHasRegistered] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState('capture');
  const [isEventModeActive, setIsEventModeActive] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

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

  const handleLogin = (userData: any) => {
    localStorage.setItem('registrationComplete', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    setHasRegistered(true);
    // Assume returning users have completed onboarding
    setHasCompletedOnboarding(true);
  };

  const completeOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setHasCompletedOnboarding(true);
  };

  const activateEventMode = () => {
    localStorage.setItem('eventModeActive', 'true');
    setIsEventModeActive(true);
  };

  // Show login/register screens
  if (!hasRegistered) {
    if (authState === 'login') {
      return <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => setAuthState('register')} />;
    }
    return <RegistrationScreen onComplete={completeRegistration} onSwitchToLogin={() => setAuthState('login')} />;
  }

  // Show onboarding for new users
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
          <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white text-center py-2 text-sm font-medium">
            🟢 Event Mode Active - 3 days left in free trial
          </div>
        )}
        
        {renderCurrentView()}
        
        {/* Support Chat Button */}
        <Button
          onClick={() => setShowSupport(true)}
          className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg z-40"
          size="sm"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
        
        <BottomNavigation 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onTeamManage={() => setCurrentView('team-manage')} 
        />
      </div>
      
      <SupportChat isOpen={showSupport} onClose={() => setShowSupport(false)} />
      <Toaster />
    </div>
  );
};

export default Index;
