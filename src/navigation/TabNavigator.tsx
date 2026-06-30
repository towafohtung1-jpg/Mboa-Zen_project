import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HubScreen from '../screens/HubScreen';
import NurtureScreen from '../screens/NurtureScreen';
import ScanScreen from '../screens/ScanScreen';
import DojoScreen from '../screens/DojoScreen';
import MarketScreen from '../screens/MarketScreen';
import { Colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

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
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Hub') {
            return (
              <Image
                source={require('../../assets/Graphics/UI_vectors_icon_set/dashboard.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            );
          }

          if (route.name === 'Dojo') {
            return (
              <Image
                source={require('../../assets/Graphics/UI_vectors_icon_set/dojo.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            );
          }

          let iconName: any = 'ellipse';

          if (route.name === 'Nurture') iconName = focused ? 'restaurant' : 'restaurant-outline';
          if (route.name === 'Scan') iconName = focused ? 'scan-circle' : 'scan-circle-outline';
          if (route.name === 'Market') iconName = focused ? 'people' : 'people-outline';

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={focused ? Colors.mboaGreen : Colors.tabInactive}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Hub" component={HubScreen} />
      <Tab.Screen name="Nurture" component={NurtureScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Dojo" component={DojoScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
    </Tab.Navigator>
  );
};