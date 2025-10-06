import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LandingPage } from './components/LandingPage';
import { RoleBasedLogin } from './components/RoleBasedLogin';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';

type AppState = 'splash' | 'landing' | 'login' | 'dashboard';
type UserRole = 'student' | 'parent' | 'institution' | 'government' | 'guest' | null;

interface UserProfile {
  name: string;
  udid: string;
  disability: string;
  grade: string;
  profileImage?: string;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  // Mock user profiles for demonstration
  const mockProfiles: Record<string, UserProfile> = {
    student: {
      name: "Arjun Kumar",
      udid: "1234567890123456",
      disability: "Visual Impairment",
      grade: "12th"
    },
    parent: {
      name: "Priya Sharma",
      udid: "Parent of Arjun Kumar",
      disability: "Guardian",
      grade: "Parent"
    },
    institution: {
      name: "Delhi Public School",
      udid: "INST001",
      disability: "Educational Institution",
      grade: "Faculty"
    },
    government: {
      name: "Ministry of Social Justice",
      udid: "GOV001",
      disability: "Government",
      grade: "Admin"
    }
  };

  // Handle keyboard accessibility shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setAccessibilityOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSplashContinue = () => {
    setCurrentState('landing');
  };

  const handleGetStarted = () => {
    setCurrentState('login');
  };

  const handleLogin = (role: string, credentials: any) => {
    setUserRole(role as UserRole);
    if (role !== 'guest') {
      setUserProfile(mockProfiles[role] || mockProfiles.student);
    }
    setCurrentState('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setUserRole(null);
    setUserProfile(null);
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'splash':
        return <SplashScreen onContinue={handleSplashContinue} />;
      
      case 'landing':
        return (
          <LandingPage 
            onGetStarted={handleGetStarted} 
            onLogin={handleGetStarted}
          />
        );
      
      case 'login':
        return (
          <RoleBasedLogin 
            onBack={handleBackToLanding}
            onLogin={handleLogin}
          />
        );
      
      case 'dashboard':
        // For now, we'll show the StudentDashboard for all roles
        // In a full implementation, you'd route to different dashboards based on userRole
        return (
          <StudentDashboard 
            userProfile={userProfile || mockProfiles.student}
            onLogout={handleBackToLanding}
          />
        );
      
      default:
        return <SplashScreen onContinue={handleSplashContinue} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderCurrentState()}
      
      {/* Accessibility Toolbar - Available on all screens except splash */}
      {currentState !== 'splash' && (
        <AccessibilityToolbar 
          isOpen={accessibilityOpen}
          onToggle={() => setAccessibilityOpen(!accessibilityOpen)}
        />
      )}
    </div>
  );
}