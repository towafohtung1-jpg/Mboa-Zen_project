import React, { useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { FONTS, SIZES } from '../../constants/typography';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'gold';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'gold':
        return { backgroundColor: Colors.zenGold };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: Colors.mboaGreen,
        };
      default:
        return { backgroundColor: Colors.mboaGreen };
    }
  };

  const getTextColor = () => {
    if (variant === 'gold') return Colors.earthBlack;
    return Colors.textPrimary;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, getButtonStyle(), disabled && styles.disabled, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} />
        ) : (
          <Text
            style={[
              styles.text,
              { color: getTextColor() },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: SIZES.body1,
    ...FONTS.bold,
    letterSpacing: 0.5,
  },
});