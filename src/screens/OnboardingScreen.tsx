import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedLogo } from '../components/common/AnimatedLogo';
const slides = [
  {
    id: 1,
    title: 'LOCAL FOOD.\nREAL STRENGTH.',
    description:
      'Nutrition plans built around the foods you already know and trust.',
    accent: 'NOURISH',
  },
  {
    id: 2,
    title: 'TRAIN\nANYWHERE.',
    description:
      'Bodyweight workouts for home, campus, and everyday life. No gym required.',
    accent: 'MOVE',
  },
  {
    id: 3,
    title: 'PAY\nYOUR WAY.',
    description:
      'Simple mobile-friendly access with MTN MoMo and Orange Money.',
    accent: 'ACCESS',
  },
];

type Props = {
  onFinish: () => void;
};

const OnboardingScreen = ({ onFinish }: Props) => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
  return (
    <View style={styles.splashContainer}>
      <AnimatedLogo size={120} showText={true} />
    </View>
  );
}
  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      onFinish();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.topAccentBar} />

      <View style={styles.content}>
        <Text style={styles.accentLabel}>{slide.accent}</Text>

        <View style={styles.visualBlock}>
          <View style={styles.visualRingOuter}>
            <View style={styles.visualRingInner} />
          </View>
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {isLastSlide ? 'Enter Mboa-Zen' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: Colors.earthBlack,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logoCircle: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: Colors.zenGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoMark: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.earthBlack,
    letterSpacing: 1,
  },
  splashTitle: {
    fontSize: 30,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    letterSpacing: 2,
    marginBottom: 10,
  },
  splashSubtitle: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: Colors.cleanWhite,
    justifyContent: 'space-between',
  },
  topAccentBar: {
    height: 6,
    backgroundColor: Colors.mboaGreen,
    width: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  accentLabel: {
    fontSize: 12,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 20,
    textAlign: 'center',
  },
  visualBlock: {
    alignItems: 'center',
    marginBottom: 32,
  },
  visualRingOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: Colors.zenGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualRingInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.mboaGreen,
  },
  title: {
    fontSize: 30,
    ...FONTS.bold,
    color: Colors.earthBlack,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 25,
    paddingHorizontal: 8,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 36,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 28,
    backgroundColor: Colors.mboaGreen,
  },
  button: {
    backgroundColor: Colors.mboaGreen,
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.cleanWhite,
    fontSize: 16,
    ...FONTS.bold,
    letterSpacing: 0.5,
  },
});

export default OnboardingScreen;