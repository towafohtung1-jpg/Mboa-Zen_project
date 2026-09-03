// ─── src/screens/NurtureScreen.tsx ──────────────────────────────────────

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { getMealOptions, getBodyTypeFromArchetype } from '../data/mealOptions';
import { MealOption, MealFoodItem } from '../types';

import { offlineAgent } from '../database/offlineAgent';

// Food images mapping
const FOOD_IMAGES: Record<string, any> = {
  'runner_breakfast_puffpuff_pap.png': require('../../assets/Media/Culinary/runner_breakfast_puffpuff_pap.png'),
  'runner_lunch_sweetpotato_rice_greens_meat.png': require('../../assets/Media/Culinary/runner_lunch_sweetpotato_rice_greens_meat.png'),
  'runner_supper_grilledfish_miondo.png': require('../../assets/Media/Culinary/runner_supper_grilledfish_miondo.png'),
  'warrior_breakfast_kumbabread_akara_pap.png': require('../../assets/Media/Culinary/warrior_breakfast_kumbabread_akara_pap.png'),
  'warrior_lunch_waterfufu_eru.png': require('../../assets/Media/Culinary/warrior_lunch_waterfufu_eru.png'),
  'warrior_supper_suya_plantain.png': require('../../assets/Media/Culinary/warrior_supper_suya_plantain.png'),
  'guardian_breakfast_koki.png': require('../../assets/Media/Culinary/guardian_breakfast_koki.png'),
  'guardian_lunch_yam_egusi.png': require('../../assets/Media/Culinary/guardian_lunch_yam_egusi.png'),
  'guardian_supper_peppersoup_gardenegg.png': require('../../assets/Media/Culinary/guardian_supper_peppersoup_gardenegg.png'),
};

const MEAL_TIMES = [
  { key: 'breakfast' as const, label: '🍳 Breakfast', emoji: '🌅' },
  { key: 'lunch' as const, label: '🥗 Lunch', emoji: '☀️' },
  { key: 'supper' as const, label: '🍲 Supper', emoji: '🌙' },
];

const NutritionBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <View style={styles.nutritionBarWrapper}>
      <Text style={styles.nutritionBarLabel}>{label}</Text>
      <View style={styles.nutritionBarBg}>
        <View style={[styles.nutritionBarFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.nutritionBarValue}>{value}</Text>
    </View>
  );
};

const MealCard = ({ meal, onLogMeal }: { meal: MealOption; onLogMeal: (meal: MealOption) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const foodImage = meal.image ? FOOD_IMAGES[meal.image] : null;

  return (
    <View style={styles.mealCard}>
      {foodImage && (
        <Image
          source={foodImage}
          style={styles.mealCardImage}
          resizeMode="cover"
        />
      )}
      <TouchableOpacity
        style={styles.mealCardHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
      >
        <View style={styles.mealCardTitleRow}>
          <View style={styles.optionBadge}>
            <Text style={styles.optionBadgeText}>Option {meal.option_number}</Text>
          </View>
          <Text style={styles.mealCardToggle}>{expanded ? '▲' : '▼'}</Text>
        </View>
        <Text style={styles.mealCardName}>{meal.meal_name}</Text>
        <View style={styles.quickNutrition}>
          <View style={styles.quickNutritionItem}>
            <Text style={styles.quickNutritionValue}>{meal.nutrition.calories}</Text>
            <Text style={styles.quickNutritionLabel}>kcal</Text>
          </View>
          <View style={styles.quickNutritionDivider} />
          <View style={styles.quickNutritionItem}>
            <Text style={styles.quickNutritionValue}>{meal.nutrition.protein}g</Text>
            <Text style={styles.quickNutritionLabel}>protein</Text>
          </View>
          <View style={styles.quickNutritionDivider} />
          <View style={styles.quickNutritionItem}>
            <Text style={styles.quickNutritionValue}>{meal.nutrition.carbohydrates}g</Text>
            <Text style={styles.quickNutritionLabel}>carbs</Text>
          </View>
          <View style={styles.quickNutritionDivider} />
          <View style={styles.quickNutritionItem}>
            <Text style={styles.quickNutritionValue}>{meal.nutrition.fiber}g</Text>
            <Text style={styles.quickNutritionLabel}>fiber</Text>
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.mealCardBody}>
          <View style={styles.sectionDivider} />
          <Text style={styles.bodyTitle}>What You Need</Text>
          {meal.foods.map((food: MealFoodItem, index: number) => (
            <View key={index} style={styles.foodRow}>
              <View style={styles.foodDot} />
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodQty}>{food.quantity}</Text>
                {food.notes && <Text style={styles.foodNotes}>{food.notes}</Text>}
              </View>
            </View>
          ))}
          <View style={styles.sectionDivider} />
          <Text style={styles.bodyTitle}>Nutritional Breakdown</Text>
          <NutritionBar label="Calories" value={meal.nutrition.calories} max={800} color={Colors.zenGold} />
          <NutritionBar label="Protein" value={meal.nutrition.protein} max={60} color={Colors.mboaGreen} />
          <NutritionBar label="Carbs" value={meal.nutrition.carbohydrates} max={100} color="#FF9800" />
          <NutritionBar label="Fat" value={meal.nutrition.fat} max={40} color="#9C27B0" />
          <NutritionBar label="Fiber" value={meal.nutrition.fiber} max={20} color="#00BCD4" />
          <View style={styles.sectionDivider} />
          <Text style={styles.bodyTitle}>Why This Is Good For You</Text>
          <Text style={styles.whyGoodText}>{meal.why_good}</Text>
          <View style={styles.availableBox}>
            <Text style={styles.availableLabel}>📍 Where to get it</Text>
            <Text style={styles.availableText}>{meal.available_from}</Text>
          </View>
          <TouchableOpacity
            style={styles.logMealButton}
            onPress={() => onLogMeal(meal)}
            activeOpacity={0.8}
          >
            <Text style={styles.logMealButtonText}>✓ I Ate This</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const NurtureScreen = () => {
  
  const { archetype } = useUserStore();
  const [selectedMealTime, setSelectedMealTime] = useState<'breakfast' | 'lunch' | 'supper'>('breakfast');
  const [todayCalories, setTodayCalories] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  

  const bodyType = getBodyTypeFromArchetype(archetype);

  const profileLabels: Record<string, { main: string; sub: string }> = {
    slim: { main: 'The Runner', sub: 'Slim Body' },
    strong: { main: 'The Warrior', sub: 'Strong Body' },
    steady: { main: 'The Guardian', sub: 'The Steady' },
  };

  const profileDescriptions: Record<string, string> = {
    slim: 'High energy foods to fuel an active, fast-burning body.',
    strong: 'Protein-rich meals to support physical work and muscle recovery.',
    steady: 'Balanced, lower glycemic foods to support weight management.',
  };

  const mealOptions = bodyType ? getMealOptions(bodyType, selectedMealTime) : [];

  const handleLogMeal = async (meal: MealOption) => {
    try {
      await offlineAgent.logMeal(
        selectedMealTime,
        meal.id,
        null,
        meal.nutrition.calories,
        `Logged from Nurture screen: ${meal.meal_name}`
      );
      const newTotal = await offlineAgent.getTodayCalories();
      setTodayCalories(newTotal);
      Alert.alert(
        'Meal Logged!',
        `${meal.meal_name} (${meal.nutrition.calories} kcal) saved offline. Today's total: ${newTotal} kcal`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Failed to log meal:', error);
      Alert.alert('Error', 'Could not log meal. Please try again.');
    }
  };

  return (
    <FadeInView style={styles.container} key={refreshKey}>
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>YOUR MEALS</Text>
        <Text style={styles.header}>
          {bodyType ? profileLabels[bodyType].main : 'Nurture Your Body'}
        </Text>
        {bodyType && (
          <Text style={styles.profileSub}>{profileLabels[bodyType].sub}</Text>
        )}
        {bodyType && (
          <Text style={styles.subHeader}>{profileDescriptions[bodyType]}</Text>
        )}
        <View style={styles.calorieBanner}>
          <Text style={styles.calorieBannerLabel}>Today's Calories</Text>
          <Text style={styles.calorieBannerValue}>{todayCalories} kcal</Text>
        </View>
        <View style={styles.tabRow}>
          {MEAL_TIMES.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, selectedMealTime === tab.key && styles.tabActive]}
              onPress={() => setSelectedMealTime(tab.key)}
              activeOpacity={0.8}
            >
              <Text style={styles.tabEmoji}>{tab.emoji}</Text>
              <Text style={[styles.tabLabel, selectedMealTime === tab.key && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.chooseText}>
          Choose any meal below. All options suit your body profile.
        </Text>
      </View>

      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          {mealOptions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No meals found</Text>
              <Text style={styles.emptySubtitle}>
                Complete your archetype quiz on the Home screen to unlock your personalized meal options.
              </Text>
            </View>
          ) : (
            mealOptions.map((meal) => (
              <MealCard key={meal.id} meal={meal} onLogMeal={handleLogMeal} />
            ))
          )}
          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerText}>
              ⚠️ These meal suggestions are general wellness guidance only. Nutritional values are approximate. Consult a qualified nutritionist for personalized dietary advice.
            </Text>
          </View>
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.softBg, alignItems: 'center' },
  headerArea: { width: '100%', maxWidth: 480, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4, backgroundColor: Colors.softBg },
  eyebrow: { fontSize: 11, ...FONTS.bold, color: Colors.zenGold, letterSpacing: 3, marginBottom: 6 },
  header: { fontSize: 24, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 2 },
  profileSub: { fontSize: 13, ...FONTS.semibold, color: Colors.mboaGreen, letterSpacing: 1, marginBottom: 4 },
  subHeader: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, lineHeight: 20, marginBottom: 16 },
  calorieBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1FAF3', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 16, borderWidth: 1, borderColor: Colors.mboaGreen },
  calorieBannerLabel: { fontSize: 13, ...FONTS.bold, color: Colors.earthBlack },
  calorieBannerValue: { fontSize: 18, ...FONTS.bold, color: Colors.mboaGreen },
  tabRow: { flexDirection: 'row', backgroundColor: Colors.cleanWhite, borderRadius: 14, padding: 4 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10 },
  tabActive: { backgroundColor: Colors.mboaGreen },
  tabEmoji: { fontSize: 14, marginRight: 6 },
  tabLabel: { fontSize: 13, ...FONTS.bold, color: Colors.textMuted },
  tabLabelActive: { color: Colors.cleanWhite },
  chooseText: { fontSize: 12, ...FONTS.regular, color: Colors.textMuted, fontStyle: 'italic', marginTop: 12, marginBottom: 8 },
  scrollContent: { width: '100%', alignItems: 'center', paddingTop: 8 },
  section: { width: '100%', maxWidth: 480, paddingHorizontal: 20, paddingBottom: 20 },
  mealCard: { backgroundColor: Colors.cleanWhite, borderRadius: 18, marginBottom: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  mealCardImage: { width: '100%', height: 150 },
  mealCardHeader: { padding: 18 },
  mealCardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  optionBadge: { backgroundColor: '#F1FAF3', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: Colors.mboaGreen },
  optionBadgeText: { fontSize: 11, ...FONTS.bold, color: Colors.mboaGreen },
  mealCardToggle: { fontSize: 12, ...FONTS.bold, color: Colors.textMuted },
  mealCardName: { fontSize: 17, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 14, lineHeight: 23 },
  quickNutrition: { flexDirection: 'row', backgroundColor: Colors.softBg, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'space-around' },
  quickNutritionItem: { alignItems: 'center', flex: 1 },
  quickNutritionValue: { fontSize: 15, ...FONTS.bold, color: Colors.earthBlack },
  quickNutritionLabel: { fontSize: 10, ...FONTS.regular, color: Colors.textMuted, marginTop: 2 },
  quickNutritionDivider: { width: 1, height: 28, backgroundColor: '#E0E0E0' },
  mealCardBody: { paddingHorizontal: 18, paddingBottom: 18 },
  sectionDivider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 14 },
  bodyTitle: { fontSize: 13, ...FONTS.bold, color: Colors.earthBlack, letterSpacing: 0.5, marginBottom: 12 },
  foodRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  foodDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.mboaGreen, marginTop: 6, marginRight: 12 },
  foodInfo: { flex: 1 },
  foodName: { fontSize: 14, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 2 },
  foodQty: { fontSize: 12, ...FONTS.regular, color: Colors.textMuted },
  foodNotes: { fontSize: 11, ...FONTS.regular, color: Colors.mboaGreen, fontStyle: 'italic', marginTop: 2 },
  nutritionBarWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  nutritionBarLabel: { fontSize: 12, ...FONTS.medium, color: Colors.earthBlack, width: 60 },
  nutritionBarBg: { flex: 1, height: 6, backgroundColor: '#F0F0F0', borderRadius: 3, overflow: 'hidden', marginHorizontal: 8 },
  nutritionBarFill: { height: 6, borderRadius: 3 },
  nutritionBarValue: { fontSize: 11, ...FONTS.bold, color: Colors.textMuted, width: 40, textAlign: 'right' },
  whyGoodText: { fontSize: 13, ...FONTS.regular, color: Colors.textMuted, lineHeight: 21, marginBottom: 14 },
  availableBox: { backgroundColor: '#F1FAF3', borderRadius: 10, padding: 12, borderLeftWidth: 3, borderLeftColor: Colors.mboaGreen },
  availableLabel: { fontSize: 11, ...FONTS.bold, color: Colors.mboaGreen, marginBottom: 4 },
  availableText: { fontSize: 12, ...FONTS.regular, color: Colors.textMuted },
  logMealButton: { backgroundColor: Colors.mboaGreen, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  logMealButtonText: { fontSize: 15, ...FONTS.bold, color: Colors.cleanWhite, letterSpacing: 0.5 },
  emptyState: { paddingVertical: 60, alignItems: 'center' },
  emptyTitle: { fontSize: 18, ...FONTS.bold, color: Colors.earthBlack, marginBottom: 8, textAlign: 'center' },
  emptySubtitle: { fontSize: 14, ...FONTS.regular, color: Colors.textMuted, textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },
  disclaimerBox: { backgroundColor: '#FFF8E1', borderRadius: 12, padding: 14, marginTop: 8, borderLeftWidth: 3, borderLeftColor: Colors.zenGold },
  disclaimerText: { fontSize: 12, ...FONTS.regular, color: Colors.earthBlack, lineHeight: 18 },
});

export default NurtureScreen;

