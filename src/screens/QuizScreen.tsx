// ─── src/screens/QuizScreen.tsx ─────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { quizQuestions, calculateQuizResult, ArchetypeType } from '../data/quizLogic';

type Props = {
  onFinish: () => void;
};

// ─── TREE IMAGES ────────────────────────────────────────────────────────

import plantainTree from '../../assets/Media/Trees/plantain_tree.jpg';
import irokoTree from '../../assets/Media/Trees/iroko_tree.jpg';
import mangoTree from '../../assets/Media/Trees/mango_tree.jpg';

const TREE_IMAGES = {
  runner: plantainTree,
  warrior: irokoTree,
  guardian: mangoTree,
};

// ─── ICON IMAGES ────────────────────────────────────────────────────────

import runnerIcon from '../../assets/Media/Icons/runner_icon.png';
import warriorIcon from '../../assets/Media/Icons/warrior_icon.png';
import guardianIcon from '../../assets/Media/Icons/guardian_icon.png';
import walkIcon from '../../assets/Media/Icons/walk_icon.png';
import carryIcon from '../../assets/Media/Icons/carry_icon.png';
import sitIcon from '../../assets/Media/Icons/sit_icon.png';
import hungryIcon from '../../assets/Media/Icons/hungry_icon.png';
import strongIcon from '../../assets/Media/Icons/strong_icon.png';
import tiredIcon from '../../assets/Media/Icons/tired_icon.png';
import powerIcon from '../../assets/Media/Icons/power_icon.png';
import muscleIcon from '../../assets/Media/Icons/muscle_icon.png';
import balanceIcon from '../../assets/Media/Icons/balance_icon.png';



// ─── OPTION CARD ────────────────────────────────────────────────────────

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

  // Direct mapping of icon names to images
  const getIconSource = (iconName: string) => {
  switch (iconName) {
    case 'runner_icon': return runnerIcon;
    case 'warrior_icon': return warriorIcon;
    case 'guardian_icon': return guardianIcon;
    case 'walk_icon': return walkIcon;
    case 'carry_icon': return carryIcon;
    case 'sit_icon': return sitIcon;
    case 'hungry_icon': return hungryIcon;
    case 'strong_icon': return strongIcon;
    case 'tired_icon': return tiredIcon;
    case 'power_icon': return powerIcon;
    case 'muscle_icon': return muscleIcon;
    case 'balance_icon': return balanceIcon;
    default: return null;
  }
};

  const imageSource = icon ? getIconSource(icon) : null;
  const isImageIcon = imageSource !== null;
  console.log('🔍 Q3 icon:', icon, 'imageSource:', imageSource ? 'FOUND' : 'NULL');

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.option, isSelected && styles.optionSelected]}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        {isImageIcon ? (
          <Image source={imageSource} style={styles.optionIconImage} />
        ) : (
          icon && <Text style={styles.optionIcon}>{icon}</Text>
        )}
        <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── TREE OPTION CARD (with images) ────────────────────────────────────

const TreeOptionCard = ({
  label,
  archetype,
  onPress,
  isSelected,
}: {
  label: string;
  archetype: string;
  onPress: () => void;
  isSelected: boolean;
}) => {
  const scale = useState(new Animated.Value(1))[0];
  const imageSource = TREE_IMAGES[archetype as keyof typeof TREE_IMAGES];

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
        style={[styles.option, isSelected && styles.optionSelected]}
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        <Image source={imageSource} style={styles.treeImage} />
        <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── QUIZ SCREEN ────────────────────────────────────────────────────────

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
    let resultArchetype: ArchetypeType = 'guardian';

    if (forceGuardian) {
      resultArchetype = 'guardian';
    } else {
      const result = calculateQuizResult(finalAnswers);
      resultArchetype = result.archetype || 'guardian';
    }

    setArchetype(resultArchetype);
    onFinish();
  };

  return (
    <View style={styles.container}>
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
            {currentQ.options.map((option: any, index: number) => {
              if (currentQuestion === 0) {
                return (
                  <TreeOptionCard
                    key={option.id}
                    label={option.label}
                    archetype={option.archetype}
                    onPress={() => handleOptionPress(index)}
                    isSelected={selectedOption === index}
                  />
                );
              }
              return (
                <OptionCard
                  key={option.id}
                  label={option.label}
                  icon={option.icon}
                  onPress={() => handleOptionPress(index)}
                  isSelected={selectedOption === index}
                />
              );
            })}
          </View>

          {currentQuestion === 0 && (
            <View style={styles.imageHintContainer}>
              <Text style={styles.imageHintText}>🌴 Plantain • 🌳 Iroko • 🥭 Mango</Text>
            </View>
          )}

          {currentQuestion === 3 && (
            <View style={styles.safetyNote}>
              <Text style={styles.safetyNoteText}>
                ⚠ If you have any health conditions, we'll recommend the safest path for you.
              </Text>
            </View>
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
      </View>
    </View>
  );
};

// ─── STYLES ─────────────────────────────────────────────────────────────

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
  optionIconImage: {
    width: 30,
    height: 30,
    marginRight: 12,
    resizeMode: 'contain',
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
  treeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
    resizeMode: 'cover',
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