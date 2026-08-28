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
// ─── ADD THIS IMPORT ────────────────────────────────────────────────────
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const OnboardingScreen = ({ onFinish }: OnboardingScreenProps) => {
  // ─── USE LANGUAGE HOOK ────────────────────────────────────────────────
  const { t, language } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  return (
    <FadeInView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.earthBlack} />
      
      {/* Language Button */}
      <TouchableOpacity
        style={styles.languageButton}
        onPress={() => setShowLanguageModal(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.languageButtonText}>
          🌍 {language.toUpperCase()}
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/Logo/mboa_zen_logo_3D.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>{t('onboarding.title')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.subtitle')}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onFinish}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{t('onboarding.continue')}</Text>
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      {showLanguageModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <LanguageSwitcher 
              visible={showLanguageModal} 
              onClose={() => setShowLanguageModal(false)} 
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowLanguageModal(false)}
            >
              <Text style={styles.modalCloseText}>{t('common.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  button: {
    backgroundColor: Colors.mboaGreen,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    letterSpacing: 1,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.cleanWhite,
    borderRadius: 24,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.earthBlack,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.softBg,
    borderRadius: 12,
  },
  modalCloseText: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.textMuted,
  },
});

export default OnboardingScreen;