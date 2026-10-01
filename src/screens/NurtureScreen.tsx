// ─── src/screens/NurtureScreen.tsx ──────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { getMealOptions, getBodyTypeFromArchetype } from '../data/mealOptions';
import { MealOption, MealFoodItem } from '../types';
import { offlineAgent } from '../database/offlineAgent';
import { MboaButton } from '../components/common/MboaButton';

// ─── FOOD IMAGES ────────────────────────────────────────────────────────

import akara_break_pepper from '../../assets/Media/Meals/high-res/akara_break_pepper.png';
import kumba_bread_akara_pap from '../../assets/Media/Meals/high-res/kumba_bread_akara_pap.png';
import boiled_eggs_kumba_bread from '../../assets/Media/Meals/high-res/boiled_eggs_kumba_bread.png';
import puff_puff_pap from '../../assets/Media/Meals/high-res/puff_puff_pap.png';
import bread_egg_tea from '../../assets/Media/Meals/high-res/bread_egg_tea.png';
import beignets_haricot_bouillie from '../../assets/Media/Meals/high-res/beignets_haricot_bouillie.png';
import avocado_bread from '../../assets/Media/Meals/high-res/avocado_bread.png';
import beans_bread from '../../assets/Media/Meals/high-res/beans_bread.png';
import pap_milk_sugar from '../../assets/Media/Meals/high-res/pap_milk_sugar.png';
import fried_eggs_bread_avocado_tea from '../../assets/Media/Meals/high-res/fried_eggs_bread_avocado_tea.png';
import egusi_soup_fufu_garri from '../../assets/Media/Meals/high-res/egusi_soup_fufu_garri.png';
import ndole_rice_plantains_beef from '../../assets/Media/Meals/high-res/ndole_rice_plantains_beef.png';
import eru_water_fufu_gari from '../../assets/Media/Meals/high-res/eru_water_fufu_gari.png';
import rice_egusi_chicken from '../../assets/Media/Meals/high-res/rice_egusi_chicken.png';
import koki_plantain_cocoyams from '../../assets/Media/Meals/high-res/koki_plantain_cocoyams.png';
import poulet_dg from '../../assets/Media/Meals/high-res/poulet_dg.png';
import mbongo_tchobi from '../../assets/Media/Meals/high-res/mbongo_tchobi.png';
import ekwang from '../../assets/Media/Meals/high-res/ekwang.png';
import cornchaff from '../../assets/Media/Meals/high-res/cornchaff.png';
import achu_yellow_soup from '../../assets/Media/Meals/high-res/achu_yellow_soup.png';
import ogbono_soup_fufu from '../../assets/Media/Meals/high-res/ogbono_soup_fufu.png';
import beans_dodo from '../../assets/Media/Meals/high-res/beans_dodo.png';
import kwacoco_banga_soup from '../../assets/Media/Meals/high-res/kwacoco_banga_soup.png';
import rice_groundnut_soup_beef from '../../assets/Media/Meals/high-res/rice_groundnut_soup_beef.png';
import pepper_soup_meat_plantains from '../../assets/Media/Meals/high-res/pepper_soup_meat_plantains.png';
import pepper_soup_goat_plantains from '../../assets/Media/Meals/high-res/pepper_soup_goat_plantains.png';
import brochettes_plantains from '../../assets/Media/Meals/high-res/brochettes_plantains.png';
import grilled_fish_sweet_potato_njama from '../../assets/Media/Meals/high-res/grilled_fish_sweet_potato_njama.png';
import roasted_fish_miondo_bobolo from '../../assets/Media/Meals/high-res/roasted_fish_miondo_bobolo.png';
import jollof_rice from '../../assets/Media/Meals/high-res/jollof_rice.png';
import roasted_pork_plantains from '../../assets/Media/Meals/high-res/roasted_pork_plantains.png';
import soya_gizzard_plantain from '../../assets/Media/Meals/high-res/soya_gizzard_plantain.png';
import kwacoco_bible_kanda from '../../assets/Media/Meals/high-res/kwacoco_bible_kanda.png';
import burning_fish from '../../assets/Media/Meals/high-res/burning_fish.png';

const FOOD_IMAGES: Record<string, any> = {
  'akara_break_pepper.png': akara_break_pepper,
  'kumba_bread_akara_pap.png': kumba_bread_akara_pap,
  'boiled_eggs_kumba_bread.png': boiled_eggs_kumba_bread,
  'puff_puff_pap.png': puff_puff_pap,
  'bread_egg_tea.png': bread_egg_tea,
  'beignets_haricot_bouillie.png': beignets_haricot_bouillie,
  'avocado_bread.png': avocado_bread,
  'beans_bread.png': beans_bread,
  'pap_milk_sugar.png': pap_milk_sugar,
  'fried_eggs_bread_avocado_tea.png': fried_eggs_bread_avocado_tea,
  'egusi_soup_fufu_garri.png': egusi_soup_fufu_garri,
  'ndole_rice_plantains_beef.png': ndole_rice_plantains_beef,
  'eru_water_fufu_gari.png': eru_water_fufu_gari,
  'rice_egusi_chicken.png': rice_egusi_chicken,
  'koki_plantain_cocoyams.png': koki_plantain_cocoyams,
  'poulet_dg.png': poulet_dg,
  'mbongo_tchobi.png': mbongo_tchobi,
  'ekwang.png': ekwang,
  'cornchaff.png': cornchaff,
  'achu_yellow_soup.png': achu_yellow_soup,
  'ogbono_soup_fufu.png': ogbono_soup_fufu,
  'beans_dodo.png': beans_dodo,
  'kwacoco_banga_soup.png': kwacoco_banga_soup,
  'rice_groundnut_soup_beef.png': rice_groundnut_soup_beef,
  'pepper_soup_meat_plantains.png': pepper_soup_meat_plantains,
  'pepper_soup_goat_plantains.png': pepper_soup_goat_plantains,
  'brochettes_plantains.png': brochettes_plantains,
  'grilled_fish_sweet_potato_njama.png': grilled_fish_sweet_potato_njama,
  'roasted_fish_miondo_bobolo.png': roasted_fish_miondo_bobolo,
  'jollof_rice.png': jollof_rice,
  'roasted_pork_plantains.png': roasted_pork_plantains,
  'soya_gizzard_plantain.png': soya_gizzard_plantain,
  'kwacoco_bible_kanda.png': kwacoco_bible_kanda,
  'burning_fish.png': burning_fish,
};

const MEAL_TIMES = [
  { key: 'breakfast' as const, label: 'Breakfast' },
  { key: 'lunch' as const, label: 'Lunch' },
  { key: 'supper' as const, label: 'Supper' },
];

// ─── NUTRITION BAR ──────────────────────────────────────────────────────

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

// ─── MEAL DETAIL MODAL ──────────────────────────────────────────────────

const MealDetailModal = ({
  meal,
  visible,
  onClose,
  onLogMeal,
}: {
  meal: MealOption | null;
  visible: boolean;
  onClose: () => void;
  onLogMeal: (meal: MealOption) => void;
}) => {
  if (!meal) return null;

  const foodImage = meal.image ? FOOD_IMAGES[meal.image] : null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            style={styles.modalScroll}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Full Image */}
            {foodImage && (
              <Image
                source={foodImage}
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}

            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.optionBadge}>
                <Text style={styles.optionBadgeText}>Option {meal.option_number}</Text>
              </View>
              <Text style={styles.modalMealName}>{meal.meal_name}</Text>
              <Text style={styles.modalRegion}>{meal.region}</Text>
            </View>

            {/* Quick Nutrition */}
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

            {/* Ingredients */}
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

            {/* Nutritional Breakdown */}
            <View style={styles.sectionDivider} />
            <Text style={styles.bodyTitle}>Nutritional Breakdown</Text>
            <NutritionBar label="Calories" value={meal.nutrition.calories} max={800} color={Colors.zenGold} />
            <NutritionBar label="Protein" value={meal.nutrition.protein} max={60} color={Colors.mboaGreen} />
            <NutritionBar label="Carbs" value={meal.nutrition.carbohydrates} max={100} color="#FF9800" />
            <NutritionBar label="Fat" value={meal.nutrition.fat} max={40} color="#9C27B0" />
            <NutritionBar label="Fiber" value={meal.nutrition.fiber} max={20} color="#00BCD4" />

            {/* Why This Is Good For You */}
            <View style={styles.sectionDivider} />
            <Text style={styles.bodyTitle}>Why This Is Good For You</Text>
            <Text style={styles.whyGoodText}>{meal.why_good}</Text>

            {/* Where to get it */}
            <View style={styles.availableBox}>
              <Text style={styles.availableLabel}>📍 Where to get it</Text>
              <Text style={styles.availableText}>{meal.available_from}</Text>
            </View>

            {/* Log Meal Button */}

                         <View style={{ marginTop: 14, alignItems: 'flex-end' }}>
              <MboaButton
                title="I Ate This"
                onPress={() => {
                  onLogMeal(meal);
                  onClose();
                }}
                variant="primary"
              />
            </View>
            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// ─── MEAL CARD ──────────────────────────────────────────────────────────

const MealCard = ({
  meal,
  onLogMeal,
  onOpenModal,
}: {
  meal: MealOption;
  onLogMeal: (meal: MealOption) => void;
  onOpenModal: (meal: MealOption) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const foodImage = meal.image ? FOOD_IMAGES[meal.image] : null;

  return (
    <View style={styles.mealCard}>
      {/* Tappable Image */}
      <TouchableOpacity onPress={() => onOpenModal(meal)} activeOpacity={0.9}>
        {foodImage && (
          <Image
            source={foodImage}
            style={styles.mealCardImage}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>

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
                    <View style={{ marginBottom: 14 }}>
            <MboaButton
              title="View Full Details"
              onPress={() => onOpenModal(meal)}
              variant="outline"
            />
          </View>

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
          <View style={{ marginTop: 14, alignItems: 'flex-end' }}>
            <MboaButton
              title="I Ate This"
              onPress={() => onLogMeal(meal)}
              variant="primary"
            />
          </View>
        </View>
      )}
    </View>
  );
};

// ─── NURTURE SCREEN ─────────────────────────────────────────────────────

const NurtureScreen = () => {
  const { archetype } = useUserStore();
  const [selectedMealTime, setSelectedMealTime] = useState<'breakfast' | 'lunch' | 'supper'>('breakfast');
  const [todayCalories, setTodayCalories] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealOption | null>(null);

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

  const openModal = (meal: MealOption) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMeal(null);
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
              <Text style={[styles.tabLabel, selectedMealTime === tab.key && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.chooseText}>
          Tap any meal to see full details and log it.
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
              <MealCard
                key={meal.id}
                meal={meal}
                onLogMeal={handleLogMeal}
                onOpenModal={openModal}
              />
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

      {/* Meal Detail Modal */}
      <MealDetailModal
        meal={selectedMeal}
        visible={modalVisible}
        onClose={closeModal}
        onLogMeal={handleLogMeal}
      />
    </FadeInView>
  );
};

// ─── STYLES ─────────────────────────────────────────────────────────────

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
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderBottomWidth: 3,
    borderColor: Colors.mboaGreen,
    borderBottomColor: Colors.zenGold,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: Colors.mboaGreen,
    borderColor: Colors.mboaGreen,
    borderBottomColor: Colors.zenGold,
  },
  tabLabel: { fontSize: 13, ...FONTS.bold, color: Colors.mboaGreen },
  tabLabelActive: { color: Colors.cleanWhite },  chooseText: { fontSize: 12, ...FONTS.regular, color: Colors.textMuted, fontStyle: 'italic', marginTop: 12, marginBottom: 8 },
  scrollContent: { width: '100%', alignItems: 'center', paddingTop: 8 },
  section: { width: '100%', maxWidth: 480, paddingHorizontal: 20, paddingBottom: 20 },
  mealCard: { backgroundColor: Colors.cleanWhite, borderRadius: 18, marginBottom: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 2 },
  mealCardImage: { width: '100%', height: 220, backgroundColor: '#F5F5F5' },
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
  viewDetailsButtonText: { fontSize: 13, ...FONTS.bold, color: Colors.mboaGreen },
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

  // ─── MODAL STYLES ──────────────────────────────────────────────────────
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
    minHeight: '50%',
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
    paddingBottom: 20,
  },
  modalImage: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalMealName: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginTop: 8,
    marginBottom: 4,
    lineHeight: 28,
  },
  modalRegion: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});

export default NurtureScreen;