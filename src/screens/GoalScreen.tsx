import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { useUserStore } from '../store/useUserStore';

type Props = {
  onFinish: () => void;
};

const goals = [
  {
    id: 'lose_weight',
    label: 'Lose Weight',
    description: 'Burn fat and slim down healthily',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/goal_lose_weight.png'),
  },
  {
    id: 'build_strength',
    label: 'Build Strength',
    description: 'Gain muscle and get stronger',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/goal_build_strength.png'),
  },
  {
    id: 'stay_active',
    label: 'Stay Active',
    description: 'Maintain good health and energy',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/goal_stay_active.png'),
  },
  {
    id: 'eat_better',
    label: 'Eat Better',
    description: 'Make smarter everyday food choices',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/goal_eat_better.png'),
  },
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

        {goals.map((goal) => {
          const isSelected = selected === goal.id;
          return (
            <TouchableOpacity
              key={goal.id}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => setSelected(goal.id)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconCircle,
                  isSelected && styles.iconCircleSelected,
                ]}
              >
                <Image
                  source={goal.icon}
                  style={[
                    styles.icon,
                    isSelected && styles.iconSelected,
                  ]}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.cardText}>
                <Text style={styles.label}>{goal.label}</Text>
                <Text style={styles.description}>{goal.description}</Text>
              </View>

              {isSelected && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <AnimatedButton
          title="Continue  →"
          onPress={handleContinue}
          variant="primary"
          disabled={!selected}
          style={styles.button}
        />
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
    paddingTop: 24,
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
    fontSize: 26,
    ...FONTS.bold,
    color: Colors.earthBlack,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: Colors.mboaGreen,
    backgroundColor: '#F1FAF3',
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFF3F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconCircleSelected: {
    backgroundColor: Colors.mboaGreen,
  },
  icon: {
    width: 28,
    height: 28,
  },
  iconSelected: {
    tintColor: Colors.cleanWhite,
  },
  cardText: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
  },
  check: {
    fontSize: 18,
    color: Colors.mboaGreen,
    ...FONTS.bold,
    marginLeft: 8,
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
});

export default GoalScreen;