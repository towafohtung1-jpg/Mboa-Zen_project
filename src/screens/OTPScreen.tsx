import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';

type Props = {
  phone: string;
  onFinish: () => void;
  onBack: () => void;
};

const OTP_LENGTH = 6;

const OTPScreen = ({ phone, onFinish, onBack }: Props) => {
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    setTimeout(() => {
      inputs.current[0]?.focus();
    }, 300);
  }, []);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '');
    if (digit.length > 1) return;

    const newCode = [...code];
    newCode[index] = digit;
    setCode(newCode);

    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((d) => d !== '') && index === OTP_LENGTH - 1) {
      verifyCode(newCode.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyCode = (fullCode: string) => {
    if (fullCode.length === OTP_LENGTH) {
      onFinish();
    }
  };

  const handleResend = () => {
    Alert.alert('Code Resent', `A new code has been sent to ${phone}`);
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.topAccentBar} />

      <View style={styles.content}>
        <Text style={styles.accentLabel}>VERIFICATION</Text>
        <Text style={styles.title}>Enter the code</Text>
        <Text style={styles.subtitle}>We sent a 6-digit code to</Text>
        <Text style={styles.phone}>{phone}</Text>

        <View style={styles.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              style={styles.codeInput}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={styles.resendRow}>
          <Text style={styles.resendText}>Didn't get the code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onBack} style={styles.changeButton}>
          <Text style={styles.changeText}>Change phone number</Text>
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
    alignItems: 'center',
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 1,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.earthBlack,
    backgroundColor: '#FAFAFA',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    marginRight: 6,
  },
  resendLink: {
    fontSize: 14,
    color: Colors.mboaGreen,
    ...FONTS.bold,
  },
  changeButton: {
    marginTop: 30,
    padding: 10,
  },
  changeText: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
});

export default OTPScreen;