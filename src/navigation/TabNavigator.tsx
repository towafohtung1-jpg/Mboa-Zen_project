import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HubScreen from '../screens/HubScreen';
import NurtureScreen from '../screens/NurtureScreen';
import ScanScreen from '../screens/ScanScreen';
import DojoScreen from '../screens/DojoScreen';
import MarketScreen from '../screens/MarketScreen';
import { Colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, any> = {
  Hub: require('../../assets/Graphics/UI_vectors_icon_set/dashboard.png'),
  Meals: require('../../assets/Graphics/UI_vectors_icon_set/kitchen.png'),
  Scan: require('../../assets/Graphics/UI_vectors_icon_set/scan.png'),
  Training: require('../../assets/Graphics/UI_vectors_icon_set/dojo.png'),
  Market: require('../../assets/Graphics/UI_vectors_icon_set/market.png'),
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.mboaGreen,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarStyle: {
          backgroundColor: Colors.cleanWhite,
          borderTopColor: '#e5e5e5',
          height: 82,
          paddingBottom: 14,
          paddingTop: 14,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIcon: ({ focused }) => (
          <Image
            source={ICONS[route.name]}
            style={{
              width: 34,
              height: 34,
              opacity: focused ? 1 : 0.45,
            }}
            resizeMode="contain"
          />
        ),
      })}
    >
      <Tab.Screen name="Hub" component={HubScreen} />
      <Tab.Screen name="Meals" component={NurtureScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Training" component={DojoScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
    </Tab.Navigator>
  );
};