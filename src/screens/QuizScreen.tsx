import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';

type Props = {
  onFinish: () => void;
};

const questions = [
  {
    id: 1,
    question: 'How would you describe your body frame?',
    options: [
      { label: 'Thin and lean', archetype: 'runner' as const },
      { label: 'Medium and athletic', archetype: 'warrior' as const },
      { label: 'Broad and solid', archetype: 'guardian' as const },
    ],
  },
  {
    id: 2,
    question: 'When you eat a large meal, what happens?',
    options: [
      { label: 'I stay the same weight', archetype: 'runner' as const },
      { label: 'I feel energized', archetype: 'warrior' as const },
      { label: 'I feel heavy', archetype: 'guardian' as const },
    ],
  },
  {
    id: 3,
    question: 'What type of activity feels most natural?',
    options: [
      { label: 'Long walks and running', archetype: 'runner' as const },
      { label: 'Lifting and pushing', archetype: 'warrior' as const },
      { label: 'Gentle movement', archetype: 'guardian' as const },
    ],
  },
  {
    id: 4,
    question: 'How does your body respond to exercise?',
    options: [
      { label: 'I get lean but not muscular', archetype: 'runner' as const },
      { label: 'I see results quickly', archetype: 'warrior' as const },
      { label: 'I need long effort for changes', archetype: 'guardian' as const },
    ],
  },
  {
    id: 5,
    question: 'What is your main fitness priority?',
    options: [
      { label: 'Stamina and endurance', archetype: 'runner' as const },
      { label: 'Power and strength', archetype: 'warrior' as const },
      { label: 'Balance and recovery', archetype: 'guardian' as const },
    ],
  },
];

const OptionCard = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => {
  const scale = useState(new Animated.Value(1))[0];

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={styles.option}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        <View style={styles.radio}>
          <View style={styles.radioInner} />
        </View>
        <Text style={styles.optionLabel}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const QuizScreen = ({ onFinish }: Props) => {
  const setArchetype = useUserStore((state) => state.setArchetype);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<('runner' | 'warrior' | 'guardian')[]>([]);

  const question = questions[currentQuestion];
  const isLast = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (archetype: 'runner' | 'warrior' | 'guardian') => {
    const updatedAnswers = [...answers, archetype];
    setAnswers(updatedAnswers);

    if (!isLast) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    const counts: Record<string, number> = { runner: 0, warrior: 0, guardian: 0 };
    updatedAnswers.forEach((a) => {
      counts[a] = (counts[a] || 0) + 1;
    });

    let winner: 'runner' | 'warrior' | 'guardian' = 'warrior';
    let highest = 0;
    Object.entries(counts).forEach(([key, value]) => {
      if (value > highest) {
        highest = value;
        winner = key as 'runner' | 'warrior' | 'guardian';
      }
    });

    setArchetype(winner);
    onFinish();
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.topAccentBar} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.accentLabel}>DISCOVER YOUR ARCHETYPE</Text>
          <Text style={styles.stepCounter}>
            {currentQuestion + 1} / {questions.length}
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>

        <Text style={styles.question}>{question.question}</Text>

        {question.options.map((option, index) => (
          <OptionCard
            key={index}
            label={option.label}
            onPress={() => handleAnswer(option.archetype)}
          />
        ))}
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
    paddingTop: 30,
    width: '100%',
    maxWidth: 480,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  accentLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
  },
  stepCounter: {
    fontSize: 12,
    ...FONTS.semibold,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 32,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: Colors.mboaGreen,
    borderRadius: 2,
  },
  question: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 28,
    lineHeight: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  radioInner: {
    width: 0,
    height: 0,
  },
  optionLabel: {
    fontSize: 15,
    ...FONTS.medium,
    color: Colors.earthBlack,
    flex: 1,
  },
});

export default QuizScreen;