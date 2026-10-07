// ─── src/components/common/ScrollToTopButton.tsx ───────────────────────

import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { FONTS } from '../../constants/typography';

type Props = {
  scrollRef: React.RefObject<any>;
  showAfter?: number; // pixels scrolled before button appears
};

export const ScrollToTopButton = ({ scrollRef, showAfter = 400 }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setVisible(y > showAfter);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={scrollToTop}
      activeOpacity={0.8}
    >
      <Text style={styles.arrow}>↑</Text>
    </TouchableOpacity>
  );
};

// Export a helper to attach the scroll listener
export const scrollToTopListener = (
  setVisible: (v: boolean) => void,
  showAfter: number = 400
) => {
  return (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setVisible(y > showAfter);
  };
};

const styles = StyleSheet.create({
  button: {
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
  arrow: {
    fontSize: 24,
    ...FONTS.bold,
    color: Colors.cleanWhite,
    marginBottom: 2,
  },
});