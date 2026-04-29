import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, Circle, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const PearIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    body: '#C5E17A',
    stroke: '#7CB342',
    stem: '#5D4037',
    leaf: '#8BC34A',
    leafStroke: '#558B2F',
  };

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G>
          {/* 서양배 몸통 - 아래는 통통한 원형, 위는 좁아지는 형태 */}
          <Path
            d="M50 18
               C50 18, 58 18, 62 24
               C68 32, 68 40, 64 46
               C72 50, 78 58, 78 68
               C78 82, 65 92, 50 92
               C35 92, 22 82, 22 68
               C22 58, 28 50, 36 46
               C32 40, 32 32, 38 24
               C42 18, 50 18, 50 18 Z"
            fill={colors.body}
            stroke={colors.stroke}
            strokeWidth="2"
          />

          {/* 줄기 */}
          <Path
            d="M50 18 Q52 10, 50 6"
            stroke={colors.stem}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* 잎 */}
          <Path
            d="M50 12 Q62 4, 68 10 Q60 18, 50 14 Z"
            fill={colors.leaf}
            stroke={colors.leafStroke}
            strokeWidth="1"
          />
        </G>
      </SvgComponent>
    </View>
  );
};

export default PearIcon;
