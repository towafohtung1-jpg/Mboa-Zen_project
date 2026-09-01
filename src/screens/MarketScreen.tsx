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
} from 'react-native';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';
import { useUserStore } from '../store/useUserStore';
import { FadeInView } from '../components/common/FadeInView';

// ─── COACHES DATA ──────────────────────────────────────────────────────
const COACHES = [
  {
    id: '1',
    name: 'Coach Marie',
    specialty: 'Nutrition & Meal Planning',
    location: 'Yaoundé',
    rating: 4.9,
    price: 'FCFA 5,000/session',
    image: '👩‍🍳',
    available: true,
  },
  {
    id: '2',
    name: 'Coach Jean',
    specialty: 'Strength Training & Fitness',
    location: 'Douala',
    rating: 4.8,
    price: 'FCFA 4,500/session',
    image: '🏋️',
    available: true,
  },
  {
    id: '3',
    name: 'Coach Sarah',
    specialty: 'Wellness & Lifestyle',
    location: 'Buea',
    rating: 4.7,
    price: 'FCFA 4,000/session',
    image: '🧘',
    available: true,
  },
];

const MarketScreen = () => {
  const { archetype, isPremium, setIsPremium } = useUserStore();
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
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Successful payment
      setIsPremium(true);
      Alert.alert(
        '🎉 Premium Activated!',
        'You now have access to all premium features.\n\n' +
        '✅ Exclusive workouts\n' +
        '✅ Personalized meal plans\n' +
        '✅ Coach booking\n' +
        '✅ Advanced analytics',
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
      `${coach.specialty}\n${coach.location}\n${coach.price}\n\n⭐ ${coach.rating} rating\n\nWould you like to book a session?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Book Session', 
          onPress: () => {
            // In a real app, this would send a booking request
            Alert.alert('✅ Booking Requested!', 
              `You have requested a session with ${coach.name}.\nThey will contact you shortly.`
            );
          }
        }
      ]
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
            {isPremium ? '🎉 You have full access!' : 'Upgrade to unlock everything'}
          </Text>
        </View>

        {/* ─── PREMIUM STATUS CARD ──────────────────────────────────────── */}
        <View style={[styles.premiumCard, isPremium && styles.premiumCardActive]}>
          <View style={styles.premiumHeader}>
            <Text style={styles.premiumBadge}>
              {isPremium ? '✅ PREMIUM' : '⭐ PREMIUM'}
            </Text>
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
            <Text style={styles.featureIcon}>🏋️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Exclusive Workouts</Text>
              <Text style={styles.featureDescription}>
                {isPremium 
                  ? 'All premium workouts unlocked' 
                  : 'Advanced workouts and progress tracking'}
              </Text>
            </View>
            {isPremium ? (
              <Text style={styles.featureStatus}>✅</Text>
            ) : (
              <Text style={styles.featureLock}>🔒</Text>
            )}
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🍽️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Personalized Meal Plans</Text>
              <Text style={styles.featureDescription}>
                {isPremium 
                  ? 'All meal plans unlocked' 
                  : 'Custom meal plans based on your goals'}
              </Text>
            </View>
            {isPremium ? (
              <Text style={styles.featureStatus}>✅</Text>
            ) : (
              <Text style={styles.featureLock}>🔒</Text>
            )}
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👨‍🏫</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Coach Booking</Text>
              <Text style={styles.featureDescription}>
                {isPremium 
                  ? 'Book any coach anytime' 
                  : '1-on-1 sessions with certified coaches'}
              </Text>
            </View>
            {isPremium ? (
              <Text style={styles.featureStatus}>✅</Text>
            ) : (
              <Text style={styles.featureLock}>🔒</Text>
            )}
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📊</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>Advanced Analytics</Text>
              <Text style={styles.featureDescription}>
                {isPremium 
                  ? 'Full analytics dashboard' 
                  : 'Track your progress with detailed insights'}
              </Text>
            </View>
            {isPremium ? (
              <Text style={styles.featureStatus}>✅</Text>
            ) : (
              <Text style={styles.featureLock}>🔒</Text>
            )}
          </View>
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
                <Text style={styles.paymentIcon}>📱</Text>
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
                <Text style={styles.paymentIcon}>📱</Text>
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

            <TouchableOpacity
              style={[
                styles.upgradeButton,
                isProcessing && styles.upgradeButtonDisabled,
              ]}
              onPress={handleUpgrade}
              disabled={isProcessing}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeButtonText}>
                {isProcessing ? 'Processing...' : '🔓 Upgrade Now'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.paymentNote}>
              Secure payment via MTN MoMo or Orange Money
            </Text>
          </View>
        )}

        {/* ─── COACHES SECTION ──────────────────────────────────────────── */}
        <View style={styles.coachesContainer}>
          <Text style={styles.sectionTitle}>
            {isPremium ? '👨‍🏫 Book a Coach' : '👨‍🏫 Available Coaches'}
          </Text>
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
                <Text style={styles.coachAvatar}>{coach.image}</Text>
                <View style={styles.coachInfo}>
                  <Text style={styles.coachName}>{coach.name}</Text>
                  <Text style={styles.coachSpecialty}>{coach.specialty}</Text>
                  <View style={styles.coachMeta}>
                    <Text style={styles.coachLocation}>📍 {coach.location}</Text>
                    <Text style={styles.coachRating}>⭐ {coach.rating}</Text>
                  </View>
                </View>
                {isPremium && (
                  <View style={styles.coachBookButton}>
                    <Text style={styles.coachBookText}>Book</Text>
                  </View>
                )}
              </View>
              <Text style={styles.coachPrice}>{coach.price}</Text>
              {!isPremium && (
                <View style={styles.coachLockOverlay}>
                  <Text style={styles.coachLockText}>🔒</Text>
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
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
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
  featureStatus: {
    fontSize: 18,
  },
  featureLock: {
    fontSize: 18,
    color: Colors.textMuted,
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
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
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
  upgradeButton: {
    backgroundColor: Colors.mboaGreen,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  upgradeButtonDisabled: {
    opacity: 0.6,
  },
  upgradeButtonText: {
    fontSize: 16,
    ...FONTS.bold,
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
  coachAvatar: {
    fontSize: 32,
    marginRight: 12,
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
  coachBookButton: {
    backgroundColor: Colors.mboaGreen,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  coachBookText: {
    fontSize: 12,
    ...FONTS.bold,
    color: Colors.cleanWhite,
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
  coachLockText: {
    fontSize: 32,
  },
});

export default MarketScreen;