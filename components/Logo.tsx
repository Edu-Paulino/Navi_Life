import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors } from '../constants/Colors';

interface LogoProps {
  size?: number;
  color?: string;
}

export default function Logo({ size = 60, color = Colors.primary }: LogoProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Path
          d="M50 10 L55 25 L50 35 L45 25 Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M50 90 L55 75 L50 65 L45 75 Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
        />
        <Path
          d="M25 35 C25 28, 35 25, 40 30 L50 45 L40 50 C35 52, 25 48, 25 42 Z"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        <Path
          d="M75 35 C75 28, 65 25, 60 30 L50 45 L60 50 C65 52, 75 48, 75 42 Z"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        <Path
          d="M35 50 C28 50, 20 55, 22 62 L30 70 L38 65 C42 62, 40 52, 35 50 Z"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        <Path
          d="M65 50 C72 50, 80 55, 78 62 L70 70 L62 65 C58 62, 60 52, 65 50 Z"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        <Circle cx="50" cy="50" r="8" fill={color} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
