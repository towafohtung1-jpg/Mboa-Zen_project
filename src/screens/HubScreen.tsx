import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { useUserStore } from '../store/useUserStore';
import proverbs from '../data/proverbs.json';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedButton } from '../components/common/AnimatedButton';

const HubScreen = () => {
  const { archetype, setArchetype } = useUserStore();
  const randomProverb: any =
    proverbs[Math.floor(Math.random() * proverbs.length)];

  const options: { id: 'runner' | 'warrior' | 'guardian'; label: string }[] = [
    { id: 'runner', label: 'The Runner' },
    { id: 'warrior', label: 'The Warrior' },
    { id: 'guardian', label: 'The Guardian' },
  ];

  if (!archetype) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Find Your Archetype</Text>
        <Text style={styles.subHeader}>
          Select your path to unlock your personalized plan.
        </Text>

        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.card}
            onPress={() => setArchetype(option.id)}
          >
            <Text style={styles.cardText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Mindset</Text>

      <View style={styles.card}>
        <Text style={styles.proverb}>"{randomProverb.proverb}"</Text>
        <Text style={styles.author}>- {randomProverb.origin}</Text>
        <Text style={styles.lesson}>{randomProverb.lesson}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.cleanWhite,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.mboaGreen,
    marginBottom: 20,
  },
  subHeader: {
    marginBottom: 20,
    color: Colors.textMuted,
  },
  card: {
    padding: 20,
    backgroundColor: Colors.softBg,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.mboaGreen,
  },
  proverb: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 10,
    color: Colors.earthBlack,
  },
  author: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  lesson: {
    fontSize: 13,
    color: Colors.mboaGreen,
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default HubScreen;