import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const AppleIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  // Flat colors - no gradients
  const colors = {
    apple: '#FF4444',
    appleStroke: '#CC0000',
    leaf: '#7CB342',
    stem: '#5D4037',
  };

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G transform="scale(1.1) translate(-5, -5)">
          {/* Apple body - larger and more circular */}
          <Path
            d="M50 18 
               C30 18, 12 28, 12 52 
               C12 76, 28 90, 50 90 
               C72 90, 88 76, 88 52 
               C88 28, 70 18, 50 18 Z"
            fill={colors.apple}
            stroke={colors.appleStroke}
            strokeWidth="2"
          />
          
          {/* Leaf - flat color */}
          <Path
            d="M50 20 
               Q68 8, 78 14 
               Q72 24, 54 22 Z"
            fill={colors.leaf}
          />
          
          {/* Stem */}
          <Path
            d="M50 18 Q50 10, 48 6"
            stroke={colors.stem}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </SvgComponent>
    </View>
  );
};

export default AppleIcon;
