import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, Circle, G, Ellipse } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const BananaIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    banana: '#FFEE58',
    stroke: '#FBC02D',
    tip: '#5D4037',
  };

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G>
          {/* 줄기 */}
          <Path d="M 38,14 C 42,10 52,10 56,14" stroke={colors.tip} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <Path d="M 47,14 L 47,20" stroke={colors.tip} strokeWidth="3" strokeLinecap="round"/>

          {/* 왼쪽 바나나 - 왼쪽으로 휘어짐 */}
          <Path
            d="M 44,20 C 36,21 22,28 14,44 C 8,56 12,72 18,78
               C 22,82 26,80 28,76
               C 24,70 22,56 28,44 C 34,32 42,26 48,26 Z"
            fill={colors.banana} stroke={colors.stroke} strokeWidth="1.2"
          />

          {/* 가운데 바나나 - 아래로 휘어짐 */}
          <Path
            d="M 47,20 C 42,21 36,27 34,40 C 32,54 36,70 42,80
               C 44,84 50,86 56,84
               C 62,82 64,76 62,72
               C 56,76 50,74 48,68 C 44,56 46,42 52,32 C 54,27 52,21 47,20 Z"
            fill={colors.banana} stroke={colors.stroke} strokeWidth="1.2"
          />

          {/* 오른쪽 바나나 - 오른쪽으로 휘어짐 */}
          <Path
            d="M 50,20 C 56,21 66,28 72,40 C 78,54 76,68 72,76
               C 70,80 66,82 62,78
               C 66,72 68,58 64,46 C 60,34 52,26 46,26 Z"
            fill={colors.banana} stroke={colors.stroke} strokeWidth="1.2"
          />
        </G>
      </SvgComponent>
    </View>
  );
};

export default BananaIcon;
