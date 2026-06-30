import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, Image, Easing } from 'react-native';
import { Colors } from '../../constants/colors';
import { FONTS, SIZES } from '../../constants/typography';

interface AnimatedLogoProps {
  size?: number;
  showText?: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 110,
  showText = true,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.06,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    Animated.timing(textFadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-12deg', '0deg'],
  });

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.View
        style={{
          transform: [
            { scale: Animated.multiply(scaleAnim, pulseAnim) },
            { rotate: rotation },
          ],
          opacity: opacityAnim,
        }}
      >
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size * 0.22,
            backgroundColor: Colors.earthBlack,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: Colors.zenGold,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 25,
            elevation: 15,
            padding: 8,
          }}
        >
          <Image
            source={require('../../../assets/Logo/mboa_zen_logo 3D.jpeg')}
            style={{
              width: size - 16,
              height: size - 16,
              borderRadius: (size - 16) * 0.2,
            }}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {showText && (
        <Animated.View
          style={{
            opacity: textFadeAnim,
            alignItems: 'center',
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              ...FONTS.bold,
              color: Colors.cleanWhite,
              letterSpacing: 4,
              marginBottom: 8,
            }}
          >
            MBOA-ZEN
          </Text>
          <Text
            style={{
              fontSize: 13,
              ...FONTS.regular,
              color: Colors.zenGold,
              letterSpacing: 2,
              opacity: 0.85,
            }}
          >
            Local Wellness. Modern Discipline.
          </Text>
        </Animated.View>
      )}
    </View>
  );
};