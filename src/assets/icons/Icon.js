import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path, G, Circle, Rect, Polygon } from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// Icon definitions
const ICONS = {
  back: {
    viewBox: '0 0 24 24',
    path: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  },
  refresh: {
    viewBox: '0 0 24 24',
    path: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
  },
};

const Icon = ({
  name,
  size = 24,
  color = '#FFF',
  style,
  animated = false,
}) => {
  const iconData = ICONS[name];
  if (!iconData) return null;

  const SvgComponent = animated ? AnimatedSvg : Svg;

  return (
    <View style={[{ width: size, height: size }, style]}>
      <SvgComponent
        width={size}
        height={size}
        viewBox={iconData.viewBox}
        fill="none"
      >
        <Path
          d={iconData.path}
          fill={color}
        />
      </SvgComponent>
    </View>
  );
};

export default Icon;
export { ICONS };
