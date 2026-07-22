import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { useUserStore } from '../store/useUserStore';

interface Results {
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  waistToHeight: number;
  waistCategory: string;
  waistColor: string;
}

const ScanScreen = () => {
  const isPremium = useUserStore((state) => state.isPremium);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [age, setAge] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const wc = parseFloat(waist);

    if (!w || !h) {
      Alert.alert('Missing Values', 'Please enter at least your weight and height.');
      return;
    }

    if (w < 20 || w > 300) {
      Alert.alert('Invalid Weight', 'Please enter a realistic weight in kilograms (20-300 kg).');
      return;
    }

    if (h < 50 || h > 250) {
      Alert.alert('Invalid Height', 'Please enter a realistic height in centimeters (50-250 cm).');
      return;
    }

    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);

    let bmiCategory = '';
    let bmiColor = Colors.mboaGreen;

    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
      bmiColor = '#FF9800';
    } else if (bmi < 25) {
      bmiCategory = 'Normal range';
      bmiColor = Colors.mboaGreen;
    } else if (bmi < 30) {
      bmiCategory = 'Overweight';
      bmiColor = '#FF9800';
    } else {
      bmiCategory = 'Obese';
      bmiColor = Colors.errorRed;
    }

    let waistToHeight = 0;
    let waistCategory = '';
    let waistColor = Colors.mboaGreen;

    if (wc && wc > 30 && wc < 200) {
      waistToHeight = wc / h;

      if (waistToHeight < 0.4) {
        waistCategory = 'Low risk';
        waistColor = Colors.mboaGreen;
      } else if (waistToHeight < 0.5) {
        waistCategory = 'Healthy';
        waistColor = Colors.mboaGreen;
      } else if (waistToHeight < 0.6) {
        waistCategory = 'Increased risk';
        waistColor = '#FF9800';
      } else {
        waistCategory = 'High risk';
        waistColor = Colors.errorRed;
      }
    }

    setResults({
      bmi,
      bmiCategory,
      bmiColor,
      waistToHeight,
      waistCategory,
      waistColor,
    });
  };

  const handlePremiumTap = () => {
    if (isPremium) {
      Alert.alert(
        'AI Body Scan',
        'AI-powered body composition analysis is coming soon in a future update. Thank you for being a Premium member.'
      );
    } else {
      Alert.alert(
        'Upgrade to Premium',
        'AI Body Scan is a Premium feature. Visit the Market tab to upgrade and unlock advanced body analysis.'
      );
    }
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>YOUR HEALTH</Text>
        <Text style={styles.header}>Body Snapshot</Text>
        <Text style={styles.subHeader}>
          Enter your measurements to see your body health indicators
        </Text>
      </View>

      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          {/* Manual entry form */}
          <View style={styles.card}>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="70"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="decimal-pad"
                  value={weight}
                  onChangeText={setWeight}
                  maxLength={5}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Height (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="170"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="decimal-pad"
                  value={height}
                  onChangeText={setHeight}
                  maxLength={5}
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Waist (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="80"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="decimal-pad"
                  value={waist}
                  onChangeText={setWaist}
                  maxLength={5}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Age</Text>
                <TextInput
                  style={styles.input}
                  placeholder="30"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="number-pad"
                  value={age}
                  onChangeText={setAge}
                  maxLength={3}
                />
              </View>
            </View>

            <AnimatedButton
              title="Calculate"
              onPress={handleCalculate}
              variant="primary"
              style={styles.calculateButton}
            />

            <Text style={styles.disclaimer}>
              These calculations are general wellness indicators only. Consult a
              qualified nutritionist or doctor for personalized medical advice.
            </Text>
          </View>

          {/* Results */}
          {results && (
            <View style={styles.card}>
              <Text style={styles.resultsTitle}>Your Results</Text>

              <View style={styles.resultRow}>
                <View style={styles.resultLabel}>
                  <Text style={styles.resultName}>Body Mass Index</Text>
                  <Text style={styles.resultValue}>{results.bmi.toFixed(1)}</Text>
                </View>
                <View
                  style={[
                    styles.resultBadge,
                    { backgroundColor: results.bmiColor },
                  ]}
                >
                  <Text style={styles.resultBadgeText}>
                    {results.bmiCategory}
                  </Text>
                </View>
              </View>

              {results.waistToHeight > 0 && (
                <>
                  <View style={styles.resultDivider} />
                  <View style={styles.resultRow}>
                    <View style={styles.resultLabel}>
                      <Text style={styles.resultName}>Waist-to-Height</Text>
                      <Text style={styles.resultValue}>
                        {results.waistToHeight.toFixed(2)}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.resultBadge,
                        { backgroundColor: results.waistColor },
                      ]}
                    >
                      <Text style={styles.resultBadgeText}>
                        {results.waistCategory}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          )}

          {/* Premium AI Scan Teaser */}
          <TouchableOpacity
            style={styles.premiumCard}
            onPress={handlePremiumTap}
            activeOpacity={0.85}
          >
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>PREMIUM FEATURE</Text>
            </View>

            <Text style={styles.premiumTitle}>AI Body Scan</Text>

            <Text style={styles.premiumDescription}>
              Get instant body composition analysis using your phone camera.
              Powered by machine learning to give you deeper insights than
              manual measurements alone.
            </Text>

            <View style={styles.premiumFeatures}>
              <Text style={styles.premiumFeatureItem}>
                ✓ Body composition estimate
              </Text>
              <Text style={styles.premiumFeatureItem}>✓ Posture analysis</Text>
              <Text style={styles.premiumFeatureItem}>
                ✓ Progress tracking over time
              </Text>
            </View>

            <View style={styles.premiumCTA}>
              <Text style={styles.premiumCTAText}>
                {isPremium ? 'Coming soon in Premium' : 'Upgrade to Premium'}
              </Text>
              <Text style={styles.premiumArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softBg,
    alignItems: 'center',
  },
  headerArea: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 6,
  },
  header: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 19,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  section: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
  },

  // Card — matches Nurture pattern exactly (no width, no maxWidth, no margins)
  card: {
    backgroundColor: Colors.cleanWhite,
    borderRadius: 18,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },

  // Form fields
  inputRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.softBg,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 18,
    ...FONTS.semibold,
    color: Colors.earthBlack,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  calculateButton: {
    height: 48,
    borderRadius: 12,
    marginTop: 6,
  },
  disclaimer: {
    fontSize: 11,
    ...FONTS.regular,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginTop: 14,
    lineHeight: 16,
    textAlign: 'center',
  },

  // Results
  resultsTitle: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 14,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    flex: 1,
  },
  resultName: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  resultValue: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  resultBadgeText: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    letterSpacing: 0.5,
  },
  resultDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 14,
  },

  // Premium card — same width behavior as regular card, but dark styling
  premiumCard: {
    backgroundColor: Colors.earthBlack,
    borderRadius: 18,
    padding: 22,
    marginTop: 16,
    shadowColor: Colors.zenGold,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.zenGold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },
  premiumBadgeText: {
    fontSize: 10,
    ...FONTS.bold,
    color: Colors.earthBlack,
    letterSpacing: 2,
  },
  premiumTitle: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 10,
  },
  premiumDescription: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 16,
  },
  premiumFeatures: {
    marginBottom: 18,
  },
  premiumFeatureItem: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.cleanWhite,
    marginBottom: 6,
  },
  premiumCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  premiumCTAText: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 0.5,
  },
  premiumArrow: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.zenGold,
  },
});

export default ScanScreen;