import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../constants/colors';
import workouts from '../data/workouts.json';
import { useUserStore } from '../store/useUserStore';

const DojoScreen = () => {
  const { archetype } = useUserStore();

  const filteredWorkouts = archetype
    ? (workouts as any[]).filter((item) => item.archetypes?.includes(archetype))
    : workouts;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>The Dojo (Workouts)</Text>

      {archetype && (
        <Text style={styles.subHeader}>
          Showing workouts for: {archetype}
        </Text>
      )}

      <FlatList
        data={filteredWorkouts as any}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.figma_system_label}</Text>
            </View>

            <Text style={styles.target}>
              Target: {item.target_muscle_group}
            </Text>

            <Text style={styles.description}>
              {item.cultural_lineage_roots}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No workouts found for your archetype yet.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.darkBg,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.zenGold,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: Colors.cardBg,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: Colors.mboaGreen,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.cleanWhite,
  },
  target: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 40,
    fontSize: 16,
  },
});

export default DojoScreen;