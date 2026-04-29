import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle, Path, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const GrapeIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    grape: '#AB47BC',
    stroke: '#7B1FA2',
    stem: '#5D4037',
  };

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G transform="scale(1.15) translate(-7.5, -7.5)">
          {/* Grape cluster - wide top, taper to bottom */}
          {/* Bottom tip - smallest */}
          <Circle cx="50" cy="88" r="7" fill={colors.grape} stroke={colors.stroke} strokeWidth="1.5" />

          {/* Lower row - small */}
          <Circle cx="38" cy="78" r="9" fill={colors.grape} stroke={colors.stroke} strokeWidth="1.5" />
          <Circle cx="62" cy="78" r="9" fill={colors.grape} stroke={colors.stroke} strokeWidth="1.5" />

          {/* Middle row - medium */}
          <Circle cx="32" cy="64" r="11" fill={colors.grape} stroke={colors.stroke} strokeWidth="2" />
          <Circle cx="50" cy="62" r="11" fill={colors.grape} stroke={colors.stroke} strokeWidth="2" />
          <Circle cx="68" cy="64" r="11" fill={colors.grape} stroke={colors.stroke} strokeWidth="2" />

          {/* Top row - biggest */}
          <Circle cx="26" cy="46" r="14" fill={colors.grape} stroke={colors.stroke} strokeWidth="2" />
          <Circle cx="50" cy="43" r="14" fill={colors.grape} stroke={colors.stroke} strokeWidth="2" />
          <Circle cx="74" cy="46" r="14" fill={colors.grape} stroke={colors.stroke} strokeWidth="2" />

          {/* Stem */}
          <Path
            d="M50 29 L50 18"
            stroke={colors.stem}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </G>
      </SvgComponent>
    </View>
  );
};

export default GrapeIcon;
