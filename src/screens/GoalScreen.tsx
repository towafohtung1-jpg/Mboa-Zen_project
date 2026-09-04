// ─── src/screens/GoalScreen.tsx ─────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';

type Props = {
  onFinish: () => void;
};

const GoalScreen = ({ onFinish }: Props) => {
  const goals = [
    { id: 'lose_weight', icon: '🔥', label: 'Lose Weight', desc: 'Burn fat and slim down healthily' },
    { id: 'build_strength', icon: '💪', label: 'Build Strength', desc: 'Gain muscle and get stronger' },
    { id: 'stay_active', icon: '🚶', label: 'Stay Active', desc: 'Maintain good health and energy' },
    { id: 'eat_better', icon: '🥗', label: 'Eat Better', desc: 'Make smarter everyday food choices' },
  ];

  const [selectedGoal, setSelectedGoal] = React.useState<string | null>(null);

  return (
    <FadeInView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerArea}>
          <Text style={styles.eyebrow}>YOUR JOURNEY</Text>
          <Text style={styles.title}>What is your main health goal?</Text>
          <Text style={styles.subtitle}>
            Choose one main focus. You can always adjust later.
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalCard,
                selectedGoal === goal.id && styles.goalCardSelected,
              ]}
              onPress={() => setSelectedGoal(goal.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.goalIcon}>{goal.icon}</Text>
              <View style={styles.goalContent}>
                <Text style={styles.goalTitle}>{goal.label}</Text>
                <Text style={styles.goalDescription}>
                  {goal.desc}
                </Text>
              </View>
              <View style={[
                styles.goalRadio,
                selectedGoal === goal.id && styles.goalRadioSelected,
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedGoal && styles.continueButtonDisabled,
          ]}
          onPress={onFinish}
          disabled={!selectedGoal}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={onFinish}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cleanWhite,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerArea: {
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  goalsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalCardSelected: {
    borderColor: Colors.mboaGreen,
    backgroundColor: '#F1FAF3',
  },
  goalIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 2,
  },
  goalDescription: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  goalRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    marginLeft: 8,
  },
  goalRadioSelected: {
    borderColor: Colors.mboaGreen,
    backgroundColor: Colors.mboaGreen,
  },
  continueButton: {
    backgroundColor: Colors.mboaGreen,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    letterSpacing: 0.5,
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 14,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
});

export default GoalScreen;