import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import proverbs from '../data/proverbs.json';
import { CONTEXT_GUIDES, ContextGuide } from '../data/contextGuides';
import { FadeInView } from '../components/common/FadeInView';
import { AnimatedButton } from '../components/common/AnimatedButton';

const HubScreen = () => {
  const { archetype, setArchetype } = useUserStore();
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(null);

  const randomProverb: any =
    proverbs[Math.floor(Math.random() * proverbs.length)];

  const options: { id: 'runner' | 'warrior' | 'guardian'; label: string }[] = [
    { id: 'runner', label: 'The Runner' },
    { id: 'warrior', label: 'The Warrior' },
    { id: 'guardian', label: 'The Guardian' },
  ];

  const toggleGuide = (id: string) => {
    setExpandedGuideId(expandedGuideId === id ? null : id);
  };

  if (!archetype) {
    return (
      <FadeInView style={styles.container}>
        <View style={styles.section}>
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
        </View>
      </FadeInView>
    );
  }

  return (
    <FadeInView style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.headerArea}>
            <Text style={styles.eyebrow}>DAILY MINDSET</Text>
            <Text style={styles.header}>Hello, {archetype.toUpperCase()}</Text>
          </View>

          {/* Daily Proverb Card */}
          <View style={styles.card}>
            <View style={styles.accentLine} />

            <Text style={styles.proverb}>"{randomProverb.proverb}"</Text>
            <Text style={styles.author}>— {randomProverb.origin}</Text>

            <View style={styles.divider} />

            <Text style={styles.lesson}>{randomProverb.lesson}</Text>
          </View>

          {/* Wellness Guides */}
          <Text style={styles.sectionLabel}>WELLNESS GUIDES</Text>

          {CONTEXT_GUIDES.map((guide) => {
            const isExpanded = expandedGuideId === guide.id;
            return (
              <TouchableOpacity
                key={guide.id}
                style={styles.guideCard}
                onPress={() => toggleGuide(guide.id)}
                activeOpacity={0.85}
              >
                <View style={styles.guideHeader}>
                  <View style={styles.guideIconWrap}>
                    <Image
                      source={guide.icon}
                      style={styles.guideIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.guideHeaderText}>
                    <Text style={styles.guideTitle}>{guide.title}</Text>
                    <Text style={styles.guideTagline}>{guide.tagline}</Text>
                  </View>
                  <Text style={styles.guideChevron}>
                    {isExpanded ? '▲' : '▼'}
                  </Text>
                </View>

                {isExpanded && (
                  <View style={styles.guideExpandedContent}>
                    <View style={styles.guideDivider} />
                    <Text style={styles.guideFullText}>{guide.fullText}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cleanWhite,
    alignItems: 'center',
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
    paddingTop: 20,
  },
  headerArea: {
    marginBottom: 20,
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
    height: 56,
    borderRadius: 12,
    marginBottom: 12,
  },

  // Daily proverb card
  card: {
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

  // Wellness guides
  sectionLabel: {
    fontSize: 12,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    letterSpacing: 2,
    marginTop: 28,
    marginBottom: 12,
  },
  guideCard: {
    backgroundColor: Colors.softBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guideIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.cleanWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  guideIcon: {
    width: 26,
    height: 26,
  },
  guideHeaderText: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 15,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 2,
  },
  guideTagline: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 16,
  },
  guideChevron: {
    fontSize: 12,
    color: Colors.mboaGreen,
    marginLeft: 10,
  },
  guideExpandedContent: {
    marginTop: 4,
  },
  guideDivider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 14,
  },
  guideFullText: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.earthBlack,
    lineHeight: 22,
  },
});

export default HubScreen;