// ─── App.tsx ─────────────────────────────────────────────────────────────

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import GoalScreen from './src/screens/GoalScreen';
import QuizScreen from './src/screens/QuizScreen';
import PhoneScreen from './src/screens/PhoneScreen';
import OTPScreen from './src/screens/OTPScreen';
import { Colors } from './src/constants/colors';
import { loadUserState } from './src/utils/storage';
import { useUserStore } from './src/store/useUserStore';
import { useFonts } from './src/utils/useFonts';
import { AnimatedLogo } from './src/components/common/AnimatedLogo';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<
    'onboarding' | 'goal' | 'quiz' | 'phone' | 'otp' | 'app'
  >('onboarding');

  const fontsLoaded = useFonts();
  const setArchetype = useUserStore((state) => state.setArchetype);
  const setPhone = useUserStore((state) => state.setPhone);
  const userPhone = useUserStore((state) => state.phone);

  // ─── DEBUG: Track loading time ──────────────────────────────────────
  console.log('🕐 App starting...', new Date().toISOString());

  useEffect(() => {
    console.log('🕐 useEffect running...', new Date().toISOString());
    
    const init = async () => {
      console.log('🕐 init() started...', new Date().toISOString());
      
      if (!fontsLoaded) {
        console.log('🕐 fontsLoaded is false, waiting...');
        return;
      }

      console.log('🕐 fontsLoaded is true, loading state...');
      
      try {
        const saved = await loadUserState();
        console.log('🕐 loadUserState completed:', saved);

        if (saved && saved.onboardingComplete) {
          console.log('🕐 Found saved state, going to app');
          if (saved.archetype) {
            setArchetype(saved.archetype as any);
          }
          if (saved.phone) {
            setPhone(saved.phone);
          }
          setStep('app');
        } else {
          console.log('🕐 No saved state, starting onboarding');
        }
      } catch (error) {
        console.error('🕐 Error in init:', error);
      }

      console.log('🕐 Setting loading to false');
      setLoading(false);
    };
    
    init();
  }, [fontsLoaded]);

  console.log('🕐 Rendering, loading:', loading, 'fontsLoaded:', fontsLoaded);

  if (!fontsLoaded || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.earthBlack,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AnimatedLogo size={100} showText={true} />
        <ActivityIndicator color={Colors.mboaGreen} />
      </View>
    );
  }

  // ─── RENDER SCREENS ────────────────────────────────────────────────────
  const renderScreen = () => {
    console.log('🕐 Rendering screen for step:', step);
    
    if (step === 'onboarding') {
      return <OnboardingScreen onFinish={() => setStep('goal')} />;
    }

    if (step === 'goal') {
      return <GoalScreen onFinish={() => setStep('quiz')} />;
    }

    if (step === 'quiz') {
      return <QuizScreen onFinish={() => setStep('phone')} />;
    }

    if (step === 'phone') {
      return (
        <PhoneScreen
          onFinish={() => {
            const currentPhone = useUserStore.getState().phone;
            if (currentPhone && currentPhone.length > 0) {
              setStep('otp');
            } else {
              setStep('app');
            }
          }}
          onSkip={() => setStep('app')}
        />
      );
    }

    if (step === 'otp') {
      return (
        <OTPScreen
          phone={userPhone || '+237 XXX XXX XXX'}
          onFinish={() => setStep('app')}
          onBack={() => setStep('phone')}
        />
      );
    }

    return <RootNavigator />;
  };

  return <>{renderScreen()}</>;
}