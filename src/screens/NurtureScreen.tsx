import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import recipesData from '../data/recipes.json';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { Recipe, MealTime } from '../types';

const recipes = recipesData as Recipe[];

// Local image lookup — filenames match the "image" field in recipes.json
const IMAGES: Record<string, any> = {
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

const MEAL_TIME_ORDER: MealTime[] = ['breakfast', 'lunch', 'supper'];

const MEAL_TIME_LABELS: Record<MealTime, string> = {
  breakfast: 'BREAKFAST',
  lunch: 'LUNCH',
  supper: 'SUPPER',
};

const NurtureScreen = () => {
  const { archetype } = useUserStore();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const archetypeMap: Record<string, string> = {
    runner: 'The Runner',
    warrior: 'The Warrior',
    guardian: 'The Guardian',
  };

  const currentArchetypeLabel = archetype ? archetypeMap[archetype] : null;

  const filteredRecipes = currentArchetypeLabel
    ? recipes.filter((item) => item.archetype === currentArchetypeLabel)
    : recipes;

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderCard = (item: Recipe) => {
    const isExpanded = expandedId === item.id;
    const image = IMAGES[item.image];

    return (
      <View key={item.id} style={styles.card}>
        {image && (
          <Image source={image} style={styles.cardImage} resizeMode="cover" />
        )}

        <View style={styles.cardBody}>
          <Text style={styles.mealName}>{item.meal_name}</Text>
          <Text style={styles.focus}>{item.profile_focus}</Text>

          <View style={styles.macroRow}>
            <View style={styles.macroChip}>
              <Text style={styles.macroLabel}>CARBS</Text>
              <Text style={styles.macroValue} numberOfLines={1}>
                {item.macronutrients.carbohydrates}
              </Text>
            </View>
            <View style={styles.macroChip}>
              <Text style={styles.macroLabel}>PROTEIN</Text>
              <Text style={styles.macroValue} numberOfLines={1}>
                {item.macronutrients.protein}
              </Text>
            </View>
            <View style={styles.macroChip}>
              <Text style={styles.macroLabel}>FATS</Text>
              <Text style={styles.macroValue} numberOfLines={1}>
                {item.macronutrients.lipids}
              </Text>
            </View>
          </View>

          <View style={styles.staplesRow}>
            {item.market_staples_required.slice(0, 4).map((staple, i) => (
              <View key={i} style={styles.stapleChip}>
                <Text style={styles.stapleText}>{staple}</Text>
              </View>
            ))}
            {item.market_staples_required.length > 4 && (
              <View style={styles.stapleChip}>
                <Text style={styles.stapleText}>
                  +{item.market_staples_required.length - 4}
                </Text>
              </View>
            )}
          </View>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Ingredients</Text>
              {item.ingredients.map((ing, index) => (
                <View key={index} style={styles.listRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.itemText}>{ing}</Text>
                </View>
              ))}

              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
                Instructions
              </Text>
              {item.cooking_steps.map((step, index) => (
                <View key={index} style={styles.listRow}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepBadgeText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.itemText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.expandButtonText}>
              {isExpanded ? 'Hide Recipe  ▲' : 'View Recipe  ▼'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>YOUR MEALS</Text>
        <Text style={styles.header}>Nurture Your Archetype</Text>
        {currentArchetypeLabel && (
          <Text style={styles.subHeader}>
            Full day meal plan for {currentArchetypeLabel}
          </Text>
        )}
      </View>

      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredRecipes.length === 0 ? (
          <Text style={styles.emptyText}>
            No meals found for your archetype yet.
          </Text>
        ) : (
          MEAL_TIME_ORDER.map((mealTime) => {
            const mealsForTime = filteredRecipes.filter(
              (item) => item.meal_time === mealTime
            );

            if (mealsForTime.length === 0) return null;

            return (
              <View key={mealTime} style={styles.section}>
                <Text style={styles.sectionLabel}>
                  {MEAL_TIME_LABELS[mealTime]}
                </Text>
                {mealsForTime.map((item) => renderCard(item))}
              </View>
            );
          })
        )}
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.softBg,
    alignItems: 'center',
  },
  headerArea: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 6,
  },
  header: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  section: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
  },
  sectionLabel: {
    fontSize: 12,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: Colors.cleanWhite,
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 18,
  },
  mealName: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 4,
    lineHeight: 24,
  },
  focus: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  macroRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  macroChip: {
    flex: 1,
    backgroundColor: Colors.softBg,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginRight: 8,
    alignItems: 'center',
  },
  macroLabel: {
    fontSize: 9,
    ...FONTS.bold,
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 3,
  },
  macroValue: {
    fontSize: 10,
    ...FONTS.semibold,
    color: Colors.mboaGreen,
    textAlign: 'center',
  },
  staplesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  stapleChip: {
    backgroundColor: '#F1FAF3',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  stapleText: {
    fontSize: 12,
    ...FONTS.medium,
    color: Colors.mboaGreen,
  },
  expandedContent: {
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 10,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 14,
    color: Colors.mboaGreen,
    marginRight: 8,
    lineHeight: 20,
  },
  stepBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  stepBadgeText: {
    fontSize: 10,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  expandButton: {
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  expandButtonText: {
    fontSize: 13,
    ...FONTS.semibold,
    color: Colors.mboaGreen,
    letterSpacing: 0.5,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 40,
    fontSize: 16,
    paddingHorizontal: 20,
  },
});

export default NurtureScreen;