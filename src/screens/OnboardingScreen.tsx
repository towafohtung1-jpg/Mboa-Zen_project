import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedLogo } from '../components/common/AnimatedLogo';

const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  description: string;
  accent: string;
  image: any;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'LOCAL FOOD.\nREAL STRENGTH.',
    description:
      'Nutrition plans built around the foods you already know and trust.',
    accent: 'NOURISH',
    image: require('../../assets/Illustrations/onboarding_nourish.png'),
  },
  {
    id: 2,
    title: 'TRAIN\nANYWHERE.',
    description:
      'Bodyweight workouts for home, campus, and everyday life. No gym required.',
    accent: 'MOVE',
    image: require('../../assets/Illustrations/onboarding_move.png'),
  },
  {
    id: 3,
    title: 'PAY\nYOUR WAY.',
    description:
      'Simple mobile-friendly access with MTN MoMo and Orange Money.',
    accent: 'ACCESS',
    image: require('../../assets/Illustrations/onboarding_access.png'),
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
  const progress = ((currentSlide + 1) / slides.length) * 100;

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
        <View style={styles.headerRow}>
          <Text style={styles.accentLabel}>{slide.accent}</Text>
          <Text style={styles.stepCounter}>
            {currentSlide + 1} / {slides.length}
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progress}%` },
            ]}
          />
        </View>

        <View style={styles.visualBlock}>
          <View style={styles.illustrationCircle}>
            <Image
              source={slide.image}
              style={styles.illustration}
              resizeMode="cover"
            />
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

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {isLastSlide ? 'Enter Mboa-Zen' : 'Continue'}
          </Text>
          {!isLastSlide && <Text style={styles.arrow}> →</Text>}
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
  container: {
    flex: 1,
    backgroundColor: Colors.cleanWhite,
    alignItems: 'center',
  },
  topAccentBar: {
    height: 6,
    backgroundColor: Colors.mboaGreen,
    width: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 24,
    width: '100%',
    maxWidth: 480,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  accentLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
  },
  stepCounter: {
    fontSize: 12,
    ...FONTS.semibold,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: Colors.mboaGreen,
    borderRadius: 2,
  },
  visualBlock: {
    alignItems: 'center',
    marginBottom: 36,
  },
  illustrationCircle: {
    width: Math.min(width * 0.42, 220),
    height: Math.min(width * 0.42, 220),
    borderRadius: Math.min(width * 0.42, 220) / 2,
    backgroundColor: Colors.softBg,
    overflow: 'hidden',
    shadowColor: Colors.mboaGreen,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 3,
    borderColor: Colors.zenGold,
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 30,
    ...FONTS.bold,
    color: Colors.earthBlack,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  footer: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 32,
    paddingBottom: 36,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.mboaGreen,
  },
  button: {
    backgroundColor: Colors.mboaGreen,
    height: 56, // Fixed height provides a structural, premium feel
    borderRadius: 12, // Smooth, modern squircle curvature 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // Elegant, premium neutral shadow depth instead of a loud neon glow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: Colors.cleanWhite,
    fontSize: 16,
    ...FONTS.bold,
    letterSpacing: 0.3,
  },
  arrow: {
    color: Colors.cleanWhite,
    fontSize: 16,
    lineHeight: 16,
  },
});

export default OnboardingScreen;