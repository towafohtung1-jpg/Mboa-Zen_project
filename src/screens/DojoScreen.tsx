import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import workoutsData from '../data/workouts.json';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { WorkoutExercise } from '../types';

const workouts = workoutsData as WorkoutExercise[];

const IMAGES: Record<string, any> = {
  'lion_lunges.png': require('../../assets/Media/Workouts/lion_lunges.png'),
  'shaolin_pushups.png': require('../../assets/Media/Workouts/shaolin_pushups.png'),
  'baobab_stretches.png': require('../../assets/Media/Workouts/baobab_stretches.png'),
  'kente_cross_steps.png': require('../../assets/Media/Workouts/kente_cross_steps.png'),
  'river_stone_press.png': require('../../assets/Media/Workouts/river_stone_press.png'),
  'chiefs_throne_dips.png': require('../../assets/Media/Workouts/chiefs_throne_dips.png'),
  'mountain_walker_rises.png': require('../../assets/Media/Workouts/mountain_walker_rises.png'),
  'earth_grounding_squats.png': require('../../assets/Media/Workouts/earth_grounding_squats.png'),
};

const DojoScreen = () => {
  const { archetype } = useUserStore();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredWorkouts = archetype
    ? workouts.filter((item) => item.archetypes?.includes(archetype))
    : workouts;

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <FadeInView style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>THE DOJO</Text>
        <Text style={styles.header}>Your Workouts</Text>
        {archetype && (
          <Text style={styles.subHeader}>
            {filteredWorkouts.length} exercises for The {archetype.charAt(0).toUpperCase() + archetype.slice(1)}
          </Text>
        )}
      </View>

      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredWorkouts.length === 0 ? (
          <Text style={styles.emptyText}>
            No workouts found for your archetype yet.
          </Text>
        ) : (
          filteredWorkouts.map((item) => {
            const isExpanded = expandedId === item.id;
            const image = IMAGES[item.image];

            return (
              <View key={item.id} style={styles.card}>
                {image && (
                  <Image source={image} style={styles.cardImage} resizeMode="contain" />
                )}

                <View style={styles.cardBody}>
                  <Text style={styles.name}>{item.figma_system_label}</Text>
                  <Text style={styles.target}>{item.target_muscle_group}</Text>

                  <View style={styles.metaRow}>
                    <View style={styles.metaChip}>
                      <Text style={styles.metaLabel}>WORK</Text>
                      <Text style={styles.metaValue}>
                        {item.duration_parameters.default_active_seconds}s
                      </Text>
                    </View>
                    <View style={styles.metaChip}>
                      <Text style={styles.metaLabel}>REST</Text>
                      <Text style={styles.metaValue}>
                        {item.duration_parameters.default_rest_seconds}s
                      </Text>
                    </View>
                    <View style={styles.metaChip}>
                      <Text style={styles.metaLabel}>REPS</Text>
                      <Text style={styles.metaValue}>
                        {item.duration_parameters.recommended_reps}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.lineage}>{item.cultural_lineage_roots}</Text>

                  {isExpanded && (
                    <View style={styles.expandedContent}>
                      <View style={styles.divider} />

                      <Text style={styles.sectionTitle}>Movement Steps</Text>
                      {item.movement_mechanics.map((step, index) => (
                        <View key={index} style={styles.listRow}>
                          <View style={styles.stepBadge}>
                            <Text style={styles.stepBadgeText}>{index + 1}</Text>
                          </View>
                          <Text style={styles.itemText}>{step}</Text>
                        </View>
                      ))}

                      <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
                        Coaching Cues
                      </Text>
                      {item.audio_coaching_cues.map((cue, index) => (
                        <View key={index} style={styles.cueRow}>
                          <Text style={styles.cueText}>"{cue}"</Text>
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
                      {isExpanded ? 'Hide Steps  ▲' : 'View Steps  ▼'}
                    </Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: Colors.darkBg,
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
    color: Colors.cleanWhite,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textSecondary,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    marginHorizontal: 20,
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: Colors.mboaGreen,
  },
  cardImage: {
    width: '100%',
    height: 130,
    backgroundColor: '#000',
  },
  cardBody: {
    padding: 18,
  },
  name: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 4,
  },
  target: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  metaChip: {
    flex: 1,
    backgroundColor: Colors.cardBgLight,
    borderRadius: 10,
    paddingVertical: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 9,
    ...FONTS.bold,
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 13,
    ...FONTS.semibold,
    color: Colors.zenGold,
  },
  lineage: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  expandedContent: {
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderDark,
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 10,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
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
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  cueRow: {
    backgroundColor: 'rgba(255, 205, 0, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: Colors.zenGold,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  cueText: {
    fontSize: 13,
    ...FONTS.medium,
    color: Colors.zenGold,
    fontStyle: 'italic',
    lineHeight: 19,
  },
  expandButton: {
    marginTop: 14,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
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

export default DojoScreen;