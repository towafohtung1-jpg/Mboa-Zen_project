// ─── src/components/common/LanguageSwitcher.tsx ────────────────────────

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { FONTS } from '../../constants/typography';
import { useLanguageStore } from '../../i18n/useTranslation';
import { LANGUAGES, Language } from '../../i18n/strings';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const LanguageSwitcher = ({ visible, onClose }: Props) => {
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose Language</Text>

          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.option,
                language === lang.code && styles.optionSelected,
              ]}
              onPress={() => handleSelect(lang.code)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.optionText,
                  language === lang.code && styles.optionTextSelected,
                ]}
              >
                {lang.label}
              </Text>
              {language === lang.code && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  container: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: Colors.cleanWhite,
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 20,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.softBg,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: Colors.mboaGreen,
  },
  optionText: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  optionTextSelected: {
    color: Colors.cleanWhite,
  },
  checkmark: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
});
