import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUserStore } from '../../store/useUserStore';

export const ArchetypeGatekeeper = ({ children }: { children: React.ReactNode }) => {
  const archetype = useUserStore((state) => state.archetype);

  // If the user has an archetype, let them pass
  if (archetype) {
    return <>{children}</>;
  }

  // If they are a new "Seeker", block access and guide them to the Hub
  return (
    <View style={styles.container}>
<Text style={styles.message}>Profile Required</Text>      <Text style={styles.subMessage}>Please complete your Hub Quiz to unlock personalized content.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subMessage: { textAlign: 'center', color: '#666' }
});