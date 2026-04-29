import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const PeachIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    peach: '#FFAB91',
    stroke: '#E64A19',
    leaf: '#7CB342',
  };

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G transform="scale(1.15) translate(-7.5, -7.5)">
          {/* Peach body - larger and more circular */}
          <Path
            d="M50 15
               C26 15, 12 30, 12 54
               C12 78, 28 92, 50 92
               C72 92, 88 78, 88 54
               C88 30, 74 15, 50 15
               Z"
            fill={colors.peach}
            stroke={colors.stroke}
            strokeWidth="2"
          />
          
          {/* Crease line */}
          <Path
            d="M50 15 Q47 54, 50 92"
            stroke={colors.stroke}
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          
          {/* Leaf */}
          <Path
            d="M50 15 Q68 3, 78 10 Q72 22, 54 18 Z"
            fill={colors.leaf}
          />
          
          {/* Stem */}
          <Path
            d="M50 15 Q50 6, 48 1"
            stroke={colors.stroke}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>
      </SvgComponent>
    </View>
  );
};

export default PeachIcon;
