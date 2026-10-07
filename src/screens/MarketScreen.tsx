// ─── src/screens/MarketScreen.tsx ──────────────────────────────────────

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
  Image,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';
import { MboaButton } from '../components/common/MboaButton';

// ─── ICONS ──────────────────────────────────────────────────────────────

const ICONS = {
  analytics: require('../../assets/Graphics/UI_vectors_icon_set/analytics.png'),
  check: require('../../assets/Graphics/UI_vectors_icon_set/check.png'),
  coaches: require('../../assets/Graphics/UI_vectors_icon_set/coaches.png'),
  lock: require('../../assets/Graphics/UI_vectors_icon_set/lock.png'),
  location_pin: require('../../assets/Graphics/UI_vectors_icon_set/location_pin.png'),
  payment: require('../../assets/Graphics/UI_vectors_icon_set/payment.png'),
  star: require('../../assets/Graphics/UI_vectors_icon_set/star.png'),
  dojo: require('../../assets/Graphics/UI_vectors_icon_set/dojo.png'),
  kitchen: require('../../assets/Graphics/UI_vectors_icon_set/kitchen.png'),
  njangi: require('../../assets/Graphics/UI_vectors_icon_set/njangi.png'),
  coach_marie: require('../../assets/Graphics/UI_vectors_icon_set/coach_marie.png'),
  coach_jean: require('../../assets/Graphics/UI_vectors_icon_set/coach_jean.png'),
  coach_sarah: require('../../assets/Graphics/UI_vectors_icon_set/coach_sarah.png'),
};

// ─── COACHES DATA ──────────────────────────────────────────────────────
const COACHES = [
  {
    id: '1',
    name: 'Coach Marie',
    specialty: 'Nutrition & Meal Planning',
    location: 'Yaoundé',
    rating: 4.9,
    price: 'FCFA 5,000/session',
    avatar: 'coach_marie',
    available: true,
  },
  {
    id: '2',
    name: 'Coach Jean',
    specialty: 'Strength Training & Fitness',
    location: 'Douala',
    rating: 4.8,
    price: 'FCFA 4,500/session',
    avatar: 'coach_jean',
    available: true,
  },
  {
    id: '3',
    name: 'Coach Sarah',
    specialty: 'Wellness & Lifestyle',
    location: 'Buea',
    rating: 4.7,
    price: 'FCFA 4,000/session',
    avatar: 'coach_sarah',
    available: true,
  },
];

const MarketScreen = () => {
  const {
    archetype,
    isPremium,
    setIsPremium,
    njangiHistory,
    njangiSavings,
    saveNjangiMoney,
    getNjangiStreak,
    getTodayNjangi,
  } = useUserStore();

  const todayNjangi = getTodayNjangi();
  const njangiStreak = getNjangiStreak();
  const njangiItems = [
    { key: 'water' as const, label: 'Drink 8 glasses' },
    { key: 'food' as const, label: 'Eat healthy' },
    { key: 'move' as const, label: 'Move 10 minutes' },
  ];
  const [selectedPayment, setSelectedPayment] = useState<'momo' | 'orange' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // ─── HANDLE PREMIUM UPGRADE ──────────────────────────────────────────
  const handleUpgrade = async () => {
    if (!selectedPayment) {
      Alert.alert('Select Payment Method', 'Please select MTN MoMo or Orange Money.');
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsPremium(true);
      Alert.alert(
        'Premium Activated!',
        'You now have access to all premium features.\n\n' +
        'Exclusive workouts\n' +
        'Personalized meal plans\n' +
        'Coach booking\n' +
        'Advanced analytics',
        [{ text: 'Great!' }]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Please try again or use a different payment method.');
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── HANDLE COACH BOOKING ────────────────────────────────────────────
  const handleBookCoach = (coach: any) => {
    if (!isPremium) {
      Alert.alert(
        'Premium Required',
        'Book a coach session with your premium subscription.\n\n' +
        'Subscribe now for FCFA 2,500/month',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade Now', onPress: () => {} }
        ]
      );
      return;
    }

    Alert.alert(
      `Book ${coach.name}`,
      `${coach.specialty}\n${coach.location}\n${coach.price}\n\n${coach.rating} rating\n\nWould you like to book a session?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book Session',
          onPress: () => {
            Alert.alert('Booking Requested!',
              `You have requested a session with ${coach.name}.\nThey will contact you shortly.`
            );
          }
        }
      ]
    );
  };

  // ─── HANDLE NJANGI SAVE ──────────────────────────────────────────────
  const handleSaveNjangi = () => {
    saveNjangiMoney(100);
    Alert.alert(
      'Saved!',
      '100 FCFA added to your Njangi Box.\n\nKeep going. Little drop = Ocean.',
      [{ text: 'OK' }]
    );
  };

  return (
    <FadeInView style={styles.container}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── HEADER ────────────────────────────────────────────────────── */}
        <View style={styles.headerArea}>
          <Text style={styles.eyebrow}>THE MARKET</Text>
          <Text style={styles.header}>Premium Features</Text>
          <Text style={styles.subHeader}>
            {isPremium ? 'You have full access!' : 'Upgrade to unlock everything'}
          </Text>
        </View>

        {/* ─── PREMIUM STATUS CARD ──────────────────────────────────────── */}
        <View style={[styles.premiumCard, isPremium && styles.premiumCardActive]}>
          <View style={styles.premiumHeader}>
            <View style={styles.premiumBadgeRow}>
              <Image source={ICONS.check} style={styles.premiumBadgeIcon} />
              <Text style={styles.premiumBadge}>PREMIUM</Text>
            </View>
            {isPremium && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>ACTIVE</Text>
              </View>
            )}
          </View>
          <Text style={styles.premiumPrice}>
            {isPremium ? 'You have full access' : 'FCFA 2,500 / month'}
          </Text>
          <Text style={styles.premiumDescription}>
            {isPremium
              ? 'Enjoy all premium features including exclusive workouts and meal plans.'
              : 'Unlock premium content and features to get the most out of Mboa-Zen.'}
          </Text>
        </View>

        {/* ─── FEATURES LIST ────────────────────────────────────────────── */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>What You Get</Text>

          <View style={styles.featureItem}>
            <Image source={ICONS.dojo} style={styles.featureIconImage} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Exclusive Workouts</Text>
              <Text style={styles.featureDescription}>
                {isPremium
                  ? 'All premium workouts unlocked'
                  : 'Advanced workouts and progress tracking'}
              </Text>
            </View>
            <Image
              source={isPremium ? ICONS.check : ICONS.lock}
              style={styles.featureStatusImage}
            />
          </View>

          <View style={styles.featureItem}>
            <Image source={ICONS.kitchen} style={styles.featureIconImage} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Personalized Meal Plans</Text>
              <Text style={styles.featureDescription}>
                {isPremium
                  ? 'All meal plans unlocked'
                  : 'Custom meal plans based on your goals'}
              </Text>
            </View>
            <Image
              source={isPremium ? ICONS.check : ICONS.lock}
              style={styles.featureStatusImage}
            />
          </View>

          <View style={styles.featureItem}>
            <Image source={ICONS.coaches} style={styles.featureIconImage} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Coach Booking</Text>
              <Text style={styles.featureDescription}>
                {isPremium
                  ? 'Book any coach anytime'
                  : '1-on-1 sessions with certified coaches'}
              </Text>
            </View>
            <Image
              source={isPremium ? ICONS.check : ICONS.lock}
              style={styles.featureStatusImage}
            />
          </View>

          <View style={styles.featureItem}>
            <Image source={ICONS.analytics} style={styles.featureIconImage} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Advanced Analytics</Text>
              <Text style={styles.featureDescription}>
                {isPremium
                  ? 'Full analytics dashboard'
                  : 'Track your progress with detailed insights'}
              </Text>
            </View>
            <Image
              source={isPremium ? ICONS.check : ICONS.lock}
              style={styles.featureStatusImage}
            />
          </View>
        </View>

        {/* ─── NJANGI BOX ───────────────────────────────────────────────── */}
        <View style={styles.njangiContainer}>
          <View style={styles.njangiHeader}>
            <Image source={ICONS.njangi} style={styles.njangiIcon} />
            <Text style={styles.njangiTitle}>Njangi Box</Text>
          </View>
          <Text style={styles.njangiSubtitle}>
            Save small. Grow big. The Mboa-Zen way.
          </Text>

          <View style={styles.njangiItemsList}>
            {njangiItems.map((item) => {
              const isDone = todayNjangi.includes(item.key);
              return (
                <View key={item.key} style={styles.njangiItemRow}>
                  <View
                    style={[
                      styles.njangiItemDot,
                      isDone && styles.njangiItemDotDone,
                    ]}
                  />
                  <Text
                    style={[
                      styles.njangiItem,
                      isDone && styles.njangiItemDone,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.njangiProgressRow}>
            <View style={styles.njangiProgressBar}>
              <View
                style={[
                  styles.njangiProgressFill,
                  { width: `${(todayNjangi.length / 3) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.njangiProgressText}>
              {todayNjangi.length}/3 today
            </Text>
          </View>

          <Text style={styles.njangiStreak}>
            {njangiStreak} day{njangiStreak !== 1 ? 's' : ''} njangi streak
          </Text>

          <View style={styles.njangiSavingsRow}>
            <Text style={styles.njangiSavingsLabel}>Total saved:</Text>
            <Text style={styles.njangiSavingsValue}>
              {njangiSavings.toLocaleString()} FCFA
            </Text>
          </View>

          <MboaButton
            title="Save 100 FCFA Today"
            onPress={handleSaveNjangi}
            variant="primary"
          />
        </View>

        {/* ─── PAYMENT SECTION ──────────────────────────────────────────── */}
        {!isPremium && (
          <View style={styles.paymentContainer}>
            <Text style={styles.sectionTitle}>Pay with</Text>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'momo' && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment('momo')}
              activeOpacity={0.8}
            >
              <View style={styles.paymentLeft}>
                <Image source={ICONS.payment} style={styles.paymentIconImage} />
                <View>
                  <Text style={styles.paymentName}>MTN MoMo</Text>
                  <Text style={styles.paymentSubtext}>Mobile Money</Text>
                </View>
              </View>
              {selectedPayment === 'momo' && (
                <View style={styles.paymentCheck}>
                  <Text style={styles.paymentCheckText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'orange' && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment('orange')}
              activeOpacity={0.8}
            >
              <View style={styles.paymentLeft}>
                <Image source={ICONS.payment} style={styles.paymentIconImage} />
                <View>
                  <Text style={styles.paymentName}>Orange Money</Text>
                  <Text style={styles.paymentSubtext}>Mobile Money</Text>
                </View>
              </View>
              {selectedPayment === 'orange' && (
                <View style={styles.paymentCheck}>
                  <Text style={styles.paymentCheckText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            <MboaButton
              title={isProcessing ? 'Processing...' : 'Upgrade Now'}
              onPress={handleUpgrade}
              variant="primary"
              disabled={isProcessing}
            />

            <Text style={styles.paymentNote}>
              Secure payment via MTN MoMo or Orange Money
            </Text>
          </View>
        )}

        {/* ─── COACHES SECTION ──────────────────────────────────────────── */}
        <View style={styles.coachesContainer}>
          <View style={styles.sectionTitleRow}>
            <Image source={ICONS.coaches} style={styles.sectionTitleIcon} />
            <Text style={styles.sectionTitle}>
              {isPremium ? 'Book a Coach' : 'Available Coaches'}
            </Text>
          </View>
          {!isPremium && (
            <Text style={styles.coachesSubtext}>
              Upgrade to premium to book a session
            </Text>
          )}

          {COACHES.map((coach) => (
            <TouchableOpacity
              key={coach.id}
              style={[
                styles.coachCard,
                !isPremium && styles.coachCardLocked,
              ]}
              onPress={() => handleBookCoach(coach)}
              activeOpacity={0.8}
            >
              <View style={styles.coachHeader}>
                <Image
                  source={ICONS[coach.avatar as keyof typeof ICONS]}
                  style={styles.coachAvatarImage}
                />
                <View style={styles.coachInfo}>
                  <Text style={styles.coachName}>{coach.name}</Text>
                  <Text style={styles.coachSpecialty}>{coach.specialty}</Text>
                  <View style={styles.coachMeta}>
                    <View style={styles.coachMetaItem}>
                      <Image source={ICONS.location_pin} style={styles.coachMetaIcon} />
                      <Text style={styles.coachLocation}>{coach.location}</Text>
                    </View>
                    <View style={styles.coachMetaItem}>
                      <Image source={ICONS.star} style={styles.coachMetaIcon} />
                      <Text style={styles.coachRating}>{coach.rating}</Text>
                    </View>
                  </View>
                </View>
                {isPremium && (
                  <MboaButton
                    title="Book"
                    onPress={() => handleBookCoach(coach)}
                    variant="primary"
                  />
                )}
              </View>
              <Text style={styles.coachPrice}>{coach.price}</Text>
              {!isPremium && (
                <View style={styles.coachLockOverlay}>
                  <Image source={ICONS.lock} style={styles.coachLockIcon} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
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
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  headerArea: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  eyebrow: {
    fontSize: 11,
    ...FONTS.bold,
    color: Colors.zenGold,
    letterSpacing: 3,
    marginBottom: 4,
  },
  header: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 2,
  },
  subHeader: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
  },

  // ─── PREMIUM CARD ──────────────────────────────────────────────────────
  premiumCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.cleanWhite,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: Colors.mboaGreen,
  },
  premiumCardActive: {
    borderLeftColor: '#FFD700',
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  premiumBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  premiumBadgeIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  premiumBadge: {
    fontSize: 12,
    ...FONTS.bold,
    color: Colors.mboaGreen,
    letterSpacing: 1,
  },
  activeBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 10,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
  premiumPrice: {
    fontSize: 22,
    ...FONTS.bold,
    color: Colors.earthBlack,
    marginBottom: 4,
  },
  premiumDescription: {
    fontSize: 14,
    ...FONTS.regular,
    color: Colors.textMuted,
    lineHeight: 20,
  },

  // ─── FEATURES ──────────────────────────────────────────────────────────
  featuresContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.cleanWhite,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  featureIconImage: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  featureContent: {
    flex: 1,
  },
  featureName: {
    fontSize: 14,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  featureDescription: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.textMuted,
  },
  featureStatusImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  // ─── NJANGI BOX ───────────────────────────────────────────────────────
  njangiContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#F1FAF3',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.mboaGreen,
  },
  njangiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  njangiIcon: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  njangiTitle: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  njangiSubtitle: {
    fontSize: 13,
    ...FONTS.regular,
    color: Colors.textMuted,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  njangiItemsList: {
    marginBottom: 14,
  },
  njangiItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  njangiItemDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    backgroundColor: 'transparent',
  },
  njangiItemDotDone: {
    backgroundColor: Colors.mboaGreen,
    borderColor: Colors.mboaGreen,
  },
  njangiItem: {
    fontSize: 14,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
  njangiItemDone: {
    color: Colors.mboaGreen,
    ...FONTS.bold,
  },
  njangiProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  njangiProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  njangiProgressFill: {
    height: 8,
    backgroundColor: Colors.mboaGreen,
    borderRadius: 4,
  },
  njangiProgressText: {
    fontSize: 12,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  njangiStreak: {
    fontSize: 13,
    ...FONTS.bold,
    color: Colors.zenGold,
    marginBottom: 12,
    textAlign: 'center',
  },
  njangiSavingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
  },
  njangiSavingsLabel: {
    fontSize: 13,
    ...FONTS.medium,
    color: Colors.textMuted,
  },
  njangiSavingsValue: {
    fontSize: 18,
    ...FONTS.bold,
    color: Colors.mboaGreen,
  },

  // ─── PAYMENT ──────────────────────────────────────────────────────────
  paymentContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.cleanWhite,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  paymentOptionSelected: {
    borderColor: Colors.mboaGreen,
    backgroundColor: '#F1FAF3',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIconImage: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  paymentName: {
    fontSize: 15,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  paymentSubtext: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.textMuted,
  },
  paymentCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentCheckText: {
    fontSize: 14,
    color: Colors.cleanWhite,
  },
  paymentNote: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 8,
  },

  // ─── COACHES ──────────────────────────────────────────────────────────
  coachesContainer: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: Colors.cleanWhite,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
  },
  coachesSubtext: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.textMuted,
    marginBottom: 12,
  },
  coachCard: {
    backgroundColor: Colors.softBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    position: 'relative',
  },
  coachCardLocked: {
    opacity: 0.6,
  },
  coachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachAvatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    resizeMode: 'cover',
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 15,
    ...FONTS.bold,
    color: Colors.earthBlack,
  },
  coachSpecialty: {
    fontSize: 12,
    ...FONTS.regular,
    color: Colors.textMuted,
  },
  coachMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 2,
  },
  coachMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coachMetaIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  coachLocation: {
    fontSize: 11,
    ...FONTS.regular,
    color: Colors.textMuted,
  },
  coachRating: {
    fontSize: 11,
    ...FONTS.regular,
    color: Colors.zenGold,
  },
  coachPrice: {
    fontSize: 12,
    ...FONTS.medium,
    color: Colors.mboaGreen,
    marginTop: 4,
  },
  coachLockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 12,
  },
  coachLockIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default MarketScreen;