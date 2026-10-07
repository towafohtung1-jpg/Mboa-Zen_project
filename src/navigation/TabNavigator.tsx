// ─── src/navigation/TabNavigator.tsx ───────────────────────────────────

import React, { useRef } from 'react';
import { Image, PanResponder, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import { HubStack } from './HubStack';
import NurtureScreen from '../screens/NurtureScreen';
import DojoScreen from '../screens/DojoScreen';
import MarketScreen from '../screens/MarketScreen';
import BlogScreen from '../screens/BlogScreen';
import { Colors } from '../constants/colors';
import { FONTS } from '../constants/typography';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, any> = {
  Hub: require('../../assets/Graphics/UI_vectors_icon_set/dashboard.png'),
  Meals: require('../../assets/Graphics/UI_vectors_icon_set/kitchen.png'),
  Training: require('../../assets/Graphics/UI_vectors_icon_set/dojo.png'),
  Learn: require('../../assets/Graphics/UI_vectors_icon_set/learn.png'),
  Market: require('../../assets/Graphics/UI_vectors_icon_set/market.png'),
};

const TAB_ORDER = ['Hub', 'Meals', 'Training', 'Learn', 'Market'];

const SwipeableTabs = () => {
  const navigation = useNavigation<any>();
  const currentIndexRef = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes that are clearly horizontal
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 1.5;
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        const currentRoute = navigation.getCurrentRoute?.()?.name;
        const currentIndex = TAB_ORDER.indexOf(currentRoute);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;
        if (dx < -60) {
          // swipe left → next tab
          nextIndex = Math.min(currentIndex + 1, TAB_ORDER.length - 1);
        } else if (dx > 60) {
          // swipe right → previous tab
          nextIndex = Math.max(currentIndex - 1, 0);
        }

        if (nextIndex !== currentIndex) {
          navigation.navigate(TAB_ORDER[nextIndex]);
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
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
            ...FONTS.medium,
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
        <Tab.Screen name="Hub" component={HubStack} />
        <Tab.Screen name="Meals" component={NurtureScreen} />
        <Tab.Screen name="Training" component={DojoScreen} />
        <Tab.Screen name="Learn" component={BlogScreen} />
        <Tab.Screen name="Market" component={MarketScreen} />
      </Tab.Navigator>
    </View>
  );
};

export const TabNavigator = () => {
  return <SwipeableTabs />;
};