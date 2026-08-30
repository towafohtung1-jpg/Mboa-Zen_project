// ─── src/components/common/LanguageSwitcher.tsx ──────────────────────

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { useLanguage, Language, getLanguageLabel, getLanguageFlag } from '../../context/LanguageContext';

interface LanguageSwitcherProps {
  visible: boolean;
  onClose: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ visible, onClose }) => {
  // Use a try-catch to handle the case where useLanguage might fail
  let language: Language = 'en';
  let setLanguage: (lang: Language) => void = () => {};
  let contextError = false;

  try {
    const context = useLanguage();
    language = context.language;
    setLanguage = context.setLanguage;
  } catch (error) {
    console.error('LanguageSwitcher: Failed to get language context', error);
    contextError = true;
    // If context fails, use defaults and show a fallback UI
    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>🌍 Choose Language</Text>
            <Text style={styles.subtitle}>Select your language</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onClose();
              }}
            >
              <Text style={styles.optionText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'pidgin', label: 'Pidgin', flag: '🇨🇲' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>🌍 Choose Language</Text>
          <Text style={styles.subtitle}>Choisissez votre langue</Text>

          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.option,
                language === lang.code && styles.optionSelected,
              ]}
              onPress={() => handleSelect(lang.code)}
              activeOpacity={0.8}
            >
              <Text style={styles.flag}>{getLanguageFlag(lang.code)}</Text>
              <Text style={[
                styles.optionText,
                language === lang.code && styles.optionTextSelected,
              ]}>
                {getLanguageLabel(lang.code)}
              </Text>
              {language === lang.code && (
                <Text style={styles.check}>✅</Text>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.cleanWhite,
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.earthBlack,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  optionSelected: {
    backgroundColor: '#F1FAF3',
    borderWidth: 2,
    borderColor: Colors.mboaGreen,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    ...FONTS.medium,
    color: Colors.earthBlack,
    flex: 1,
  },
  optionTextSelected: {
    color: Colors.mboaGreen,
  },
  check: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.mboaGreen,
    borderRadius: 12,
  },
  closeButtonText: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
});

export default LanguageSwitcher;