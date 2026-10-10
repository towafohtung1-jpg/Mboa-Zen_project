// ─── src/screens/HubScreen.tsx ─────────────────────────────────────────

import React, { useMemo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import proverbs from '../data/proverbs.json';
import { FadeInView } from '../components/common/FadeInView';
import WaterDrop from '../components/common/WaterDrop';
import { MboaButton } from '../components/common/MboaButton';
import { useSwipeTabs } from '../hooks/useSwipeTabs';
import { useTranslation } from '../i18n/useTranslation';

// ─── ARCHETYPE DATA ──────────────────────────────────────────────────────

const ARCHETYPE_DATA: Record<
  string,
  { image: any; titleKey: string; subtitleKey: string }
> = {
  runner: {
    image: require('../../assets/Media/Archetype/runner_hero.jpeg'),
    titleKey: 'hub.runnerTitle',
    subtitleKey: 'hub.runnerSubtitle',
  },
  warrior: {
    image: require('../../assets/Media/Archetype/warrior_hero.jpeg'),
    titleKey: 'hub.warriorTitle',
    subtitleKey: 'hub.warriorSubtitle',
  },
  guardian: {
    image: require('../../assets/Media/Archetype/guardian_hero.jpeg'),
    titleKey: 'hub.guardianTitle',
    subtitleKey: 'hub.guardianSubtitle',
  },
};

// ─── GUIDE CARDS ─────────────────────────────────────────────────────────

const GUIDE_CARDS: Record<
  string,
  { icon: any; titleKey: string; tipKey: string; color: string }[]
> = {
  runner: [
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), titleKey: 'hub.guideR1Title', tipKey: 'hub.guideR1Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), titleKey: 'hub.guideR2Title', tipKey: 'hub.guideR2Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), titleKey: 'hub.guideR3Title', tipKey: 'hub.guideR3Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), titleKey: 'hub.guideR4Title', tipKey: 'hub.guideR4Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rainy_season.png'), titleKey: 'hub.guideR5Title', tipKey: 'hub.guideR5Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), titleKey: 'hub.guideR6Title', tipKey: 'hub.guideR6Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), titleKey: 'hub.guideR7Title', tipKey: 'hub.guideR7Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), titleKey: 'hub.guideR8Title', tipKey: 'hub.guideR8Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), titleKey: 'hub.guideR9Title', tipKey: 'hub.guideR9Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), titleKey: 'hub.guideR10Title', tipKey: 'hub.guideR10Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), titleKey: 'hub.guideR11Title', tipKey: 'hub.guideR11Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), titleKey: 'hub.guideR12Title', tipKey: 'hub.guideR12Tip', color: Colors.zenGold },
  ],
  warrior: [
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), titleKey: 'hub.guideW1Title', tipKey: 'hub.guideW1Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), titleKey: 'hub.guideW2Title', tipKey: 'hub.guideW2Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), titleKey: 'hub.guideW3Title', tipKey: 'hub.guideW3Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rainy_season.png'), titleKey: 'hub.guideW4Title', tipKey: 'hub.guideW4Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), titleKey: 'hub.guideW5Title', tipKey: 'hub.guideW5Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), titleKey: 'hub.guideW6Title', tipKey: 'hub.guideW6Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), titleKey: 'hub.guideW7Title', tipKey: 'hub.guideW7Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), titleKey: 'hub.guideW8Title', tipKey: 'hub.guideW8Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), titleKey: 'hub.guideW9Title', tipKey: 'hub.guideW9Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), titleKey: 'hub.guideW10Title', tipKey: 'hub.guideW10Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), titleKey: 'hub.guideW11Title', tipKey: 'hub.guideW11Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), titleKey: 'hub.guideW12Title', tipKey: 'hub.guideW12Tip', color: Colors.zenGold },
  ],
  guardian: [
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), titleKey: 'hub.guideG1Title', tipKey: 'hub.guideG1Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), titleKey: 'hub.guideG2Title', tipKey: 'hub.guideG2Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), titleKey: 'hub.guideG3Title', tipKey: 'hub.guideG3Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), titleKey: 'hub.guideG4Title', tipKey: 'hub.guideG4Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), titleKey: 'hub.guideG5Title', tipKey: 'hub.guideG5Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), titleKey: 'hub.guideG6Title', tipKey: 'hub.guideG6Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), titleKey: 'hub.guideG7Title', tipKey: 'hub.guideG7Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rainy_season.png'), titleKey: 'hub.guideG8Title', tipKey: 'hub.guideG8Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), titleKey: 'hub.guideG9Title', tipKey: 'hub.guideG9Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), titleKey: 'hub.guideG10Title', tipKey: 'hub.guideG10Tip', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), titleKey: 'hub.guideG11Title', tipKey: 'hub.guideG11Tip', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), titleKey: 'hub.guideG12Title', tipKey: 'hub.guideG12Tip', color: Colors.zenGold },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────

const getDailyGuides = (archetype: string): any[] => {
  const allCards = GUIDE_CARDS[archetype] || [];
  if (allCards.length <= 4) return allCards;
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const startIndex = (dayOfYear * 4) % allCards.length;
  const cards = [];
  for (let i = 0; i < 4; i++) {
    cards.push(allCards[(startIndex + i) % allCards.length]);
  }
  return cards;
};

type DayScore = 'optimal' | 'rising' | 'beginning' | 'missed' | 'future';

const getScoreFromLog = (log: any): DayScore => {
  if (!log) return 'missed';
  const completed = Object.values(log).filter(Boolean).length;
  if (completed === 3) return 'optimal';
  if (completed === 2) return 'rising';
  if (completed === 1) return 'beginning';
  return 'missed';
};

const SCORE_COLORS: Record<DayScore, string> = {
  optimal: Colors.mboaGreen,
  rising: Colors.zenGold,
  beginning: '#FF9800',
  missed: '#EEEEEE',
  future: 'transparent',
};

const SCORE_TEXT_COLORS: Record<DayScore, string> = {
  optimal: Colors.cleanWhite,
  rising: Colors.earthBlack,
  beginning: Colors.cleanWhite,
  missed: Colors.textMuted,
  future: Colors.textMuted,
};

const getHarmonyLabel = (score: number): string => {
  if (score === 100) return 'OPTIMAL';
  if (score >= 66) return 'RISING';
  if (score >= 33) return 'BEGINNING';
  return 'NOT STARTED';
};

const getHarmonyColor = (score: number): string => {
  if (score === 100) return Colors.mboaGreen;
  if (score >= 66) return Colors.zenGold;
  if (score >= 33) return '#FF9800';
  return Colors.textMuted;
};

// ─── WATER NEAR-MISS / HEALTH MESSAGE ────────────────────────────────────

const getWaterMessage = ({
  waterIntake,
  waterGoal,
  currentStreak,
  personalBest,
  t,
}: {
  waterIntake: number;
  waterGoal: number;
  currentStreak: number;
  personalBest: number;
  t: (k: string) => string;
}): { text: string; color: string } | null => {
  if (currentStreak > 0 && waterIntake < waterGoal) {
    const remaining = waterGoal - waterIntake;
    if (remaining >= 3) {
      return {
        text: t('hub.waterKidneys').replace('{n}', String(waterIntake)).replace('{goal}', String(waterGoal)).replace('{m}', String(remaining)),
        color: Colors.mboaGreen,
      };
    } else if (remaining > 0) {
      return {
        text: t('hub.waterAlmost').replace('{m}', String(remaining)),
        color: Colors.mboaGreen,
      };
    }
  }

  if (
    personalBest > 0 &&
    currentStreak < personalBest &&
    personalBest - currentStreak <= 3
  ) {
    const diff = personalBest - currentStreak;
    return {
      text: t('hub.waterRecord').replace('{d}', String(diff)).replace('{best}', String(personalBest)),
      color: Colors.zenGold,
    };
  }

  const milestones = [
    { days: 3, label: t('hub.mile3') },
    { days: 7, label: t('hub.mile7') },
    { days: 14, label: t('hub.mile14') },
    { days: 30, label: t('hub.mile30') },
    { days: 60, label: t('hub.mile60') },
    { days: 100, label: t('hub.mile100') },
    { days: 365, label: t('hub.mile365') },
  ];
  const nextMilestone = milestones.find((m) => m.days > currentStreak);
  if (nextMilestone) {
    const diff = nextMilestone.days - currentStreak;
    if (diff <= 3 && diff > 0) {
      return {
        text: t('hub.waterMilestone').replace('{d}', String(diff)).replace('{label}', nextMilestone.label),
        color: Colors.zenGold,
      };
    }
  }

  if (waterIntake >= waterGoal) {
    return {
      text: t('hub.waterComplete').replace('{goal}', String(waterGoal)),
      color: Colors.mboaGreen,
    };
  }

  return null;
};

// ─── MILESTONE DEFINITIONS ────────────────────────────────────────────────

const getMilestones = (t: (k: string) => string): Record<number, { title: string; message: string }> => ({
  7: { title: t('hub.ms7'), message: t('hub.ms7') },
  14: { title: t('hub.ms14'), message: t('hub.ms14') },
  30: { title: t('hub.ms30'), message: t('hub.ms30') },
  60: { title: t('hub.ms60'), message: t('hub.ms60') },
  100: { title: t('hub.ms100'), message: t('hub.ms100') },
  365: { title: t('hub.ms365'), message: t('hub.ms365') },
});

const getNewMilestone = (
  waterStreak: number,
  checkInStreak: number,
  celebrated: string[],
  t: (k: string) => string
): { days: number; title: string; message: string; key: string } | null => {
  const MILESTONES = getMilestones(t);
  if (MILESTONES[waterStreak]) {
    const key = `water-${waterStreak}`;
    if (!celebrated.includes(key)) {
      return { days: waterStreak, key, ...MILESTONES[waterStreak] };
    }
  }
  if (MILESTONES[checkInStreak]) {
    const key = `checkin-${checkInStreak}`;
    if (!celebrated.includes(key)) {
      return { days: checkInStreak, key, ...MILESTONES[checkInStreak] };
    }
  }
  return null;
};

// ─── BROKEN-STREAK ORGAN MESSAGE ──────────────────────────────────────────

const getBrokenStreakMessage = (daysSinceLastGoal: number, t: (k: string) => string): { text: string; color: string } | null => {
  if (daysSinceLastGoal <= 0) return null;

  if (daysSinceLastGoal >= 999) {
    return { text: t('hub.brokenNew'), color: Colors.mboaGreen };
  }
  if (daysSinceLastGoal === 1) {
    return { text: t('hub.broken1'), color: '#FF9800' };
  }
  if (daysSinceLastGoal <= 3) {
    return { text: t('hub.broken3').replace('{n}', String(daysSinceLastGoal)), color: '#FF9800' };
  }
  if (daysSinceLastGoal <= 6) {
    return { text: t('hub.broken6').replace('{n}', String(daysSinceLastGoal)), color: Colors.errorRed };
  }
  return { text: t('hub.brokenWeek'), color: Colors.errorRed };
};

// ─── PREVIOUS MONTH SUMMARY ───────────────────────────────────────────────

const PrevMonthSummary = ({
  checkInHistory,
  monthName,
  year,
  onDismiss,
}: {
  checkInHistory: Record<string, any>;
  monthName: string;
  year: number;
  onDismiss: () => void;
}) => {
  const { t } = useTranslation();
  const today = new Date();
  const prevMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
  const prevYear = today.getMonth() === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  let optimal = 0, rising = 0, beginning = 0, missed = 0;
  let hydrationDays = 0, nutritionDays = 0, trainingDays = 0;

  for (let d = 1; d <= daysInPrevMonth; d++) {
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const log = checkInHistory[dateStr];
    const score = getScoreFromLog(log);
    if (score === 'optimal') optimal++;
    else if (score === 'rising') rising++;
    else if (score === 'beginning') beginning++;
    else missed++;
    if (log?.hydration) hydrationDays++;
    if (log?.nutrition) nutritionDays++;
    if (log?.training) trainingDays++;
  }

  const overallScore = Math.round(
    ((optimal * 3 + rising * 2 + beginning) / (daysInPrevMonth * 3)) * 100
  );

  const habitStats = [
    { label: t('hub.hydration'), days: hydrationDays },
    { label: t('hub.nutrition'), days: nutritionDays },
    { label: t('hub.movement'), days: trainingDays },
  ];
  const strongest = [...habitStats].sort((a, b) => b.days - a.days)[0];
  const weakest = [...habitStats].sort((a, b) => a.days - b.days)[0];

  return (
    <View style={styles.prevMonthCard}>
      <Text style={styles.prevMonthTitle}>
        {monthName} {prevYear} — {t('hub.yourMonthComplete')}
      </Text>
      <Text style={styles.prevMonthSubtitle}>
        {t('hub.howHealthJourney')}
      </Text>

      <View style={styles.reportRow}>
        {[
          { label: t('hub.optimal'), count: optimal, bg: Colors.mboaGreen, tc: Colors.cleanWhite },
          { label: t('hub.rising'), count: rising, bg: Colors.zenGold, tc: Colors.earthBlack },
          { label: t('hub.beginning'), count: beginning, bg: '#FF9800', tc: Colors.cleanWhite },
          { label: t('hub.missed'), count: missed, bg: '#EEEEEE', tc: Colors.textMuted },
        ].map((item) => (
          <View key={item.label} style={[styles.reportBadge, { backgroundColor: item.bg }]}>
            <Text style={[styles.reportBadgeNum, { color: item.tc }]}>{item.count}</Text>
            <Text style={[styles.reportBadgeLabel, { color: item.tc }]}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.reportDivider} />

      <Text style={styles.reportOverall}>
        {t('hub.overall')}: {overallScore}% — {getHarmonyLabel(overallScore)}
      </Text>
      <Text style={[styles.reportHabit, { color: Colors.mboaGreen }]}>
        {t('hub.strongest')}: {strongest.label} ({strongest.days}/{daysInPrevMonth} {t('hub.daysSuffix')})
      </Text>
      <Text style={[styles.reportHabit, { color: '#FF9800' }]}>
        {t('hub.needsAttention')}: {weakest.label} ({weakest.days}/{daysInPrevMonth} {t('hub.daysSuffix')})
      </Text>

      <MboaButton
        title={t('hub.startNewMonth')}
        onPress={onDismiss}
        variant="primary"
      />
    </View>
  );
};

// ─── MONTHLY REPORT ───────────────────────────────────────────────────────

const MonthlyReport = ({
  checkInHistory,
}: {
  checkInHistory: Record<string, any>;
}) => {
  const { t } = useTranslation();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthName = today.toLocaleString('default', { month: 'long' });

  let optimal = 0, rising = 0, beginning = 0, missed = 0;
  let hydrationDays = 0, nutritionDays = 0, trainingDays = 0;

  for (let d = 1; d <= today.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const log = checkInHistory[dateStr];
    const score = getScoreFromLog(log);
    if (score === 'optimal') optimal++;
    else if (score === 'rising') rising++;
    else if (score === 'beginning') beginning++;
    else missed++;
    if (log?.hydration) hydrationDays++;
    if (log?.nutrition) nutritionDays++;
    if (log?.training) trainingDays++;
  }

  const totalDays = today.getDate();
  const overallScore = totalDays > 0
    ? Math.round(((optimal * 3 + rising * 2 + beginning) / (totalDays * 3)) * 100)
    : 0;

  const habitStats = [
    { label: t('hub.hydration'), days: hydrationDays },
    { label: t('hub.nutrition'), days: nutritionDays },
    { label: t('hub.movement'), days: trainingDays },
  ];
  const strongest = [...habitStats].sort((a, b) => b.days - a.days)[0];
  const weakest = [...habitStats].sort((a, b) => a.days - b.days)[0];

  return (
    <View style={styles.reportCard}>
      <Text style={styles.reportTitle}>{monthName} {year} — {t('hub.yourHealthReport')}</Text>
      <View style={styles.reportRow}>
        {[
          { label: t('hub.optimal'), count: optimal, bg: Colors.mboaGreen, tc: Colors.cleanWhite },
          { label: t('hub.rising'), count: rising, bg: Colors.zenGold, tc: Colors.earthBlack },
          { label: t('hub.beginning'), count: beginning, bg: '#FF9800', tc: Colors.cleanWhite },
          { label: t('hub.missed'), count: missed, bg: '#EEEEEE', tc: Colors.textMuted },
        ].map((item) => (
          <View key={item.label} style={[styles.reportBadge, { backgroundColor: item.bg }]}>
            <Text style={[styles.reportBadgeNum, { color: item.tc }]}>{item.count}</Text>
            <Text style={[styles.reportBadgeLabel, { color: item.tc }]}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.reportDivider} />
      <Text style={styles.reportOverall}>
        {t('hub.overallScore')}: {overallScore}% — {getHarmonyLabel(overallScore)}
      </Text>
      <Text style={[styles.reportHabit, { color: Colors.mboaGreen }]}>
        {t('hub.strongest')}: {strongest.label} ({strongest.days}/{totalDays} {t('hub.daysSuffix')})
      </Text>
      <Text style={[styles.reportHabit, { color: '#FF9800' }]}>
        {t('hub.needsAttention')}: {weakest.label} ({weakest.days}/{totalDays} {t('hub.daysSuffix')})
      </Text>
    </View>
  );
};

// ─── MONTHLY CALENDAR ─────────────────────────────────────────────────────

const MonthlyCalendar = ({
  checkInHistory,
  streak,
}: {
  checkInHistory: Record<string, any>;
  streak: number;
}) => {
  const { t } = useTranslation();
  const [showReport, setShowReport] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleString('default', { month: 'long' });

  const getDayScore = (day: number): DayScore => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const todayStr = today.toISOString().split('T')[0];
    if (dateStr > todayStr) return 'future';
    return getScoreFromLog(checkInHistory[dateStr]);
  };

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <View style={styles.calendarCard}>
      <View style={styles.calendarTopRow}>
        <View>
          <Text style={styles.calendarMonth}>{monthName} {year}</Text>
          <Text style={styles.streakText}>{streak} {t('hub.daysSuffix')}</Text>
        </View>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => setShowReport(!showReport)}
          activeOpacity={0.8}
        >
          <Text style={styles.reportButtonText}>
            {showReport ? t('hub.hideReport') : t('hub.monthlyReport')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarDayLabels}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <Text key={i} style={styles.dayLabel}>{d}</Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          if (day === null) return <View key={`e-${index}`} style={styles.dayCell} />;
          const score = getDayScore(day);
          const isToday = day === today.getDate();
          return (
            <View
              key={day}
              style={[
                styles.dayCell,
                {
                  backgroundColor: SCORE_COLORS[score],
                  borderWidth: isToday ? 2 : 0,
                  borderColor: isToday ? Colors.mboaGreen : 'transparent',
                },
              ]}
            >
              <Text style={[styles.dayNumber, { color: SCORE_TEXT_COLORS[score] }]}>
                {day}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.calendarLegend}>
        {[
          { label: `${t('hub.optimal')} (3/3)`, color: Colors.mboaGreen },
          { label: `${t('hub.rising')} (2/3)`, color: Colors.zenGold },
          { label: `${t('hub.beginning')} (1/3)`, color: '#FF9800' },
          { label: t('hub.missed'), color: '#EEEEEE' },
        ].map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>

      {showReport && <MonthlyReport checkInHistory={checkInHistory} />}
    </View>
  );
};

// ─── GUIDE CARD LIST ──────────────────────────────────────────────────────

const GuideCardList = ({ guideCards, t }: { guideCards: any[]; t: (k: string) => string }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  return (
    <View>
      {guideCards.map((guide, index) => {
        const isOpen = expandedIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.guideCard, { borderLeftColor: guide.color }]}
            onPress={() => setExpandedIndex(isOpen ? null : index)}
            activeOpacity={0.8}
          >
            <View style={styles.guideTitleRow}>
              <Image
                source={guide.icon}
                style={[styles.guideIconImage, { tintColor: guide.color }]}
                resizeMode="contain"
              />
              <Text style={styles.guideTitle}>{t(guide.titleKey)}</Text>
              <Text style={[styles.guideToggle, { color: guide.color }]}>
                {isOpen ? '▲' : '▼'}
              </Text>
            </View>
            {isOpen && <Text style={styles.guideTip}>{t(guide.tipKey)}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ─── ANSWER TYPE ──────────────────────────────────────────────────────────

type Answer = 'yes' | 'not_yet' | null;

// ─── MAIN HUB SCREEN ──────────────────────────────────────────────────────

const HubScreen = () => {
  const { t, language } = useTranslation();
  const navigation = useNavigation<any>();
  const {
    archetype,
    setArchetype,
    checkIns,
    toggleCheckIn,
    harmonyScore,
    checkInHistory,
    logCheckInHistory,
    lastCheckinDate,
    setLastCheckinDate,
    waterIntake,
    waterGoal,
    setWaterIntake,
    waterHistory,
    getWaterStreak,
    syncWaterForToday,
    getPersonalBest,
    getDaysSinceLastGoal,
    getDaysActive,
    celebratedMilestones,
    markMilestoneCelebrated,
    addNjangiItem,
  } = useUserStore();

  const [guidesExpanded, setGuidesExpanded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showGoodJobModal, setShowGoodJobModal] = useState(false);
  const [milestoneData, setMilestoneData] = useState<{
    days: number;
    title: string;
    message: string;
    key: string;
  } | null>(null);

  const milestoneCheckedRef = useRef(false);
  const panHandlers = useSwipeTabs();

  const scrollRef = useRef<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowScrollTop(y > 400);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const today = new Date();
  const isFirstDayOfMonth = today.getDate() === 1;

  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthName = prevMonth.toLocaleString('default', { month: 'long' });
  const prevMonthYear = prevMonth.getFullYear();

  const [showPrevMonthSummary, setShowPrevMonthSummary] = useState(isFirstDayOfMonth);

  const todayAlreadyAnswered = lastCheckinDate === todayStr;

  const [answers, setAnswers] = useState<{
    hydration: Answer;
    nutrition: Answer;
    training: Answer;
  }>({
    hydration: todayAlreadyAnswered ? (checkIns.hydration ? 'yes' : 'not_yet') : null,
    nutrition: todayAlreadyAnswered ? (checkIns.nutrition ? 'yes' : 'not_yet') : null,
    training: todayAlreadyAnswered ? (checkIns.training ? 'yes' : 'not_yet') : null,
  });

  const answeredCount = Object.values(answers).filter(a => a !== null).length;
  const allAnswered = answeredCount === 3;
  const progressPercent = Math.round((answeredCount / 3) * 100);

  const handleYes = (key: 'hydration' | 'nutrition' | 'training') => {
    const newAnswers = { ...answers, [key]: 'yes' as Answer };
    setAnswers(newAnswers);
    if (!checkIns[key]) toggleCheckIn(key);

    if (key === 'nutrition') addNjangiItem('food');
    if (key === 'training') addNjangiItem('move');

    const allDone = Object.values(newAnswers).filter(a => a !== null).length === 3;
    if (allDone) {
      setLastCheckinDate(todayStr);
      setTimeout(() => setShowProgressModal(true), 400);
    }
  };

  const handleNotYet = (key: 'hydration' | 'nutrition' | 'training') => {
    const newAnswers = { ...answers, [key]: 'not_yet' as Answer };
    setAnswers(newAnswers);
    if (checkIns[key]) toggleCheckIn(key);
    const allDone = Object.values(newAnswers).filter(a => a !== null).length === 3;
    if (allDone) {
      setLastCheckinDate(todayStr);
      setTimeout(() => setShowProgressModal(true), 400);
    }
  };

  const dailyProverb: any = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return (proverbs as any[])[dayOfYear % proverbs.length];
  }, []);

  const streak = useMemo(() => {
    let count = 0;
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const log = checkInHistory[dateStr];
      if (log && Object.values(log).filter(Boolean).length === 3) {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [checkInHistory]);

  useEffect(() => {
    logCheckInHistory();
  }, [checkIns]);

  useEffect(() => {
    syncWaterForToday();
  }, []);

  useEffect(() => {
    if (milestoneCheckedRef.current) return;
    milestoneCheckedRef.current = true;

    const timer = setTimeout(() => {
      const waterStreak = getWaterStreak();
      const checkInStreak = streak;

      const milestone = getNewMilestone(
        waterStreak,
        checkInStreak,
        celebratedMilestones,
        t
      );

      if (milestone) {
        setMilestoneData(milestone);
        markMilestoneCelebrated(milestone.key);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: t('hub.shareMessage'),
        url: 'https://mboa-zen.vercel.app',
        title: 'Mboa-Zen',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const options: { id: 'runner' | 'warrior' | 'guardian'; label: string }[] = [
    { id: 'runner', label: t('hub.runnerTitle') },
    { id: 'warrior', label: t('hub.warriorTitle') },
    { id: 'guardian', label: t('hub.guardianTitle') },
  ];

  const questions: {
    key: 'hydration' | 'nutrition' | 'training';
    question: string;
  }[] = [
    { key: 'hydration', question: t('hub.qa1') },
    { key: 'nutrition', question: t('hub.qa2') },
    { key: 'training', question: t('hub.qa3') },
  ];

  if (!archetype) {
    return (
      <FadeInView style={styles.container} key={refreshKey}>
        <View style={styles.section}>
          <Text style={styles.eyebrow}>{t('hub.eyebrow')}</Text>
          <Text style={styles.header}>{t('hub.archetypeTitle')}</Text>
          <Text style={styles.subHeader}>{t('hub.archetypeSubtitle')}</Text>
          <View style={styles.archetypeButtonRow}>
            {options.map((option) => (
              <MboaButton
                key={option.id}
                title={option.label}
                onPress={() => setArchetype(option.id)}
                variant="primary"
              />
            ))}
          </View>
        </View>
        {showScrollTop && (
          <TouchableOpacity
            style={styles.scrollTopButton}
            onPress={scrollToTop}
            activeOpacity={0.8}
          >
            <Text style={styles.scrollTopArrow}>↑</Text>
          </TouchableOpacity>
        )}
      </FadeInView>
    );
  }

  const guideCards = getDailyGuides(archetype);
  const archetypeData = ARCHETYPE_DATA[archetype];

  return (
    <FadeInView style={styles.container} key={refreshKey} {...panHandlers}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>

          <View style={styles.heroContainer}>
            <Image
              source={archetypeData.image}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>{t(archetypeData.titleKey)}</Text>
              <Text style={styles.heroSubtitle}>{t(archetypeData.subtitleKey)}</Text>
            </View>
          </View>

          <View style={styles.proverbCard}>
            <View style={styles.accentLine} />
            <Text style={styles.proverb}>
              "{language === 'pidgin' ? dailyProverb.proverb_pidgin : language === 'fr' ? dailyProverb.proverb_fr : dailyProverb.proverb}"
            </Text>
            <Text style={styles.author}>— {dailyProverb.origin}</Text>
            <View style={styles.divider} />
            <Text style={styles.lesson}>
              {language === 'pidgin' ? dailyProverb.lesson_pidgin : language === 'fr' ? dailyProverb.lesson_fr : dailyProverb.lesson}
            </Text>
          </View>

          <View style={styles.waterSection}>
            <Text style={styles.waterTitle}>{t('hub.waterTitle')}</Text>
            <View style={styles.dropsContainer}>
              {Array.from({ length: 8 }).map((_, index) => (
                <WaterDrop
                  key={index}
                  filled={index < waterIntake}
                  onPress={() => {
                    if (index < waterIntake) {
                      setWaterIntake(index);
                    } else {
                      const nextAmount = index + 1;
                      const wasBelowGoal = waterIntake < waterGoal;
                      const willHitGoal = nextAmount >= waterGoal;

                      setWaterIntake(nextAmount);

                      if (wasBelowGoal && willHitGoal) {
                        setTimeout(() => setShowGoodJobModal(true), 300);
                        addNjangiItem('water');
                      }
                    }
                  }}
                />
              ))}
            </View>

            <Text style={styles.waterStatus}>
              {waterIntake} / {waterGoal} {t('hub.glasses')}
            </Text>

            {waterIntake >= waterGoal && (
              <Text style={styles.waterComplete}>{t('hub.waterComplete')}</Text>
            )}

            <View style={styles.streakDivider} />
            <View style={styles.streakRow}>
              {Array.from({ length: 7 }).map((_, i) => {
                const offset = 6 - i;
                const d = new Date();
                d.setDate(d.getDate() - offset);
                const dateStr = d.toISOString().split('T')[0];
                const glasses = waterHistory[dateStr] ?? 0;
                const isFilled = glasses >= waterGoal;
                const isToday = offset === 0;
                const letter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d.getDay()];

                return (
                  <View key={i} style={styles.streakDayCol}>
                    <View
                      style={[
                        styles.streakDrop,
                        isFilled && styles.streakDropFilled,
                        isToday && styles.streakDropToday,
                      ]}
                    />
                    <Text style={styles.streakDayLabel}>{letter}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.waterStreakText}>
              {getWaterStreak() > 0
                ? t('hub.daysStrong').replace('{n}', String(getWaterStreak()))
                : t('hub.startYourStreak')}
            </Text>

            {(() => {
              const daysSinceLastGoal = getDaysSinceLastGoal();
              const brokenStreakMsg = getBrokenStreakMessage(daysSinceLastGoal, t);
              if (brokenStreakMsg) {
                return (
                  <View style={styles.waterMessageBox}>
                    <Text style={[styles.waterMessageText, { color: brokenStreakMsg.color }]}>
                      {brokenStreakMsg.text}
                    </Text>
                  </View>
                );
              }

              const nearMissMsg = getWaterMessage({
                waterIntake,
                waterGoal,
                currentStreak: getWaterStreak(),
                personalBest: getPersonalBest(),
                t,
              });

              if (nearMissMsg) {
                return (
                  <View style={styles.waterMessageBox}>
                    <Text style={[styles.waterMessageText, { color: nearMissMsg.color }]}>
                      {nearMissMsg.text}
                    </Text>
                  </View>
                );
              }

              return null;
            })()}

            <View style={styles.daysActiveBox}>
              <Text style={styles.daysActiveNumber}>{getDaysActive()}</Text>
              <Text style={styles.daysActiveLabel}>
                {getDaysActive() === 1 ? t('hub.dayActive') : t('hub.daysActive')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.scanCard}
            onPress={() => navigation.navigate('Scan')}
            activeOpacity={0.85}
          >
            <View style={styles.scanCardContent}>
              <Text style={styles.scanCardTitle}>{t('hub.bodySnapshot')}</Text>
              <Text style={styles.scanCardSubtitle}>{t('hub.bodySnapshotSubtitle')}</Text>
            </View>
            <Text style={styles.scanCardArrow}>→</Text>
          </TouchableOpacity>

          {showPrevMonthSummary && (
            <>
              <Text style={styles.sectionLabel}>{t('hub.lastMonthSummary')}</Text>
              <PrevMonthSummary
                checkInHistory={checkInHistory}
                monthName={prevMonthName}
                year={prevMonthYear}
                onDismiss={() => setShowPrevMonthSummary(false)}
              />
            </>
          )}

          <Text style={styles.sectionLabel}>{t('hub.todayCheckIn')}</Text>

          {todayAlreadyAnswered ? (
            <View style={styles.alreadyDoneCard}>
              <Text style={styles.alreadyDoneTitle}>✓ {t('hub.checkInComplete')}</Text>
              <Text style={styles.alreadyDoneSubtitle}>{t('hub.comeBackTomorrow')}</Text>
              <View style={[styles.progressBarBgLarge, { marginTop: 14 }]}>
                <View
                  style={[
                    styles.progressBarFillLarge,
                    {
                      width: `${harmonyScore}%`,
                      backgroundColor: getHarmonyColor(harmonyScore),
                    },
                  ]}
                />
              </View>
              <Text style={[styles.harmonyRevealScore, { color: getHarmonyColor(harmonyScore), marginTop: 8 }]}>
                {harmonyScore}% — {getHarmonyLabel(harmonyScore)}
              </Text>
            </View>
          ) : (
            <View style={styles.checkInCard}>
              <Text style={styles.checkInIntro}>{t('hub.checkInIntro')}</Text>

              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${progressPercent}%`,
                      backgroundColor: allAnswered
                        ? getHarmonyColor(harmonyScore)
                        : Colors.mboaGreen,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressHint}>
                {t('hub.progressHint').replace('{n}', String(answeredCount))}
                {allAnswered ? ` ${t('hub.progressReady')}` : ''}
              </Text>

              <View style={styles.questionsDivider} />

              {questions.map((item) => {
                const answer = answers[item.key];
                return (
                  <View key={item.key} style={styles.qaBlock}>
                    <Text style={styles.qaQuestion}>
                      {item.question}
                    </Text>
                    <View style={styles.qaButtons}>
                      <TouchableOpacity
                        style={[
                          styles.qaBtn,
                          answer === 'yes' ? styles.qaBtnYesActive : styles.qaBtnYes,
                        ]}
                        onPress={() => handleYes(item.key)}
                        activeOpacity={0.8}
                      >
                        <Text style={[
                          styles.qaBtnText,
                          answer === 'yes' && styles.qaBtnTextWhite,
                        ]}>
                          {t('hub.yes')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.qaBtn,
                          answer === 'not_yet' ? styles.qaBtnNoActive : styles.qaBtnNo,
                        ]}
                        onPress={() => handleNotYet(item.key)}
                        activeOpacity={0.8}
                      >
                        <Text style={[
                          styles.qaBtnText,
                          answer === 'not_yet' && styles.qaBtnNoTextActive,
                        ]}>
                          {t('hub.notYet')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {allAnswered && (
            <MboaButton
              title={t('hub.viewMonthlyProgress')}
              onPress={() => setShowProgressModal(true)}
              variant="primary"
            />
          )}

          <TouchableOpacity
            style={styles.guidesHeader}
            onPress={() => setGuidesExpanded(!guidesExpanded)}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionLabel}>{t('hub.wellnessGuides')}</Text>
            <Text style={styles.guidesToggle}>
              {guidesExpanded ? t('hub.hide') : t('hub.show')}
            </Text>
          </TouchableOpacity>

          {guidesExpanded && <GuideCardList guideCards={guideCards} t={t} />}

          <View style={styles.shareCard}>
            <Text style={styles.shareTitle}>{t('hub.shareTitle')}</Text>
            <Text style={styles.shareSubtitle}>{t('hub.shareSubtitle')}</Text>
            <MboaButton
              title={t('hub.shareApp')}
              onPress={handleShare}
              variant="primary"
            />
          </View>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>

      <Modal
        visible={showProgressModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowProgressModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowProgressModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>

            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.harmonyReveal}>
                <Text style={styles.harmonyRevealLabel}>{t('hub.todayHarmony')}</Text>
                <Text style={[styles.harmonyRevealScore, { color: getHarmonyColor(harmonyScore) }]}>
                  {harmonyScore}% — {getHarmonyLabel(harmonyScore)}
                </Text>
                <View style={styles.progressBarBgLarge}>
                  <View
                    style={[
                      styles.progressBarFillLarge,
                      {
                        width: `${harmonyScore}%`,
                        backgroundColor: getHarmonyColor(harmonyScore),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.harmonyMessage}>
                  {harmonyScore === 100 ? t('hub.harmonyPerfect') : harmonyScore >= 66 ? t('hub.harmonyGreat') : harmonyScore >= 33 ? t('hub.harmonyStarting') : t('hub.harmonyTomorrow')}
                </Text>
              </View>

              <Text style={styles.sectionLabel}>{t('hub.thisMonthProgress')}</Text>
              <MonthlyCalendar
                checkInHistory={checkInHistory}
                streak={streak}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showGoodJobModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowGoodJobModal(false)}
      >
        <View style={styles.goodJobOverlay}>
          <View style={styles.goodJobContainer}>
            <Text style={styles.goodJobEmoji}>🌊</Text>
            <Text style={styles.goodJobTitle}>{t('hub.goodJobTitle')}</Text>
            <Text style={styles.goodJobSubtitle}>{t('hub.goodJobSubtitle').replace('{n}', String(waterGoal))}</Text>

            <View style={styles.goodJobStreakBadge}>
              <Text style={styles.goodJobStreakText}>
                {t('hub.daysStrong').replace('{n}', String(getWaterStreak()))}
              </Text>
            </View>

            <Text style={styles.goodJobMessage}>
              {getWaterStreak() <= 1 ? t('hub.goodJobMsg1') : getWaterStreak() <= 3 ? t('hub.goodJobMsg2') : getWaterStreak() <= 6 ? t('hub.goodJobMsg3') : getWaterStreak() === 7 ? t('hub.goodJobMsg4') : getWaterStreak() <= 13 ? t('hub.goodJobMsg5') : getWaterStreak() <= 29 ? t('hub.goodJobMsg6') : t('hub.goodJobMsg7')}
            </Text>

            <View style={styles.goodJobButtonRow}>
              <MboaButton
                title={t('hub.done')}
                onPress={() => setShowGoodJobModal(false)}
                variant="primary"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={!!milestoneData}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setMilestoneData(null)}
      >
        <View style={styles.milestoneOverlay}>
          <View style={styles.milestoneContainer}>
            <Text style={styles.milestoneStar}>⭐</Text>
            <Text style={styles.milestoneDays}>{milestoneData?.days}</Text>
            <Text style={styles.milestoneDaysLabel}>
              {milestoneData?.days === 1 ? t('hub.daySuffix') : t('hub.daysSuffix')}
            </Text>
            <Text style={styles.milestoneTitle}>{milestoneData?.title}</Text>
            <Text style={styles.milestoneMessage}>{milestoneData?.message}</Text>

            <View style={styles.milestoneButtonRow}>
              <MboaButton
                title={t('hub.keepGoing')}
                onPress={() => setMilestoneData(null)}
                variant="primary"
              />
            </View>
          </View>
        </View>
      </Modal>

      {showScrollTop && (
        <TouchableOpacity
          style={styles.scrollTopButton}
          onPress={scrollToTop}
          activeOpacity={0.8}
        >
          <Text style={styles.scrollTopArrow}>↑</Text>
        </TouchableOpacity>
      )}
    </FadeInView>
  );
};

// ─── STYLES ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cleanWhite, alignItems: 'center' },
  scrollContent: { width: '100%', alignItems: 'center' },
  section: { width: '100%', maxWidth: 480, paddingHorizontal: 20, paddingTop: 20 },

  eyebrow: { fontSize: 11, ...FONTS.bold, color: Colors.zenGold, letterSpacing: 3, marginBottom: 6 },
  header: { fontSize: 28, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 24 },
  subHeader: { fontSize: 14, ...FONTS.regular, color: Colors.textMuted, lineHeight: 22, marginBottom: 28 },
  archetypeButtonRow: {
    alignItems: 'flex-end',
    gap: 12,
  },

  heroContainer: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  heroTitle: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  heroSubtitle: {
    fontSize: 14,
    ...FONTS.regular,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },

  proverbCard: { width: '100%', padding: 24, backgroundColor: Colors.softBg, borderRadius: 18, position: 'relative', marginBottom: 28 },
  accentLine: { position: 'absolute', top: 16, left: 0, width: 4, height: 40, backgroundColor: Colors.zenGold, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  proverb: { fontSize: 18, ...FONTS.medium, marginBottom: 12, color: Colors.earthBlack, lineHeight: 28, fontStyle: 'italic', marginLeft: 12 },
  author: { fontSize: 13, ...FONTS.semibold, color: Colors.mboaGreen, textAlign: 'right', letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#D9D9D9', marginVertical: 16 },
  lesson: { fontSize: 14, ...FONTS.regular, color: Colors.textMuted, lineHeight: 22 },

  sectionLabel: { fontSize: 11, ...FONTS.bold, color: Colors.earthBlack, letterSpacing: 2, marginBottom: 12, marginTop: 4 },

  prevMonthCard: { width: '100%', backgroundColor: '#F1FAF3', borderRadius: 18, padding: 20, marginBottom: 20, borderWidth: 2, borderColor: Colors.mboaGreen },
  prevMonthTitle: { fontSize: 16, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 6 },
  prevMonthSubtitle: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, marginBottom: 16 },

  alreadyDoneCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  alreadyDoneTitle: { fontSize: 15, ...FONTS.bold, color: Colors.mboaGreen, marginBottom: 4 },
  alreadyDoneSubtitle: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted },

  checkInCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  checkInIntro: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, lineHeight: 20, marginBottom: 16, fontStyle: 'italic' },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressBarFill: { height: 8, borderRadius: 4 },
  progressHint: { fontSize: 11, ...FONTS.medium, color: Colors.textMuted, marginBottom: 16 },
  questionsDivider: { height: 1, backgroundColor: '#E0E0E0', marginBottom: 16 },
  qaBlock: { marginBottom: 20 },
  qaQuestion: { fontSize: 15, ...FONTS.bold, color: Colors.earthBlack, lineHeight: 22, marginBottom: 12 },
  qaButtons: { flexDirection: 'row', gap: 12 },
  qaBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderBottomWidth: 3,
    backgroundColor: 'transparent',
  },
  qaBtnYes: {
    borderColor: Colors.mboaGreen,
    borderBottomColor: Colors.zenGold,
  },
  qaBtnYesActive: {
    backgroundColor: Colors.mboaGreen,
    borderColor: Colors.mboaGreen,
    borderBottomColor: Colors.zenGold,
  },
  qaBtnNo: {
    borderColor: Colors.mboaGreen,
    borderBottomColor: Colors.zenGold,
  },
  qaBtnNoActive: {
    backgroundColor: Colors.zenGold,
    borderColor: Colors.zenGold,
    borderBottomColor: Colors.mboaGreen,
  },
  qaBtnText: { fontSize: 14, ...FONTS.bold, color: Colors.mboaGreen },
  qaBtnTextWhite: { color: Colors.cleanWhite },
  qaBtnNoTextActive: { color: Colors.earthBlack },

  harmonyReveal: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  harmonyRevealLabel: { fontSize: 11, ...FONTS.bold, color: Colors.textMuted, letterSpacing: 2, marginBottom: 8 },
  harmonyRevealScore: { fontSize: 24, ...FONTS.bold, marginBottom: 14 },
  progressBarBgLarge: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden', marginBottom: 14 },
  progressBarFillLarge: { height: 10, borderRadius: 5 },
  harmonyMessage: { fontSize: 14, ...FONTS.regular, color: Colors.textMuted, lineHeight: 22, fontStyle: 'italic' },

  calendarCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  streakText: { fontSize: 12, ...FONTS.bold, color: '#FF6D00' },
  calendarTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  calendarMonth: { fontSize: 15, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 4 },
  reportButton: { backgroundColor: Colors.mboaGreen, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  reportButtonText: { fontSize: 11, ...FONTS.bold, color: Colors.cleanWhite },
  calendarDayLabels: { flexDirection: 'row', marginBottom: 6 },
  dayLabel: { flex: 1, textAlign: 'center', fontSize: 11, ...FONTS.bold, color: Colors.textMuted },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  dayNumber: { fontSize: 11, ...FONTS.medium },
  calendarLegend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 6, marginBottom: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 4 },
  legendText: { fontSize: 10, ...FONTS.regular, color: Colors.textMuted },

  reportCard: { width: '100%', backgroundColor: Colors.cleanWhite, borderRadius: 14, padding: 16, marginTop: 16 },
  reportTitle: { fontSize: 14, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 14 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  reportBadge: { flex: 1, marginHorizontal: 3, borderRadius: 10, padding: 10, alignItems: 'center' },
  reportBadgeNum: { fontSize: 20, ...FONTS.bold },
  reportBadgeLabel: { fontSize: 10, ...FONTS.medium, marginTop: 2 },
  reportDivider: { height: 1, backgroundColor: '#EEEEEE', marginVertical: 12 },
  reportOverall: { fontSize: 14, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 8 },
  reportHabit: { fontSize: 13, ...FONTS.medium, marginBottom: 4 },

  guidesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  guidesToggle: { fontSize: 12, ...FONTS.bold, color: Colors.mboaGreen },
  guideCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 14, marginBottom: 12, padding: 16, borderLeftWidth: 4 },
  guideTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  guideIconImage: { width: 22, height: 22, marginRight: 10 },
  guideTitle: { fontSize: 15, ...FONTS.bold, color: Colors.earthBlack, flex: 1 },
  guideToggle: { fontSize: 11, ...FONTS.bold, marginLeft: 8 },
  guideTip: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, lineHeight: 20, marginTop: 8 },

  shareCard: { width: '100%', backgroundColor: '#F1FAF3', borderRadius: 18, padding: 20, marginTop: 8, borderWidth: 1, borderColor: Colors.mboaGreen, alignItems: 'center' },
  shareTitle: { fontSize: 16, ...FONTS.bold, color: Colors.earthBlack, textAlign: 'center', marginBottom: 8 },
  shareSubtitle: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 16 },

  waterSection: {
    width: '100%',
    backgroundColor: Colors.softBg,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  waterTitle: {
    fontSize: 15,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 14,
  },
  dropsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  waterStatus: {
    fontSize: 14,
    ...FONTS.medium,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  waterComplete: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    textAlign: 'center',
    marginTop: 8,
  },

  streakDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 16,
    marginBottom: 12,
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  streakDayCol: {
    alignItems: 'center',
  },
  streakDrop: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#D0D0D0',
    marginBottom: 6,
  },
  streakDropFilled: {
    backgroundColor: '#2F80ED',
    borderColor: '#2F80ED',
  },
  streakDropToday: {
    borderColor: Colors.mboaGreen,
  },
  streakDayLabel: {
    fontSize: 10,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
  waterStreakText: {
    fontSize: 13,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    textAlign: 'center',
  },

  waterMessageBox: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.zenGold,
  },
  waterMessageText: {
    fontSize: 13,
    ...FONTS.medium,
    lineHeight: 20,
    textAlign: 'center',
  },

  daysActiveBox: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 6,
  },
  daysActiveNumber: {
    fontSize: 20,
    ...FONTS.bold,
    color: Colors.zenGold,
  },
  daysActiveLabel: {
    fontSize: 13,
    ...FONTS.medium,
    color: Colors.textMuted,
  },

  scanCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softBg,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.zenGold,
  },
  scanCardContent: {
    flex: 1,
  },
  scanCardTitle: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 4,
  },
  scanCardSubtitle: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 19,
  },
  scanCardArrow: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    marginLeft: 12,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.cleanWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '60%',
    paddingTop: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 16,
    zIndex: 10,
    backgroundColor: Colors.softBg,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  modalScroll: {
    width: '100%',
  },
  modalScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  goodJobOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  goodJobContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.cleanWhite,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderTopWidth: 6,
    borderTopColor: Colors.zenGold,
  },
  goodJobEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  goodJobTitle: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    marginBottom: 8,
  },
  goodJobSubtitle: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  goodJobStreakBadge: {
    backgroundColor: '#F1FAF3',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.mboaGreen,
  },
  goodJobStreakText: {
    fontSize: 15,
    ...FONTS.bold,
    color: Colors.mboaGreen,
  },
  goodJobMessage: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.earthBlack,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    fontStyle: 'italic',
  },
  goodJobButtonRow: {
    alignItems: 'center',
  },

  milestoneOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  milestoneContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: Colors.cleanWhite,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderTopWidth: 6,
    borderTopColor: Colors.zenGold,
    borderBottomWidth: 6,
    borderBottomColor: Colors.mboaGreen,
  },
  milestoneStar: {
    fontSize: 72,
    marginBottom: 8,
  },
  milestoneDays: {
    fontSize: 64,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    lineHeight: 70,
  },
  milestoneDaysLabel: {
    fontSize: 16,
    ...FONTS.medium,
    color: Colors.textMuted,
    letterSpacing: 2,
    marginBottom: 20,
  },
  milestoneTitle: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.zenGold,
    marginBottom: 12,
    textAlign: 'center',
  },
  milestoneMessage: {
    fontSize: 15,
    ...FONTS.regular,
    color: Colors.earthBlack,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    fontStyle: 'italic',
  },
  milestoneButtonRow: {
    alignItems: 'center',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Colors.zenGold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  scrollTopArrow: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
});

export default HubScreen;