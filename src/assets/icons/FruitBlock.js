import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Rect, G } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const FruitBlock = ({
  size = 60,
  fruit = '🍎',
  selected = false,
  style,
  animated = false,
  blockFill = '#FFB347',
  blockStroke = '#FF8C42',
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const padding = 2;
  const innerSize = size - padding * 2;

  const color = { fill: blockFill, stroke: blockStroke };

  return (
    <View style={[{ width: size, height: size }, style]}>
      <SvgComponent
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <G>
          {/* Flat block with rounded corners */}
          <Rect
            x={padding}
            y={padding}
            width={innerSize}
            height={innerSize}
            rx={10}
            ry={10}
            fill={color.fill}
            stroke={selected ? '#FFD700' : color.stroke}
            strokeWidth={selected ? 3 : 2}
          />
        </G>
      </SvgComponent>
    </View>
  );
};

export default FruitBlock;
