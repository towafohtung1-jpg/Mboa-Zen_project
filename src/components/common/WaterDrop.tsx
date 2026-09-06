// src/components/WaterDrop.tsx

import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

type WaterDropProps = {
  filled: boolean;
  onPress: () => void;
};

const WaterDrop = ({ filled, onPress }: WaterDropProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Image
        source={
          filled
            ? require('../../../assets/Media/Icons/drop_filled.png')
            : require('../../../assets/Media/Icons/drop_empty.png')
        }
        style={styles.drop}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drop: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default WaterDrop;