// ─── src/screens/OnboardingScreen.tsx ──────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { MboaButton } from '../components/common/MboaButton';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { useTranslation } from '../i18n/useTranslation';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const OnboardingScreen = ({ onFinish }: OnboardingScreenProps) => {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const { t, language } = useTranslation();

  return (
    <FadeInView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.earthBlack} />

      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setShowLanguageModal(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.languageButtonText}>
          {language.toUpperCase()}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={require('../../assets/Logo/mboa_zen_logo_3D.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>{t('onboarding.title')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.subtitle')}</Text>

        <MboaButton
          title={t('onboarding.startButton')}
          onPress={onFinish}
        />
      </View>

      <LanguageSwitcher
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.earthBlack,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  languageButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    zIndex: 10,
  },
  languageButtonText: {
    fontSize: 13,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    letterSpacing: 0.5,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 60,
  },
  title: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    ...FONTS.regular,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
});

export default OnboardingScreen;
