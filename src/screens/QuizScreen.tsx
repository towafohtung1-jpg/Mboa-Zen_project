// ─── src/screens/QuizScreen.tsx ─────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { useLanguage } from '../context/LanguageContext';

type ArchetypeType = 'runner' | 'warrior' | 'guardian';

type Props = {
  onFinish: () => void;
};

// Define the questions with translation keys
const questionKeys = [
  {
    id: 1,
    questionKey: 'quiz.q1',
    options: [
      { archetype: 'runner' as ArchetypeType, labelKey: 'quiz.q1_runner' },
      { archetype: 'warrior' as ArchetypeType, labelKey: 'quiz.q1_warrior' },
      { archetype: 'guardian' as ArchetypeType, labelKey: 'quiz.q1_guardian' },
    ],
  },
  {
    id: 2,
    questionKey: 'quiz.q2',
    options: [
      { archetype: 'runner' as ArchetypeType, labelKey: 'quiz.q2_runner' },
      { archetype: 'warrior' as ArchetypeType, labelKey: 'quiz.q2_warrior' },
      { archetype: 'guardian' as ArchetypeType, labelKey: 'quiz.q2_guardian' },
    ],
  },
  {
    id: 3,
    questionKey: 'quiz.q3',
    options: [
      { archetype: 'runner' as ArchetypeType, labelKey: 'quiz.q3_runner' },
      { archetype: 'warrior' as ArchetypeType, labelKey: 'quiz.q3_warrior' },
      { archetype: 'guardian' as ArchetypeType, labelKey: 'quiz.q3_guardian' },
    ],
  },
  {
    id: 4,
    questionKey: 'quiz.q4',
    options: [
      { archetype: 'runner' as ArchetypeType, labelKey: 'quiz.q4_runner' },
      { archetype: 'warrior' as ArchetypeType, labelKey: 'quiz.q4_warrior' },
      { archetype: 'guardian' as ArchetypeType, labelKey: 'quiz.q4_guardian' },
    ],
  },
  {
    id: 5,
    questionKey: 'quiz.q5',
    options: [
      { archetype: 'runner' as ArchetypeType, labelKey: 'quiz.q5_runner' },
      { archetype: 'warrior' as ArchetypeType, labelKey: 'quiz.q5_warrior' },
      { archetype: 'guardian' as ArchetypeType, labelKey: 'quiz.q5_guardian' },
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
  const { t, language } = useLanguage();
  const [answers, setAnswers] = useState<ArchetypeType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const setArchetype = useUserStore((state) => state.setArchetype);

  const totalQuestions = questionKeys.length;

  // ─── Force re-render when language changes ────────────────────────────
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [language]);

  // ─── DEBUG ─────────────────────────────────────────────────────────────
  const testTranslation = t('quiz.q1');
  console.log('🔍 Language Debug:', {
    currentLanguage: language,
    testTranslation: testTranslation,
  });

  const debugInfo = `Language: ${language} | Test: ${testTranslation}`;

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
    const currentQ = questionKeys[currentQuestion];
    const archetype = currentQ.options[index].archetype;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = archetype;
    setAnswers(newAnswers);

    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      }, 400);
    } else {
      // Determine the winner
      const counts: Record<string, number> = { runner: 0, warrior: 0, guardian: 0 };
      newAnswers.forEach((a) => {
        if (a) counts[a] = (counts[a] || 0) + 1;
      });
      let winner: ArchetypeType = 'warrior';
      let maxCount = 0;
      Object.entries(counts).forEach(([key, count]) => {
        if (count > maxCount) {
          maxCount = count;
          winner = key as ArchetypeType;
        }
      });
      setArchetype(winner);
      onFinish();
    }
  };

  const currentQ = questionKeys[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Get translated question and options
  const translatedQuestion = t(currentQ.questionKey);
  const translatedOptions = currentQ.options.map((opt) => t(opt.labelKey));

  return (
    <FadeInView style={styles.container} key={refreshKey}>
      <View style={styles.content}>
        {/* ─── DEBUG VIEW ──────────────────────────────────────────────────── */}
        <View style={styles.debugContainer}>
          <Text style={styles.debugText}>🔍 {debugInfo}</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.progressText}>
            {currentQuestion + 1} / {totalQuestions}
          </Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <Text style={styles.question}>{translatedQuestion}</Text>

        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => (
            <OptionCard
              key={index}
              label={translatedOptions[index] || t(option.labelKey)}
              onPress={() => handleOptionPress(index)}
            />
          ))}
        </View>
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cleanWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  debugContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  debugText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
  },
  header: {
    marginBottom: 32,
  },
  progressText: {
    fontSize: 14,
    ...FONTS.medium,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
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
    marginBottom: 24,
    lineHeight: 30,
  },
  optionsContainer: {
    flex: 1,
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softBg,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  optionLabel: {
    fontSize: 16,
    ...FONTS.medium,
    color: Colors.earthBlack,
    flex: 1,
  },
});

export default QuizScreen;