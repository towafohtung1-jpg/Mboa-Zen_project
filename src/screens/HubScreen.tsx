import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
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
      <FadeInView style={styles.container}>
        <View style={styles.headerArea}>
          <Text style={styles.eyebrow}>YOUR JOURNEY</Text>
          <Text style={styles.header}>Find Your Archetype</Text>
          <Text style={styles.subHeader}>
            Select your path to unlock your personalized plan.
          </Text>
        </View>

        {options.map((option) => (
          <AnimatedButton
            key={option.id}
            title={option.label}
            onPress={() => setArchetype(option.id)}
            variant="primary"
            style={styles.archetypeButton}
          />
        ))}
      </FadeInView>
    );
  }

  return (
    <FadeInView style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.eyebrow}>DAILY MINDSET</Text>
        <Text style={styles.header}>Hello, {archetype.toUpperCase()}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.accentLine} />

        <Text style={styles.proverb}>"{randomProverb.proverb}"</Text>
        <Text style={styles.author}>— {randomProverb.origin}</Text>

        <View style={styles.divider} />

        <Text style={styles.lesson}>{randomProverb.lesson}</Text>
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.cleanWhite,
    alignItems: 'center',
  },
  headerArea: {
    width: '100%',
    maxWidth: 480,
    marginBottom: 28,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 6,
  },
  header: {
    fontSize: 28,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  archetypeButton: {
    width: '100%',
    maxWidth: 480,
    height: 56,
    borderRadius: 12,
    marginBottom: 12,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    padding: 24,
    backgroundColor: Colors.softBg,
    borderRadius: 18,
    position: 'relative',
  },
  accentLine: {
    position: 'absolute',
    top: 16,
    left: 0,
    width: 4,
    height: 40,
    backgroundColor: Colors.zenGold,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  proverb: {
    fontSize: 20,
    ...FONTS.medium,
    marginBottom: 12,
    color: Colors.earthBlack,
    lineHeight: 30,
    fontStyle: 'italic',
    marginLeft: 12,
  },
  author: {
    fontSize: 13,
    ...FONTS.semibold,
    color: Colors.mboaGreen,
    textAlign: 'right',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 16,
  },
  lesson: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 22,
  },
});

export default HubScreen;