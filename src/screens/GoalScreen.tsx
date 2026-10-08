// ─── src/screens/GoalScreen.tsx ─────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { FadeInView } from '../components/common/FadeInView';
import { MboaButton } from '../components/common/MboaButton';
import { useTranslation } from '../i18n/useTranslation';

// ─── ICON IMAGES ────────────────────────────────────────────────────────

import fireIcon from '../../assets/Media/Icons/fire_icon.png';
import strongIcon from '../../assets/Media/Icons/strong_icon.png';
import walkIcon from '../../assets/Media/Icons/walk_icon.png';
import foodIcon from '../../assets/Media/Icons/food_icon.png';

type Props = {
  onFinish: () => void;
};

const GoalScreen = ({ onFinish }: Props) => {
  const { t } = useTranslation();
  const goals = [
    { id: 'lose_weight', icon: 'fire_icon', label: t('goal.loseWeight'), desc: t('goal.loseWeightDesc') },
    { id: 'build_strength', icon: 'strong_icon', label: t('goal.buildStrength'), desc: t('goal.buildStrengthDesc') },
    { id: 'stay_active', icon: 'walk_icon', label: t('goal.stayActive'), desc: t('goal.stayActiveDesc') },
    { id: 'eat_better', icon: 'food_icon', label: t('goal.eatBetter'), desc: t('goal.eatBetterDesc') },
  ];

  const [selectedGoal, setSelectedGoal] = React.useState<string | null>(null);

  return (
    <FadeInView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerArea}>
          <Text style={styles.eyebrow}>{t('goal.eyebrow')}</Text>
          <Text style={styles.title}>{t('goal.title')}</Text>
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
              {goal.icon === 'fire_icon' && <Image source={fireIcon} style={styles.goalIconImage} />}
              {goal.icon === 'strong_icon' && <Image source={strongIcon} style={styles.goalIconImage} />}
              {goal.icon === 'walk_icon' && <Image source={walkIcon} style={styles.goalIconImage} />}
              {goal.icon === 'food_icon' && <Image source={foodIcon} style={styles.goalIconImage} />}
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

                <View style={styles.buttonRow}>
          <MboaButton
            title={t('goal.continue')}
            onPress={onFinish}
            disabled={!selectedGoal}
          />

          <MboaButton
            title={t('goal.skip')}
            onPress={onFinish}
            variant="outline"
          />
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
  goalIconImage: {
    width: 30,
    height: 30,
    marginRight: 14,
    resizeMode: 'contain',
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

    buttonRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent:'flex-end'
  },
  
});

export default GoalScreen;




