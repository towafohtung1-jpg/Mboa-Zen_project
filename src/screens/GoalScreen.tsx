import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { useUserStore } from '../store/useUserStore';

type Props = {
  onFinish: () => void;
};

const goals = [
  { id: 'lose_weight', label: 'Lose Weight', description: 'Burn fat and slim down healthily', emoji: '🔥' },
  { id: 'build_strength', label: 'Build Strength', description: 'Gain muscle and get stronger', emoji: '💪' },
  { id: 'stay_active', label: 'Stay Active', description: 'Maintain good health and energy', emoji: '🌿' },
  { id: 'eat_better', label: 'Eat Better', description: 'Make smarter everyday food choices', emoji: '🥗' },
];

const GoalScreen = ({ onFinish }: Props) => {
  const setSelectedGoal = useUserStore((state) => state.setSelectedGoal);
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected) {
      setSelectedGoal(selected);
      onFinish();
    }
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.topAccentBar} />

      <View style={styles.content}>
        <Text style={styles.accentLabel}>YOUR GOAL</Text>
        <Text style={styles.title}>What is your main{'\n'}health goal?</Text>

        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.card,
              selected === goal.id && styles.cardSelected,
            ]}
            onPress={() => setSelected(goal.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.emoji}>{goal.emoji}</Text>
            <View style={styles.cardText}>
              <Text style={styles.label}>{goal.label}</Text>
              <Text style={styles.description}>{goal.description}</Text>
            </View>
            {selected === goal.id && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !selected && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selected}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cleanWhite },
  topAccentBar: { height: 6, backgroundColor: Colors.mboaGreen, width: '100%' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  accentLabel: { fontSize: 12, ...FONTS.bold, color: Colors.zenGold, letterSpacing: 3, marginBottom: 14, textAlign: 'center' },
  title: { fontSize: 26, ...FONTS.bold, color: Colors.earthBlack, textAlign: 'center', lineHeight: 34, marginBottom: 30 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 18, backgroundColor: '#FAFAFA', borderRadius: 14, marginBottom: 14, borderWidth: 2, borderColor: 'transparent' },
  cardSelected: { borderColor: Colors.mboaGreen, backgroundColor: '#F1FAF3' },
  emoji: { fontSize: 26, marginRight: 16 },
  cardText: { flex: 1 },
  label: { fontSize: 16, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 2 },
  description: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted },
  check: { fontSize: 18, color: Colors.mboaGreen, ...FONTS.bold, marginLeft: 8 },
  footer: { paddingHorizontal: 24, paddingBottom: 30 },
  button: { backgroundColor: Colors.mboaGreen, paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: Colors.cleanWhite, fontSize: 16, ...FONTS.bold },
});

export default GoalScreen;