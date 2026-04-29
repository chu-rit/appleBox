import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, Circle, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const StrawberryIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    berry: '#EC407A',
    stroke: '#AD1457',
    leaf: '#7CB342',
    seed: '#FFD54F',
  };

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G transform="scale(1.15) translate(-7.5, -7.5)">
          {/* Strawberry body - larger and more circular */}
          <Path
            d="M50 88 
               C26 78, 14 55, 20 38
               C24 26, 35 20, 50 20
               C65 20, 76 26, 80 38
               C86 55, 74 78, 50 88 Z"
            fill={colors.berry}
            stroke={colors.stroke}
            strokeWidth="2"
          />
          
          {/* Seeds - small dots */}
          <Circle cx="32" cy="52" r="2" fill={colors.seed} />
          <Circle cx="45" cy="65" r="2" fill={colors.seed} />
          <Circle cx="55" cy="58" r="2" fill={colors.seed} />
          <Circle cx="68" cy="48" r="2" fill={colors.seed} />
          <Circle cx="38" cy="75" r="2" fill={colors.seed} />
          <Circle cx="62" cy="75" r="2" fill={colors.seed} />
          
          {/* Leaves */}
          <Path
            d="M50 20 L32 8 L40 20 Z"
            fill={colors.leaf}
          />
          <Path
            d="M50 20 L50 2 L58 20 Z"
            fill={colors.leaf}
          />
          <Path
            d="M50 20 L68 8 L60 20 Z"
            fill={colors.leaf}
          />
          
          {/* Stem */}
          <Path
            d="M50 8 L50 0"
            stroke={colors.leaf}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>
      </SvgComponent>
    </View>
  );
};

export default StrawberryIcon;
