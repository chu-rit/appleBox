import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const WatermelonIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    rind: '#2E7D32',
    flesh: '#FF5252',
    seed: '#1B1B1B',
  };

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G transform="scale(1.15) translate(-7.5, -7.5)">
          {/* Watermelon slice body - no stroke */}
          <Path
            d="M50 10 L88 80 Q50 95 12 80 Z"
            fill={colors.flesh}
          />
          {/* Green rind - bottom curved edge only */}
          <Path
            d="M88 80 Q50 95 12 80"
            fill="none"
            stroke={colors.rind}
            strokeWidth="8"
            strokeLinecap="round"
          />
          
          {/* Seeds */}
          <Path d="M40 58 L42 64" stroke={colors.seed} strokeWidth="3" strokeLinecap="round" />
          <Path d="M50 50 L52 56" stroke={colors.seed} strokeWidth="3" strokeLinecap="round" />
          <Path d="M60 58 L62 64" stroke={colors.seed} strokeWidth="3" strokeLinecap="round" />
          <Path d="M45 70 L47 76" stroke={colors.seed} strokeWidth="3" strokeLinecap="round" />
          <Path d="M55 70 L57 76" stroke={colors.seed} strokeWidth="3" strokeLinecap="round" />
        </G>
      </SvgComponent>
    </View>
  );
};

export default WatermelonIcon;
