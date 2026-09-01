// ─── src/screens/HubScreen.tsx ─────────────────────────────────────────

import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import proverbs from '../data/proverbs.json';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedButton } from '../components/common/AnimatedButton';
import { useLanguage } from '../context/LanguageContext';

// ─── GUIDE CARDS ──────────────────────────────────────────────────────────

const GUIDE_CARDS: Record<
  string,
  { icon: any; title: string; tip: string; color: string }[]
> = {
  runner: [
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), title: 'Drink More In Harmattan', tip: 'When the dry season comes, your body loses water much faster than normal. Drink at least 8 cups of water every day. Start every morning with warm water and ginger before you go anywhere.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), title: 'Food For Hard Work', tip: 'A working person needs starchy food for energy — plantain, yam, rice, or fufu. Add any protein you can find — beans, fish, egg, or meat. Without proper food, your body cannot keep up.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), title: 'What To Eat Before You Move', tip: 'Before exercise or a long day of work, eat something starchy 30 to 45 minutes before you start. Ripe plantain, sweet potato, or pap gives your body clean energy. Do not exercise on an empty stomach.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), title: 'Rest Is Part Of The Plan', tip: 'Your body repairs itself when you sleep, not when you exercise. Seven to eight hours of sleep is not laziness — it is part of staying healthy and strong.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rainy_season.png'), title: 'Eating In The Rainy Season', tip: 'During the rainy season, your body needs more immune support. Add ginger, garlic, and bitter leaf to your meals. Eat warm, freshly cooked food as much as possible.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), title: "Runner's Road Side Guide", tip: 'When buying food outside before an active day, choose fish or egg over heavy meat. Ask for boiled plantain instead of fried. Your stomach needs to be light to move well.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), title: 'Morning Water Habit', tip: 'Before you eat anything in the morning, drink one full cup of clean water. This simple habit wakes up your digestion and gives your body a clean start.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), title: 'Affordable Energy Foods', tip: 'Pap, boiled yam, ripe plantain, sweet potato — these are among the best energy foods available and they cost very little. Eat them regularly and your body will feel the difference.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), title: 'Walk More Than You Think', tip: 'Walking fast for 30 minutes every day is enough to improve your heart health. Park further away. Take the stairs. Choose movement wherever you can.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), title: 'Your Body Speaks To You', tip: 'When you feel exhausted mid-day, it is often dehydration or low blood sugar. Drink water and eat a small snack before assuming you are just tired.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), title: 'Add Vegetables Everywhere', tip: 'Whatever you are eating today, add one vegetable to it. Njama-njama, bitter leaf, garden egg, tomatoes — any vegetable counts. This one habit improves your nutrition without changing your entire diet.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), title: 'Eat Earlier In The Evening', tip: 'Try to finish your last meal before 7pm whenever possible. A lighter, earlier supper improves your sleep and your energy the next morning.', color: Colors.zenGold },
  ],
  warrior: [
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), title: 'Eating Outside? Choose Well', tip: 'When you buy from a road-side vendor, always choose grilled over fried. Ask for fish or chicken instead of processed meat. These small choices every day make a real difference.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), title: 'For Those Who Work With Their Hands', tip: 'Builders, electricians, plumbers, farmers, drivers — your body works harder than most. After a heavy day, eat beans, fish, eggs, or any meat alongside your starch.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), title: 'Water Makes You Stronger', tip: 'When you are dehydrated, your muscles become weak and your mind slows down. Drink water before you start work. Choose water or fresh juice over sodas.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rainy_season.png'), title: 'Stay Safe Eating In The Rain', tip: 'During the rainy season, food goes bad faster. Choose food that is freshly cooked and visibly hot. Avoid food that has been sitting open for a long time.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), title: 'Protein After Physical Work', tip: 'After any heavy physical work, your muscles need to be rebuilt. Eat beans, fish, groundnuts, or any available meat within two hours of finishing work.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), title: 'Rest Days Are Not Wasted Days', tip: 'Your muscles do not grow during exercise — they grow during rest. Taking one or two rest days per week is not laziness. Sleep well, eat well, and let your body do its work.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), title: "Groundnuts Are A Warrior's Friend", tip: 'Roasted groundnuts are one of the best affordable protein sources in Cameroon. Keep some in your bag — they are the perfect working person\'s snack.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), title: 'Eggs Every Day', tip: 'If you can afford one egg per day, eat it. Boiled, fried, or mixed into any meal — eggs support muscle recovery better than most foods at their price.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), title: 'Salt And Physical Work', tip: 'When you sweat heavily during physical work, your body loses salt alongside water. A little extra salt on heavy work days is not unhealthy — it replaces what your body lost.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), title: 'The Suya Option', tip: 'Suya — grilled spiced meat on a skewer — is actually a good protein choice when eating outside. It is grilled not fried. Choose suya over fried options when available.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), title: 'Stretch Before You Start', tip: 'Before any heavy physical work, spend five minutes stretching your back, arms, and legs. A builder who injures their back loses weeks of income. Prevention costs nothing.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), title: 'Do Not Skip Breakfast', tip: 'Starting heavy physical work without eating is like starting a car without fuel. Even pap and puff-puff is better than nothing before a hard day.', color: Colors.zenGold },
  ],
  guardian: [
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), title: 'Buying Food Outside? Here Is How', tip: 'When buying from vendors, ask for boiled or grilled instead of fried. Choose pepper soup, plain rice with vegetables, or beans over heavy fried options.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), title: "You Don't Have To Finish The Plate", tip: 'Vendor plates in Cameroon are often very large portions. Stop eating when you feel satisfied. Eat slowly and stop when full. Save the rest or share it.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), title: 'Foods That Cool The Body Down', tip: 'Ginger, garlic, njama-njama, pumpkin leaves, and bitter leaf reduce pain and tiredness inside the body. Try to include one in your meals every day.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), title: 'Eat Light At Night', tip: 'Choose something light for supper — pepper soup, boiled vegetables, a small portion of beans. Heavy fufu or fried food late at night makes weight control very difficult.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'), title: 'Drink Water Before You Eat', tip: 'Drinking one full glass of water 15 to 20 minutes before a meal reduces how much you eat naturally. Your body often confuses thirst with hunger.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'), title: 'Sleep And Weight Control', tip: 'Poor sleep increases hunger hormones and cravings for heavy food. Good sleep is not optional — it is a health tool that supports every other effort you make.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'), title: 'Beans Are Your Best Friend', tip: 'Beans are high in fiber, protein, and complex carbohydrates. They fill you up for longer than rice or fufu and cost less. Eat beans regularly and you will naturally eat less of everything else.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rainy_season.png'), title: 'Soups Over Solids', tip: 'Pepper soup, light egusi soup, and vegetable soups fill you up with fewer calories than solid starchy meals. Choose soup-based meals when managing your weight.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'), title: 'Chew Slowly', tip: 'It takes 20 minutes for your brain to receive the signal that you are full. If you eat quickly, you will eat far more than your body needs. Slow down between bites.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'), title: 'Move After You Eat', tip: 'A short 10-minute walk after a meal significantly improves how your body processes food. It reduces blood sugar spikes and aids digestion.', color: Colors.zenGold },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'), title: 'Avoid Sugary Drinks', tip: 'Sodas, energy drinks, and sweetened juices add significant calories with no nutritional benefit. Replace one sugary drink per day with water or lemon water.', color: Colors.mboaGreen },
    { icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'), title: 'The Two-Hour Rule', tip: 'Stop eating two hours before you go to sleep. Whatever you eat late gets stored more easily. If you feel hungry late at night, drink warm water or ginger tea instead.', color: Colors.zenGold },
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
    { label: '💧 Hydration', days: hydrationDays },
    { label: '🍽️ Nutrition', days: nutritionDays },
    { label: '💪 Movement', days: trainingDays },
  ];
  const strongest = [...habitStats].sort((a, b) => b.days - a.days)[0];
  const weakest = [...habitStats].sort((a, b) => a.days - b.days)[0];

  return (
    <View style={styles.prevMonthCard}>
      <Text style={styles.prevMonthTitle}>
        🎉 {monthName} {prevYear} — Your Month Is Complete!
      </Text>
      <Text style={styles.prevMonthSubtitle}>
        Here is how your health journey went last month.
      </Text>

      <View style={styles.reportRow}>
        {[
          { label: 'Optimal', count: optimal, bg: Colors.mboaGreen, tc: Colors.cleanWhite },
          { label: 'Rising', count: rising, bg: Colors.zenGold, tc: Colors.earthBlack },
          { label: 'Beginning', count: beginning, bg: '#FF9800', tc: Colors.cleanWhite },
          { label: 'Missed', count: missed, bg: '#EEEEEE', tc: Colors.textMuted },
        ].map((item) => (
          <View key={item.label} style={[styles.reportBadge, { backgroundColor: item.bg }]}>
            <Text style={[styles.reportBadgeNum, { color: item.tc }]}>{item.count}</Text>
            <Text style={[styles.reportBadgeLabel, { color: item.tc }]}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.reportDivider} />

      <Text style={styles.reportOverall}>
        Overall: {overallScore}% — {getHarmonyLabel(overallScore)}
      </Text>
      <Text style={[styles.reportHabit, { color: Colors.mboaGreen }]}>
        Strongest: {strongest.label} ({strongest.days}/{daysInPrevMonth} days)
      </Text>
      <Text style={[styles.reportHabit, { color: '#FF9800' }]}>
        Needs attention: {weakest.label} ({weakest.days}/{daysInPrevMonth} days)
      </Text>

      <TouchableOpacity
        style={styles.prevMonthDismiss}
        onPress={onDismiss}
        activeOpacity={0.8}
      >
        <Text style={styles.prevMonthDismissText}>Start New Month →</Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── MONTHLY REPORT ───────────────────────────────────────────────────────

const MonthlyReport = ({
  checkInHistory,
}: {
  checkInHistory: Record<string, any>;
}) => {
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
    { label: '💧 Hydration', days: hydrationDays },
    { label: '🍽️ Nutrition', days: nutritionDays },
    { label: '💪 Movement', days: trainingDays },
  ];
  const strongest = [...habitStats].sort((a, b) => b.days - a.days)[0];
  const weakest = [...habitStats].sort((a, b) => a.days - b.days)[0];

  return (
    <View style={styles.reportCard}>
      <Text style={styles.reportTitle}>{monthName} {year} — Your Health Report</Text>
      <View style={styles.reportRow}>
        {[
          { label: 'Optimal', count: optimal, bg: Colors.mboaGreen, tc: Colors.cleanWhite },
          { label: 'Rising', count: rising, bg: Colors.zenGold, tc: Colors.earthBlack },
          { label: 'Beginning', count: beginning, bg: '#FF9800', tc: Colors.cleanWhite },
          { label: 'Missed', count: missed, bg: '#EEEEEE', tc: Colors.textMuted },
        ].map((item) => (
          <View key={item.label} style={[styles.reportBadge, { backgroundColor: item.bg }]}>
            <Text style={[styles.reportBadgeNum, { color: item.tc }]}>{item.count}</Text>
            <Text style={[styles.reportBadgeLabel, { color: item.tc }]}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.reportDivider} />
      <Text style={styles.reportOverall}>
        Overall Score: {overallScore}% — {getHarmonyLabel(overallScore)}
      </Text>
      <Text style={[styles.reportHabit, { color: Colors.mboaGreen }]}>
        Strongest: {strongest.label} ({strongest.days}/{totalDays} days)
      </Text>
      <Text style={[styles.reportHabit, { color: '#FF9800' }]}>
        Needs attention: {weakest.label} ({weakest.days}/{totalDays} days)
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
          <Text style={styles.streakText}>🔥 {streak} day streak</Text>
        </View>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => setShowReport(!showReport)}
          activeOpacity={0.8}
        >
          <Text style={styles.reportButtonText}>
            {showReport ? 'Hide Report' : 'Monthly Report'}
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
          { label: 'Optimal (3/3)', color: Colors.mboaGreen },
          { label: 'Rising (2/3)', color: Colors.zenGold },
          { label: 'Beginning (1/3)', color: '#FF9800' },
          { label: 'Missed', color: '#EEEEEE' },
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

const GuideCardList = ({ guideCards }: { guideCards: any[] }) => {
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
              <Text style={styles.guideTitle}>{guide.title}</Text>
              <Text style={[styles.guideToggle, { color: guide.color }]}>
                {isOpen ? '▲' : '▼'}
              </Text>
            </View>
            {isOpen && <Text style={styles.guideTip}>{guide.tip}</Text>}
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
  const { t, language } = useLanguage();
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
    // ─── WATER STATE ─────────────────────────────────────────────────────
    waterIntake,
    waterGoal,
    waterHistory,
    setWaterIntake,
    resetWater,
    logWaterHistory,
  } = useUserStore();

  const [guidesExpanded, setGuidesExpanded] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // ─── Force re-render when language changes ────────────────────────────
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [language]);

  // ─── WATER FUNCTIONS ──────────────────────────────────────────────────
  const handleAddWater = () => {
    if (waterIntake < 20) {
      const newAmount = waterIntake + 1;
      setWaterIntake(newAmount);
      if (newAmount >= waterGoal) {
        logWaterHistory();
      }
    }
  };

  const handleResetWater = () => {
    resetWater();
  };

  // Date helpers
  const todayStr = new Date().toISOString().split('T')[0];
  const today = new Date();
  const isFirstDayOfMonth = today.getDate() === 1;

  // Previous month info for end-of-month summary
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthName = prevMonth.toLocaleString('default', { month: 'long' });
  const prevMonthYear = prevMonth.getFullYear();

  // Show previous month summary only on first day of month
  const [showPrevMonthSummary, setShowPrevMonthSummary] = useState(isFirstDayOfMonth);

  // Has today already been fully answered?
  const todayAlreadyAnswered = lastCheckinDate === todayStr;

  // Local answer state — resets when component mounts fresh
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

  // Handle YES
  const handleYes = (key: 'hydration' | 'nutrition' | 'training') => {
    const newAnswers = { ...answers, [key]: 'yes' as Answer };
    setAnswers(newAnswers);
    if (!checkIns[key]) toggleCheckIn(key);
    const allDone = Object.values(newAnswers).filter(a => a !== null).length === 3;
    if (allDone) setLastCheckinDate(todayStr);
  };

  // Handle NOT YET
  const handleNotYet = (key: 'hydration' | 'nutrition' | 'training') => {
    const newAnswers = { ...answers, [key]: 'not_yet' as Answer };
    setAnswers(newAnswers);
    if (checkIns[key]) toggleCheckIn(key);
    const allDone = Object.values(newAnswers).filter(a => a !== null).length === 3;
    if (allDone) setLastCheckinDate(todayStr);
  };

  // Daily proverb — fixed for the day
  const dailyProverb: any = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return (proverbs as any[])[dayOfYear % proverbs.length];
  }, []);

  // Streak calculator
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

  // Auto-log to history on every check-in change
  useEffect(() => {
    logCheckInHistory();
  }, [checkIns]);

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'I am using Mboa-Zen — a health and fitness app built for Cameroon using our local foods and home workouts. No gym needed. Try it free: https://mboa-zen.vercel.app',
        url: 'https://mboa-zen.vercel.app',
        title: 'Mboa-Zen — Local Wellness for Cameroon',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const options: { id: 'runner' | 'warrior' | 'guardian'; label: string }[] = [
    { id: 'runner', label: t('archetype.runner_title') },
    { id: 'warrior', label: t('archetype.warrior_title') },
    { id: 'guardian', label: t('archetype.guardian_title') },
  ];

  const questions: {
    key: 'hydration' | 'nutrition' | 'training';
    emoji: string;
    question: string;
  }[] = [
    { key: 'hydration', emoji: '💧', question: t('hub.hydration') },
    { key: 'nutrition', emoji: '🍽️', question: t('hub.nutrition') },
    { key: 'training', emoji: '💪', question: t('hub.training') },
  ];

  // Archetype selection screen
  if (!archetype) {
    return (
      <FadeInView style={styles.container} key={refreshKey}>
        <View style={styles.section}>
          <Text style={styles.eyebrow}>{t('hub.your_journey')}</Text>
          <Text style={styles.header}>{t('hub.find_your_archetype')}</Text>
          <Text style={styles.subHeader}>
            {t('hub.select_your_path')}
          </Text>
          {options.map((option) => (
            <AnimatedButton
              key={option.id}
              title={option.label}
              onPress={() => setArchetype(option.id)}
              variant="primary"
              style={styles.archetypeButton}
            />
          ))}
        </View>
      </FadeInView>
    );
  }

  const guideCards = getDailyGuides(archetype);

  return (
    <FadeInView style={styles.container} key={refreshKey}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>

          {/* Header */}
          <Text style={styles.eyebrow}>{t('hub.daily_mindset')}</Text>
          <Text style={styles.header}>
            {t('hub.hello')}, {archetype.charAt(0).toUpperCase() + archetype.slice(1)}
          </Text>

          {/* Proverb */}
          <View style={styles.proverbCard}>
            <View style={styles.accentLine} />
            <Text style={styles.proverb}>"{dailyProverb.proverb}"</Text>
            <Text style={styles.author}>— {dailyProverb.origin}</Text>
            <View style={styles.divider} />
            <Text style={styles.lesson}>{dailyProverb.lesson}</Text>
          </View>

          {/* ─── WATER TRACKING ──────────────────────────────────────────── */}
          <View style={styles.waterContainer}>
            <Text style={styles.sectionLabel}>💧 {t('hub.water_tracker')}</Text>
            <View style={styles.waterProgressContainer}>
              <View style={styles.waterProgressBg}>
                <View 
                  style={[
                    styles.waterProgressFill,
                    { 
                      width: `${Math.min((waterIntake / waterGoal) * 100, 100)}%`,
                      backgroundColor: waterIntake >= waterGoal ? Colors.mboaGreen : Colors.zenGold
                    }
                  ]} 
                />
              </View>
              <Text style={styles.waterProgressText}>
                {waterIntake} / {waterGoal} {t('hub.drops')}
              </Text>
            </View>
            <View style={styles.waterButtons}>
              <TouchableOpacity 
                style={styles.waterButton}
                onPress={handleAddWater}
                activeOpacity={0.8}
              >
                <Text style={styles.waterButtonText}>💧 {t('hub.add_glass')}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.waterButton, styles.waterResetButton]}
                onPress={handleResetWater}
                activeOpacity={0.8}
              >
                <Text style={[styles.waterButtonText, styles.waterResetText]}>↺ {t('hub.reset')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Previous month summary — first day of new month only */}
          {showPrevMonthSummary && (
            <>
              <Text style={styles.sectionLabel}>{t('hub.last_months_summary')}</Text>
              <PrevMonthSummary
                checkInHistory={checkInHistory}
                monthName={prevMonthName}
                year={prevMonthYear}
                onDismiss={() => setShowPrevMonthSummary(false)}
              />
            </>
          )}

          {/* Q&A Check-In */}
          <Text style={styles.sectionLabel}>{t('hub.today_checkin')}</Text>

          {todayAlreadyAnswered ? (
            // Already completed today — show summary state
            <View style={styles.alreadyDoneCard}>
              <Text style={styles.alreadyDoneTitle}>✓ {t('hub.checkin_complete')}</Text>
              <Text style={styles.alreadyDoneSubtitle}>
                {t('hub.come_back_tomorrow')}
              </Text>
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
            // Q&A form
            <View style={styles.checkInCard}>
              <Text style={styles.checkInIntro}>
                {t('hub.checkin_intro')}
              </Text>

              {/* Progress bar fills as questions are answered */}
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
                {answeredCount}/3 {t('hub.answered')}
                {allAnswered ? ` — ${t('hub.progress_ready')}` : ''}
              </Text>

              <View style={styles.questionsDivider} />

              {questions.map((item) => {
                const answer = answers[item.key];
                return (
                  <View key={item.key} style={styles.qaBlock}>
                    <Text style={styles.qaQuestion}>
                      {item.emoji}  {item.question}
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
                          ✓  {t('hub.yes')}
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
                          {t('hub.not_yet')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Harmony + Calendar — only after all 3 answered */}
          {allAnswered && (
            <>
              <View style={styles.harmonyReveal}>
                <Text style={styles.harmonyRevealLabel}>{t('hub.todays_harmony')}</Text>
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
                  {harmonyScore === 100
                    ? t('hub.perfect_day')
                    : harmonyScore >= 66
                    ? t('hub.great_effort')
                    : harmonyScore >= 33
                    ? t('hub.start_is_start')
                    : t('hub.every_day_chance')}
                </Text>
              </View>

              <Text style={styles.sectionLabel}>{t('hub.this_months_progress')}</Text>
              <MonthlyCalendar
                checkInHistory={checkInHistory}
                streak={streak}
              />
            </>
          )}

          {/* Wellness Guides — ALWAYS VISIBLE */}
          <TouchableOpacity
            style={styles.guidesHeader}
            onPress={() => setGuidesExpanded(!guidesExpanded)}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionLabel}>{t('hub.wellness_guides')}</Text>
            <Text style={styles.guidesToggle}>
              {guidesExpanded ? t('hub.hide') : t('hub.show')}
            </Text>
          </TouchableOpacity>

          {guidesExpanded && <GuideCardList guideCards={guideCards} />}

          {/* Share — ALWAYS VISIBLE */}
          <View style={styles.shareCard}>
            <Text style={styles.shareTitle}>{t('hub.share_title')}</Text>
            <Text style={styles.shareSubtitle}>
              {t('hub.share_subtitle')}
            </Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <Text style={styles.shareButtonText}>📲  {t('hub.share_button')}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </FadeInView>
  );
};

// ─── STYLES ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.cleanWhite, alignItems: 'center' },
  scrollContent: { width: '100%', alignItems: 'center' },
  section: { width: '100%', maxWidth: 480, paddingHorizontal: 20, paddingTop: 20 },

  eyebrow: { fontSize: 11, ...FONTS.bold, color: Colors.zenGold, letterSpacing: 3, marginBottom: 6 },
  header: { fontSize: 28, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 24 },
  subHeader: { fontSize: 14, ...FONTS.regular, color: Colors.textMuted, lineHeight: 22, marginBottom: 28 },
  archetypeButton: { width: '100%', height: 56, borderRadius: 12, marginBottom: 12 },

  proverbCard: { width: '100%', padding: 24, backgroundColor: Colors.softBg, borderRadius: 18, position: 'relative', marginBottom: 28 },
  accentLine: { position: 'absolute', top: 16, left: 0, width: 4, height: 40, backgroundColor: Colors.zenGold, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  proverb: { fontSize: 18, ...FONTS.medium, marginBottom: 12, color: Colors.earthBlack, lineHeight: 28, fontStyle: 'italic', marginLeft: 12 },
  author: { fontSize: 13, ...FONTS.semibold, color: Colors.mboaGreen, textAlign: 'right', letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#D9D9D9', marginVertical: 16 },
  lesson: { fontSize: 14, ...FONTS.regular, color: Colors.textMuted, lineHeight: 22 },

  sectionLabel: { fontSize: 11, ...FONTS.bold, color: Colors.earthBlack, letterSpacing: 2, marginBottom: 12, marginTop: 4 },

  // ─── WATER STYLES ──────────────────────────────────────────────────────
  waterContainer: {
    width: '100%',
    backgroundColor: Colors.softBg,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  waterProgressContainer: {
    marginVertical: 12,
  },
  waterProgressBg: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  waterProgressFill: {
    height: 12,
    borderRadius: 6,
  },
  waterProgressText: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.earthBlack,
    textAlign: 'center',
  },
  waterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  waterButton: {
    flex: 1,
    backgroundColor: Colors.mboaGreen,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  waterResetButton: {
    backgroundColor: '#EEEEEE',
    flex: 0.5,
  },
  waterButtonText: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  waterResetText: {
    color: Colors.textMuted,
  },

  // Previous month summary
  prevMonthCard: { width: '100%', backgroundColor: '#F1FAF3', borderRadius: 18, padding: 20, marginBottom: 20, borderWidth: 2, borderColor: Colors.mboaGreen },
  prevMonthTitle: { fontSize: 16, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 6 },
  prevMonthSubtitle: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, marginBottom: 16 },
  prevMonthDismiss: { backgroundColor: Colors.mboaGreen, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  prevMonthDismissText: { fontSize: 15, ...FONTS.bold, color: Colors.cleanWhite },

  // Already done today
  alreadyDoneCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  alreadyDoneTitle: { fontSize: 15, ...FONTS.bold, color: Colors.mboaGreen, marginBottom: 4 },
  alreadyDoneSubtitle: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted },

  // Q&A Check-In
  checkInCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  checkInIntro: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, lineHeight: 20, marginBottom: 16, fontStyle: 'italic' },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressBarFill: { height: 8, borderRadius: 4 },
  progressHint: { fontSize: 11, ...FONTS.medium, color: Colors.textMuted, marginBottom: 16 },
  questionsDivider: { height: 1, backgroundColor: '#E0E0E0', marginBottom: 16 },
  qaBlock: { marginBottom: 20 },
  qaQuestion: { fontSize: 15, ...FONTS.bold, color: Colors.earthBlack, lineHeight: 22, marginBottom: 12 },
  qaButtons: { flexDirection: 'row' },
  qaBtn: { flex: 1, paddingVertical: 13, borderRadius: 12, alignItems: 'center', borderWidth: 2, marginRight: 10 },
  qaBtnYes: { borderColor: Colors.mboaGreen, backgroundColor: Colors.cleanWhite },
  qaBtnYesActive: { borderColor: Colors.mboaGreen, backgroundColor: Colors.mboaGreen },
  qaBtnNo: { borderColor: '#E0E0E0', backgroundColor: Colors.cleanWhite, marginRight: 0 },
  qaBtnNoActive: { borderColor: '#FF9800', backgroundColor: '#FF9800', marginRight: 0 },
  qaBtnText: { fontSize: 14, ...FONTS.bold, color: Colors.textMuted },
  qaBtnTextWhite: { color: Colors.cleanWhite },
  qaBtnNoTextActive: { color: Colors.cleanWhite },

  // Harmony reveal
  harmonyReveal: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  harmonyRevealLabel: { fontSize: 11, ...FONTS.bold, color: Colors.textMuted, letterSpacing: 2, marginBottom: 8 },
  harmonyRevealScore: { fontSize: 24, ...FONTS.bold, marginBottom: 14 },
  progressBarBgLarge: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden', marginBottom: 14 },
  progressBarFillLarge: { height: 10, borderRadius: 5 },
  harmonyMessage: { fontSize: 14, ...FONTS.regular, color: Colors.textMuted, lineHeight: 22, fontStyle: 'italic' },

  // Calendar
  calendarCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 18, padding: 20, marginBottom: 20 },
  calendarTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  calendarMonth: { fontSize: 15, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 4 },
  streakText: { fontSize: 12, ...FONTS.bold, color: '#FF6D00' },
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

  // Monthly report
  reportCard: { width: '100%', backgroundColor: Colors.cleanWhite, borderRadius: 14, padding: 16, marginTop: 16 },
  reportTitle: { fontSize: 14, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 14 },
  reportRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  reportBadge: { flex: 1, marginHorizontal: 3, borderRadius: 10, padding: 10, alignItems: 'center' },
  reportBadgeNum: { fontSize: 20, ...FONTS.bold },
  reportBadgeLabel: { fontSize: 10, ...FONTS.medium, marginTop: 2 },
  reportDivider: { height: 1, backgroundColor: '#EEEEEE', marginVertical: 12 },
  reportOverall: { fontSize: 14, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 8 },
  reportHabit: { fontSize: 13, ...FONTS.medium, marginBottom: 4 },

  // Guides
  guidesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 4 },
  guidesToggle: { fontSize: 12, ...FONTS.bold, color: Colors.mboaGreen },
  guideCard: { width: '100%', backgroundColor: Colors.softBg, borderRadius: 14, marginBottom: 12, padding: 16, borderLeftWidth: 4 },
  guideTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  guideIconImage: { width: 22, height: 22, marginRight: 10 },
  guideTitle: { fontSize: 15, ...FONTS.bold, color: Colors.earthBlack, flex: 1 },
  guideToggle: { fontSize: 11, ...FONTS.bold, marginLeft: 8 },
  guideTip: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, lineHeight: 20, marginTop: 8 },

  // Share
  shareCard: { width: '100%', backgroundColor: '#F1FAF3', borderRadius: 18, padding: 20, marginTop: 8, borderWidth: 1, borderColor: Colors.mboaGreen, alignItems: 'center' },
  shareTitle: { fontSize: 16, ...FONTS.bold, color: Colors.earthBlack, textAlign: 'center', marginBottom: 8 },
  shareSubtitle: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  shareButton: { backgroundColor: Colors.mboaGreen, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12, alignItems: 'center' },
  shareButtonText: { fontSize: 15, ...FONTS.bold, color: Colors.cleanWhite, letterSpacing: 0.5 },
});

export default HubScreen;