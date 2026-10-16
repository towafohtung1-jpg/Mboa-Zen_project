// ─── src/screens/MarketScreen.tsx ──────────────────────────────────────

import React, { useState, useEffect, useRef } from 'react';
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
import { useSwipeTabs } from '../hooks/useSwipeTabs';
import { useTranslation } from '../i18n/useTranslation';

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
    specialtyKey: 'market.coachNutrition',
    location: 'Yaoundé',
    rating: 4.9,
    price: 'FCFA 5,000/session',
    avatar: 'coach_marie',
    available: true,
  },
  {
    id: '2',
    name: 'Coach Jean',
    specialtyKey: 'market.coachStrength',
    location: 'Douala',
    rating: 4.8,
    price: 'FCFA 4,500/session',
    avatar: 'coach_jean',
    available: true,
  },
  {
    id: '3',
    name: 'Coach Sarah',
    specialtyKey: 'market.coachWellness',
    location: 'Buea',
    rating: 4.7,
    price: 'FCFA 4,000/session',
    avatar: 'coach_sarah',
    available: true,
  },
];

const MarketScreen = () => {
  const { t } = useTranslation();
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
  { key: 'water' as const, labelKey: 'market.njangiWater' },
  { key: 'food' as const, labelKey: 'market.njangiFood' },
  { key: 'move' as const, labelKey: 'market.njangiMove' },
];
  const [selectedPayment, setSelectedPayment] = useState<'momo' | 'orange' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const panHandlers = useSwipeTabs();

  // Scroll-to-top
  const scrollRef = useRef<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowScrollTop(y > 400);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  // ─── HANDLE PREMIUM UPGRADE ──────────────────────────────────────────
  const handleUpgrade = async () => {
    if (!selectedPayment) {
      Alert.alert(t('market.alertPayTitle'), t('market.alertPayBody'));
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsPremium(true);
      Alert.alert(
        t('market.alertPremiumTitle'),
        t('market.alertPremiumBody'),
        [{ text: 'Great!' }]
      );
    } catch (error) {
      Alert.alert(t('market.alertFailedTitle'), t('market.alertFailedBody'));
    } finally {
      setIsProcessing(false);
    }
  };

  // ─── HANDLE COACH BOOKING ────────────────────────────────────────────
  const handleBookCoach = (coach: any) => {
    if (!isPremium) {
    Alert.alert(
      t('market.alertCoachTitle'),
      t('market.alertCoachBody'),
      [
        { text: 'Cancel', style: 'cancel' },
        { text: t('market.upgradeNow'), onPress: () => {} }
      ]
    );
      return;
    }

 Alert.alert(
  t('market.alertBookTitle').replace('{coach}', coach.name),
  `${t(coach.specialtyKey)}\n${coach.location}\n${coach.price}\n\n${coach.rating} rating\n\nBook a session?`,
  [
    { text: 'Cancel', style: 'cancel' },
    {
      text: t('market.bookBtn'),
      onPress: () => {
        Alert.alert(
          t('market.alertSavedTitle'),
          t('market.alertSavedBody'),
          [{ text: 'OK' }]
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
    <FadeInView style={styles.container} {...panHandlers}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ width: '100%' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── HEADER ────────────────────────────────────────────────────── */}
        <View style={styles.headerArea}>
          <Text style={styles.eyebrow}>{t('market.eyebrow')}</Text>
          <Text style={styles.header}>{t('market.header')}</Text>
          <Text style={styles.subHeader}>
            {isPremium ? t('market.subheaderActive') : t('market.subheaderInactive')}
          </Text>
        </View>

        {/* ─── PREMIUM STATUS CARD ──────────────────────────────────────── */}
        <View style={[styles.premiumCard, isPremium && styles.premiumCardActive]}>
          <View style={styles.premiumHeader}>
            <View style={styles.premiumBadgeRow}>
              <Image source={ICONS.check} style={styles.premiumBadgeIcon} />
              <Text style={styles.premiumBadge}>{t('market.premiumBadge')}</Text>
            </View>
            {isPremium && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{t('market.activeBadge')}</Text>
              </View>
            )}
          </View>
          <Text style={styles.premiumPrice}>
            {isPremium ? t('market.priceActive') : t('market.priceInactive')}
          </Text>
          <Text style={styles.premiumDescription}>
            {isPremium ? t('market.descActive') : t('market.descInactive')}
          </Text>
        </View>

        {/* ─── FEATURES LIST ────────────────────────────────────────────── */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>{t('market.whatYouGet')}</Text>

          <View style={styles.featureItem}>
            <Image source={ICONS.dojo} style={styles.featureIconImage} />
            <View style={styles.featureContent}>
              <Text style={styles.featureName}>{t('market.feat1Name')}</Text>
              <Text style={styles.featureDescription}>
                {isPremium ? t('market.feat1DescActive') : t('market.feat1DescInactive')}
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
              <Text style={styles.featureName}>{t('market.feat2Name')}</Text>
              <Text style={styles.featureDescription}>
                {isPremium ? t('market.feat2DescActive') : t('market.feat2DescInactive')}
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
              <Text style={styles.featureName}>{t('market.feat3Name')}</Text>
              <Text style={styles.featureDescription}>
                {isPremium ? t('market.feat3DescActive') : t('market.feat3DescInactive')}
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
              <Text style={styles.featureName}>{t('market.feat4Name')}</Text>
              <Text style={styles.featureDescription}>
                {isPremium ? t('market.feat4DescActive') : t('market.feat4DescInactive')}
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
            <Text style={styles.njangiTitle}>{t('market.njangiTitle')}</Text>
          </View>
          <Text style={styles.njangiSubtitle}>{t('market.njangiSubtitle')}</Text>

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
                    {t(item.labelKey)}
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
              {t('market.njangiProgress').replace('{n}', String(todayNjangi.length))}
            </Text>
          </View>

          <Text style={styles.njangiStreak}>
            {t('market.njangiStreak').replace('{n}', String(njangiStreak))}
          </Text>

          <View style={styles.njangiSavingsRow}>
            <Text style={styles.njangiSavingsLabel}>{t('market.njangiSaved')}</Text>
            <Text style={styles.njangiSavingsValue}>
              {njangiSavings.toLocaleString()} FCFA
            </Text>
          </View>

          <MboaButton
            title={t('market.njangiSaveBtn')}
            onPress={handleSaveNjangi}
            variant="primary"
          />
        </View>

        {/* ─── PAYMENT SECTION ──────────────────────────────────────────── */}
        {!isPremium && (
          <View style={styles.paymentContainer}>
            <Text style={styles.sectionTitle}>{t('market.payWith')}</Text>

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
                  <Text style={styles.paymentName}>{t('market.momoName')}</Text>
                  <Text style={styles.paymentSubtext}>{t('market.momoSubtext')}</Text>
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
              title={isProcessing ? t('market.processing') : t('market.upgradeNow')}
              onPress={handleUpgrade}
              variant="primary"
              disabled={isProcessing}
            />

            <Text style={styles.paymentNote}>{t('market.paymentNote')}</Text>
          </View>
        )}

        {/* ─── COACHES SECTION ──────────────────────────────────────────── */}
        <View style={styles.coachesContainer}>
          <View style={styles.sectionTitleRow}>
            <Image source={ICONS.coaches} style={styles.sectionTitleIcon} />
            <Text style={styles.sectionTitle}>
              {isPremium ? t('market.coachesTitlePremium') : t('market.coachesTitle')}
            </Text>
          </View>
          {!isPremium && (
            <Text style={styles.coachesSubtext}>{t('market.coachesSubtext')}</Text>
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
                  <Text style={styles.coachSpecialty}>{t(coach.specialtyKey)}</Text>
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
                    title={t('market.bookBtn')}
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

      {/* ─── SCROLL TO TOP BUTTON ────────────────────────────────────── */}
      {showScrollTop && (
        <TouchableOpacity
          style={styles.scrollTopButton}
          onPress={scrollToTop}
          activeOpacity={0.8}
        >
          <Text style={styles.scrollTopArrow}>↑</Text>
        </TouchableOpacity>
      )}
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

  // ─── SCROLL TO TOP ─────────────────────────────────────────────────────
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: Colors.zenGold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 999,
  },
  scrollTopArrow: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.cleanWhite,
  },
});

export default MarketScreen;

