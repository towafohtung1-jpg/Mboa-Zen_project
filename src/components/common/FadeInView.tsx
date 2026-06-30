import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, ViewProps } from 'react-native';

interface FadeInViewProps extends ViewProps {
  duration?: number;
  delay?: number;
  style?: ViewStyle | ViewStyle[];
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  duration = 700,
  delay = 100,
  style,
  ...props
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
};