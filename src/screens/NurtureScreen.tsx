import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../constants/colors';
import recipes from '../data/recipes.json';
import { useUserStore } from '../store/useUserStore';

const NurtureScreen = () => {
  const { archetype } = useUserStore();

  // Map store archetype → recipe JSON archetype label
  const archetypeMap: Record<string, string> = {
    runner: 'The Runner',
    warrior: 'The Warrior',
    guardian: 'The Guardian',
  };

  const filteredRecipes = archetype
    ? recipes.filter((item) => item.archetype === archetypeMap[archetype])
    : recipes;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nurture Your Archetype</Text>

      {archetype && (
        <Text style={styles.subHeader}>
          Showing meal plans for: {archetypeMap[archetype]}
        </Text>
      )}

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.archetype}>{item.archetype}</Text>
            <Text style={styles.mealName}>{item.meal_name}</Text>
            <Text style={styles.focus}>{item.profile_focus}</Text>

            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {item.ingredients.map((ing, index) => (
              <Text key={index} style={styles.itemText}>• {ing}</Text>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>
              Instructions:
            </Text>
            {item.cooking_steps.map((step, index) => (
              <Text key={index} style={styles.itemText}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No recipes found for your archetype yet.
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
    backgroundColor: Colors.softBg,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.mboaGreen,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: Colors.cleanWhite,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  archetype: {
    fontSize: 14,
    color: Colors.zenGold,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: Colors.earthBlack,
  },
  focus: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.textMuted,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.earthBlack,
  },
  itemText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginVertical: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 40,
    fontSize: 16,
  },
});

export default NurtureScreen;