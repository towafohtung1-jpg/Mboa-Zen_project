import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { saveUserState } from '../utils/storage';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedButton } from '../components/common/AnimatedButton';

type Props = {
  onFinish: () => void;
  onSkip: () => void;
};

const PhoneScreen = ({ onFinish, onSkip }: Props) => {
  const setPhone = useUserStore((state) => state.setPhone);
  const [phone, setPhoneInput] = useState('');

  const isValid = phone.length === 9 && phone.startsWith('6');

  const handleContinue = async () => {
    if (!isValid) {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 9-digit Cameroon phone number starting with 6.'
      );
      return;
    }

    const fullNumber = `+237${phone}`;
    setPhone(fullNumber);

    const currentArchetype = useUserStore.getState().archetype;

    await saveUserState({
      onboardingComplete: true,
      archetype: currentArchetype,
      selectedGoal: null,
      phone: fullNumber,
    });

    onFinish();
  };

  const handleSkip = async () => {
    const currentArchetype = useUserStore.getState().archetype;

    await saveUserState({
      onboardingComplete: true,
      archetype: currentArchetype,
      selectedGoal: null,
      phone: null,
    });

    onSkip();
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.topAccentBar} />

      <View style={styles.content}>
        <Text style={styles.accentLabel}>ALMOST DONE</Text>
        <Text style={styles.title}>Enter your{'\n'}phone number</Text>
        <Text style={styles.subtitle}>
          We use this to save your progress and process Mobile Money payments.
        </Text>

        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+237</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="6XX XXX XXX"
            placeholderTextColor={Colors.textMuted}
            keyboardType="phone-pad"
            maxLength={9}
            value={phone}
            onChangeText={setPhoneInput}
          />
        </View>

        {phone.length > 0 && !isValid && (
          <Text style={styles.helperText}>
            Must be 9 digits and start with 6.
          </Text>
        )}
      </View>

      <View style={styles.footer}>
        <AnimatedButton
          title="Continue  →"
          onPress={handleContinue}
          variant="primary"
          disabled={!isValid}
          style={styles.button}
        />

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
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
    paddingHorizontal: 24,
    paddingTop: 40,
    width: '100%',
    maxWidth: 480,
  },
  accentLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 14,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.earthBlack,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  countryCodeText: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 18,
    color: Colors.earthBlack,
    ...FONTS.medium,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  helperText: {
    fontSize: 12,
    color: Colors.errorRed,
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  button: {
    height: 56,
    borderRadius: 12,
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 18,
  },
  skipText: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
  },
});

export default PhoneScreen;