// ─── src/hooks/useSwipeTabs.ts ─────────────────────────────────────────

import { useRef } from 'react';
import { PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TAB_ORDER = ['Hub', 'Meals', 'Training', 'Learn', 'Market'];

const ROUTE_TO_TAB: Record<string, string> = {
  HubMain: 'Hub',
  Scan: 'Hub',
  Meals: 'Meals',
  Nurture: 'Meals',
  Training: 'Training',
  Dojo: 'Training',
  Learn: 'Learn',
  Blog: 'Learn',
  Market: 'Market',
};

export const useSwipeTabs = () => {
  const navigation = useNavigation<any>();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, gestureState) => {
        const { dx, dy } = gestureState;
        return Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 1.5;
      },
      onPanResponderRelease: (_, gestureState) => {
        const { dx } = gestureState;
        
        const state = navigation.getState?.();
        const currentRoute = state?.routes?.[state.index]?.name;
        const tabName = ROUTE_TO_TAB[currentRoute || ''] || currentRoute;
        const currentIndex = TAB_ORDER.indexOf(tabName as string);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;
        if (dx < -60) {
          nextIndex = Math.min(currentIndex + 1, TAB_ORDER.length - 1);
        } else if (dx > 60) {
          nextIndex = Math.max(currentIndex - 1, 0);
        }

        if (nextIndex !== currentIndex) {
          navigation.navigate(TAB_ORDER[nextIndex]);
        }
      },
    })
  ).current;

  return panResponder.panHandlers;
};








