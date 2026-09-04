// ─── src/screens/QuizScreen.tsx ─────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { quizQuestions, calculateQuizResult, ArchetypeType } from '../data/quizLogic';

type Props = {
  onFinish: () => void;
};

const OptionCard = ({
  label,
  icon,
  onPress,
  isSelected,
}: {
  label: string;
  icon?: string;
  onPress: () => void;
  isSelected: boolean;
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
        style={[
          styles.option,
          isSelected && styles.optionSelected,
        ]}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        {icon && <Text style={styles.optionIcon}>{icon}</Text>}
        <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const QuizScreen = ({ onFinish }: Props) => {
  const [answers, setAnswers] = useState<ArchetypeType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [forceGuardian, setForceGuardian] = useState(false);
  const setArchetype = useUserStore((state) => state.setArchetype);

  const totalQuestions = quizQuestions.length;
  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const isLast = currentQuestion === totalQuestions - 1;

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
    const selected = currentQ.options[index];
    
    if (selected.forceGuardian) {
      setForceGuardian(true);
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selected.archetype;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (isLast) {
        finishQuiz(newAnswers);
      } else {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      }
    }, 500);
  };

  const finishQuiz = (finalAnswers: ArchetypeType[]) => {
    let resultArchetype: ArchetypeType;

    if (forceGuardian) {
      resultArchetype = 'guardian';
    } else {
      const result = calculateQuizResult(finalAnswers);
      resultArchetype = result.archetype;
    }

    setArchetype(resultArchetype);
    onFinish();
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.accentLabel}>DISCOVER YOUR ARCHETYPE</Text>
            <Text style={styles.stepCounter}>
              {currentQuestion + 1} / {totalQuestions}
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
          <Text style={styles.question}>{currentQ.question}</Text>

          <View style={styles.optionsContainer}>
            {currentQ.options.map((option: { id: string; label: string; archetype: ArchetypeType; icon?: string; image?: string; forceGuardian?: boolean }, index: number) => (
              <OptionCard
                key={option.id}
                label={option.label}
                icon={option.icon}
                onPress={() => handleOptionPress(index)}
                isSelected={selectedOption === index}
              />
            ))}
          </View>

          {currentQuestion === 0 && (
            <View style={styles.imageHintContainer}>
              <Text style={styles.imageHintText}>🌴 Plantain • 🌳 Iroko • 🌿 Mango</Text>
            </View>
          )}

          {currentQuestion === 3 && (
            <View style={styles.safetyNote}>
              <Text style={styles.safetyNoteText}>
                ⚠️ If you have any health conditions, we'll recommend the safest path for you.
              </Text>
            </View>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
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
  header: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  accentLabel: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
  },
  stepCounter: {
    fontSize: 14,
    ...FONTS.semibold,
    color: Colors.textMuted,
    letterSpacing: 1,
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
  questionNumber: {
    fontSize: 12,
    ...FONTS.medium,
    color: Colors.textMuted,
    marginBottom: 8,
    letterSpacing: 1,
  },
  question: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 24,
    lineHeight: 30,
  },
  optionsContainer: {
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
  optionSelected: {
    borderColor: Colors.mboaGreen,
    backgroundColor: '#F1FAF3',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.mboaGreen,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.mboaGreen,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    ...FONTS.medium,
    color: Colors.earthBlack,
    flex: 1,
  },
  optionLabelSelected: {
    color: Colors.mboaGreen,
  },
  imageHintContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: Colors.softBg,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageHintText: {
    fontSize: 14,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
  safetyNote: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.zenGold,
  },
  safetyNoteText: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.earthBlack,
    lineHeight: 20,
  },
});

export default QuizScreen;