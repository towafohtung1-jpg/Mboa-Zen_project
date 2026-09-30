// ─── src/navigation/HubStack.tsx ───────────────────────────────────────

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HubScreen from '../screens/HubScreen';
import ScanScreen from '../screens/ScanScreen';

const Stack = createNativeStackNavigator();

export const HubStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HubMain" component={HubScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
    </Stack.Navigator>
  );
};