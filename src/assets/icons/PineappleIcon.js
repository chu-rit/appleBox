import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, Rect, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const PineappleIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    body: '#FFD54F',
    stroke: '#FFA000',
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
          {/* Pineapple body - tall vertical oval */}
          <Path
            d="M50 24
               C64 24, 76 34, 76 57
               C76 80, 64 92, 50 92
               C36 92, 24 80, 24 57
               C24 34, 36 24, 50 24 Z"
            fill={colors.body}
            stroke={colors.stroke}
            strokeWidth="2"
          />
          
          {/* Diagonal crosshatch pattern */}
          <Path d="M28 38 L35 45" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M36 32 L43 39" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M44 32 L51 39" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M52 32 L59 39" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M60 32 L67 39" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M28 48 L35 55" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M36 42 L43 49" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M44 42 L51 49" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M52 42 L59 49" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M60 42 L67 49" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M28 58 L35 65" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M36 52 L43 59" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M44 52 L51 59" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M52 52 L59 59" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M60 52 L67 59" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M28 68 L35 75" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M36 62 L43 69" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M44 62 L51 69" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M52 62 L59 69" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M60 62 L67 69" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M36 72 L43 79" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M44 72 L51 79" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M52 72 L59 79" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          <Path d="M60 72 L67 79" stroke={colors.stroke} strokeWidth="1.5" opacity="0.6" />
          
          {/* Leaves - crown */}
          <Path d="M50 26 L32 4 L44 24 Z" fill={colors.leaf} />
          <Path d="M50 26 L50 0 L56 24 Z" fill={colors.leaf} />
          <Path d="M50 26 L68 4 L56 24 Z" fill={colors.leaf} />
          <Path d="M50 26 L38 10 L47 24 Z" fill={colors.leaf} />
          <Path d="M50 26 L62 10 L53 24 Z" fill={colors.leaf} />
        </G>
      </SvgComponent>
    </View>
  );
};

export default PineappleIcon;
