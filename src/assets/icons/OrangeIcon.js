import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, Circle, G, Line } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const OrangeIcon = ({
  size = 60,
  style,
  animated = false,
  scale = 1,
}) => {
  const SvgComponent = animated ? AnimatedSvg : Svg;
  const actualSize = size * scale;

  const colors = {
    rind: '#F57C00',
    pith: '#FFE082',
    flesh: '#FFA726',
    segment: '#E65100',
    center: '#FFF8E1',
  };

  const cx = 50, cy = 50;
  const rOuter = 46, rPith = 40, rFlesh = 37, rCenter = 5;
  // 10 segments, lines from center to flesh edge
  const segments = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * 36 - 90) * Math.PI / 180;
    return {
      x: cx + rFlesh * Math.cos(angle),
      y: cy + rFlesh * Math.sin(angle),
    };
  });

  return (
    <View style={[{ width: actualSize, height: actualSize }, style]}>
      <SvgComponent
        width={actualSize}
        height={actualSize}
        viewBox="0 0 100 100"
      >
        <G>
          {/* 껍질 */}
          <Circle cx={cx} cy={cy} r={rOuter} fill={colors.rind} />
          {/* 흰 속껍질 */}
          <Circle cx={cx} cy={cy} r={rPith} fill={colors.pith} />
          {/* 과육 */}
          <Circle cx={cx} cy={cy} r={rFlesh} fill={colors.flesh} />
          {/* 세그먼트 구분선 */}
          {segments.map((pt, i) => (
            <Line
              key={i}
              x1={cx} y1={cy}
              x2={pt.x} y2={pt.y}
              stroke={colors.segment}
              strokeWidth="2.5"
              opacity="1"
            />
          ))}
          {/* 중심 */}
          <Circle cx={cx} cy={cy} r={rCenter} fill={colors.center} />
        </G>
      </SvgComponent>
    </View>
  );
};

export default OrangeIcon;
