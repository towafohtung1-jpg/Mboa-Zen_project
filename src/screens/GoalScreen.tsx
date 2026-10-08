// ─── src/screens/GoalScreen.tsx ────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { MboaButton } from '../components/common/MboaButton';
import { useTranslation } from '../i18n/useTranslation';

import fireIcon from '../../assets/Media/Icons/fire_icon.png';
import strongIcon from '../../assets/Media/Icons/strong_icon.png';
import walkIcon from '../../assets/Media/Icons/walk_icon.png';
import foodIcon from '../../assets/Media/Icons/food_icon.png';

type Props = {
  onFinish: () => void;
};

const GoalScreen = ({ onFinish }: Props) => {
  const { t } = useTranslation();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    { id: 'lose_weight', icon: fireIcon, label: t('goal.loseWeight'), desc: t('goal.loseWeightDesc') },
    { id: 'build_strength', icon: strongIcon, label: t('goal.buildStrength'), desc: t('goal.buildStrengthDesc') },
    { id: 'stay_active', icon: walkIcon, label: t('goal.stayActive'), desc: t('goal.stayActiveDesc') },
    { id: 'eat_better', icon: foodIcon, label: t('goal.eatBetter'), desc: t('goal.eatBetterDesc') },
  ];

  return (
    <FadeInView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>{t('goal.eyebrow')}</Text>
          <Text style={styles.title}>{t('goal.title')}</Text>
          <Text style={styles.subtitle}>{t('goal.subtitle')}</Text>
        </View>

        <View style={styles.goalsContainer}>
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                onPress={() => setSelectedGoal(goal.id)}
                activeOpacity={0.85}
              >
                <Image source={goal.icon} style={styles.goalIcon} resizeMode="contain" />
                <View style={styles.goalTextContainer}>
                  <Text style={styles.goalLabel}>{goal.label}</Text>
                  <Text style={styles.goalDesc}>{goal.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonRow}>
            <MboaButton
              title={t('goal.continue')}
              onPress={onFinish}
              variant="primary"
              disabled={!selectedGoal}
            />
            <MboaButton
              title={t('goal.skip')}
              onPress={onFinish}
              variant="outline"
            />
          </View>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 480,
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  goalsContainer: {
    width: '100%',
    maxWidth: 480,
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
    width: 40,
    height: 40,
    marginRight: 16,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalLabel: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 2,
  },
  goalDesc: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  footer: {
    width: '100%',
    maxWidth: 480,
  },
  buttonRow: {
    gap: 12,
  },
});

export default GoalScreen;