import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from '../constants/colors';
import coaches from '../data/coaches.json';
import { useUserStore } from '../store/useUserStore';

const MarketScreen = () => {
  const { isPremium, setPremium } = useUserStore();

  const handleBook = (name: string) => {
    Alert.alert(
      'Coach Booking',
      `Booking session with ${name}.\n\nIn production, this will launch Mobile Money payment.`
    );
  };

  const handleUpgrade = () => {
    setPremium(true);
    Alert.alert(
      'Premium Activated',
      'Welcome to Mboa-Zen Premium (demo mode).'
    );
  };

  const handleMobileMoney = (provider: 'MTN MoMo' | 'Orange Money') => {
    Alert.alert(
      `${provider} Payment`,
      `You will be redirected to ${provider} to complete the upgrade.\n\n(Demo mode)`
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.headerArea}>
              <Text style={styles.header}>The Market</Text>
              <Text style={styles.subheader}>
                Coaches, premium tools, and upgrade options
              </Text>
            </View>

            {/* Premium Card */}
            <View style={styles.premiumCard}>
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>PREMIUM</Text>
              </View>

              <Text style={styles.premiumTitle}>
                Unlock full Mboa-Zen
              </Text>

              <Text style={styles.premiumPrice}>
                FCFA 2,500<Text style={styles.premiumPerMonth}> /month</Text>
              </Text>

              {/* Feature list */}
              <View style={styles.featureList}>
                <View style={styles.featureRow}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>
                    Advanced macro analytics
                  </Text>
                </View>
                <View style={styles.featureRow}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>
                    Full recipe history & custom meal builder
                  </Text>
                </View>
                <View style={styles.featureRow}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>
                    Offline workout access
                  </Text>
                </View>
                <View style={styles.featureRow}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>
                    Direct coach booking priority
                  </Text>
                </View>
              </View>

              {/* Mobile Money buttons */}
              {isPremium ? (
                <View style={styles.activeBox}>
                  <Text style={styles.activeTitle}>PREMIUM ACTIVE</Text>
                  <Text style={styles.activeSubtitle}>
                    You have full access to all features
                  </Text>
                </View>
              ) : (
                <>
                  <View style={styles.momoRow}>
                    <TouchableOpacity
                      style={[styles.momoButton, styles.mtnButton]}
                      onPress={() => handleMobileMoney('MTN MoMo')}
                    >
                      <Text style={styles.momoButtonText}>Pay with MTN MoMo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.momoButton, styles.orangeButton]}
                      onPress={() => handleMobileMoney('Orange Money')}
                    >
                      <Text style={styles.momoButtonText}>Pay with Orange Money</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.demoButton}
                    onPress={handleUpgrade}
                  >
                    <Text style={styles.demoButtonText}>
                      Activate demo (skip payment)
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Section title */}
            <Text style={styles.sectionTitle}>Available Coaches</Text>
            <Text style={styles.sectionSubtitle}>
              Book a 1-on-1 session with certified local guides
            </Text>
          </>
        }
        data={coaches as any}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => {
          const initials = (item.coach_name || '')
            .split(' ')
            .map((w: string) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <View style={styles.coachCard}>
              <View style={styles.coachAvatar}>
                <Text style={styles.coachInitials}>{initials}</Text>
              </View>

              <View style={styles.coachInfo}>
                <Text style={styles.coachName}>{item.coach_name}</Text>
                <Text style={styles.coachSpecialty}>{item.specialty}</Text>

                <View style={styles.coachMetaRow}>
                  <Text style={styles.coachRate}>{item.hourly_rate}</Text>
                  <View style={styles.coachStatusBadge}>
                    <Text style={styles.coachStatusText}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => handleBook(item.coach_name)}
              >
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.becomeCoachCard}>
            <Text style={styles.becomeCoachTitle}>Are you a coach?</Text>
            <Text style={styles.becomeCoachText}>
              Join Mboa-Zen as a certified guide and reach
              users across West Africa.
            </Text>
            <TouchableOpacity style={styles.becomeCoachButton}>
              <Text style={styles.becomeCoachButtonText}>
                Become a Coach
              </Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No coaches available right now.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cleanWhite,
  },

  // Header
  headerArea: {
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.earthBlack,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 13,
    color: Colors.textMuted,
  },

  // Premium card
  premiumCard: {
    backgroundColor: Colors.zenGold,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 18,
  },
  premiumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.earthBlack,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  premiumBadgeText: {
    color: Colors.zenGold,
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.earthBlack,
    marginBottom: 6,
  },
  premiumPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.earthBlack,
    marginBottom: 16,
  },
  premiumPerMonth: {
    fontSize: 14,
    fontWeight: 'normal',
    color: Colors.earthBlack,
  },

  // Features
  featureList: {
    marginBottom: 18,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureCheck: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.mboaGreen,
    marginRight: 10,
    width: 20,
  },
  featureText: {
    fontSize: 14,
    color: Colors.earthBlack,
    flex: 1,
  },

  // Mobile Money
  momoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  momoButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  mtnButton: {
    backgroundColor: '#FFCC00',
  },
  orangeButton: {
    backgroundColor: '#FF7900',
  },
  momoButtonText: {
    color: Colors.cleanWhite,
    fontWeight: 'bold',
    fontSize: 13,
  },
  demoButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  demoButtonText: {
    color: Colors.earthBlack,
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  // Active state
  activeBox: {
    backgroundColor: Colors.mboaGreen,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTitle: {
    color: Colors.cleanWhite,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 2,
  },
  activeSubtitle: {
    color: Colors.cleanWhite,
    fontSize: 12,
    marginTop: 4,
    opacity: 0.9,
  },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.earthBlack,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  // Coach card
  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.softBg,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: Colors.mboaGreen,
  },
  coachAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.mboaGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  coachInitials: {
    color: Colors.cleanWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.earthBlack,
  },
  coachSpecialty: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  coachMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  coachRate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.mboaGreen,
    marginRight: 10,
  },
  coachStatusBadge: {
    backgroundColor: Colors.mboaGreen,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  coachStatusText: {
    color: Colors.cleanWhite,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: Colors.earthBlack,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookButtonText: {
    color: Colors.cleanWhite,
    fontWeight: 'bold',
    fontSize: 13,
  },

  // Become a coach
  becomeCoachCard: {
    backgroundColor: Colors.earthBlack,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 30,
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
  },
  becomeCoachTitle: {
    color: Colors.zenGold,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  becomeCoachText: {
    color: Colors.cleanWhite,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 14,
    opacity: 0.85,
    lineHeight: 20,
  },
  becomeCoachButton: {
    borderWidth: 1,
    borderColor: Colors.zenGold,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  becomeCoachButtonText: {
    color: Colors.zenGold,
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },

  // Empty
  emptyText: {
    textAlign: 'center',
    color: Colors.textMuted,
    marginTop: 20,
  },
});

export default MarketScreen;