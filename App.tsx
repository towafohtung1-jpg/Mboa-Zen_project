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

  useEffect(() => {
    const init = async () => {
      if (!fontsLoaded) return;

      const saved = await loadUserState();
      console.log('APP INIT - Saved state:', saved);

      if (saved && saved.onboardingComplete) {
        console.log('APP INIT - Found saved state, going to app');
        if (saved.archetype) {
          setArchetype(saved.archetype as any);
        }
        if (saved.phone) {
          setPhone(saved.phone);
        }
        setStep('app');
      } else {
        console.log('APP INIT - No saved state, starting onboarding');
      }

      setLoading(false);
    };
    init();
  }, [fontsLoaded]);

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
      </View>
    );
  }

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
          // Read the store fresh at click-time — avoids stale closure bug
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
}