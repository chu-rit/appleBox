import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { G, Circle, Path, Ellipse, Rect } from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

// Side-view girl worker facing right
const WorkerIcon = ({ size = 60, style, animate = false }) => {
  const bodyBob = useSharedValue(0);
  const frontArmRot = useSharedValue(0);
  const backArmRot = useSharedValue(0);

  React.useEffect(() => {
    if (!animate) return;
    bodyBob.value = withRepeat(
      withSequence(
        withTiming(-2, { duration: 500 }),
        withTiming(0,  { duration: 500 }),
      ), -1, true
    );
    frontArmRot.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 500 }),
        withTiming(5,   { duration: 500 }),
      ), -1, true
    );
    backArmRot.value = withRepeat(
      withSequence(
        withTiming(8,   { duration: 500 }),
        withTiming(-5,  { duration: 500 }),
      ), -1, true
    );
  }, [animate]);

  // Body bob via Animated.View (web-compatible)
  const bodyStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bodyBob.value }],
  }));

  const frontArmProps = useAnimatedProps(() => ({
    rotation: frontArmRot.value, originX: 54, originY: 52,
  }));
  const backArmProps = useAnimatedProps(() => ({
    rotation: backArmRot.value, originX: 46, originY: 52,
  }));

  return (
    <View style={[{ width: size, height: size }, style]}>
      {/* Shadow fixed */}
      <Svg width={size} height={size} viewBox="0 0 80 120" style={{ position: 'absolute' }}>
        <Ellipse cx="40" cy="117" rx="13" ry="3" fill="rgba(0,0,0,0.12)" />
      </Svg>

      <Animated.View style={[{ width: size, height: size, position: 'absolute' }, bodyStyle]}>
        <Svg width={size} height={size} viewBox="0 0 80 120">
          <G>

            {/* ── HAIR flowing behind ── */}
            <Path
              d="M28 18 Q22 26 22 44 Q23 55 26 58 Q27 46 28 34 Q28 26 28 18"
              fill="#4A2C0A"
            />

            {/* ── BACK ARM (resting down, slightly behind torso) ── */}
            <AnimatedG animatedProps={backArmProps}>
              <Path d="M36 50 Q32 62 33 72" stroke="#3A9B6F" strokeWidth="7" strokeLinecap="round" fill="none" />
              <Path d="M36 50 Q32 63 33 73" stroke="#F5C5A3" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <Circle cx="33" cy="74" r="3.5" fill="#F5C5A3" />
            </AnimatedG>

            {/* ── TORSO side silhouette ── */}
            <Path
              d="M32 46 Q38 42 50 44 Q54 46 54 50 L52 82 Q44 86 34 84 Q30 82 30 78 Z"
              fill="#4CAF82"
            />
            {/* Apron front panel */}
            <Path
              d="M34 54 Q44 52 52 54 L50 80 Q44 83 36 81 Z"
              fill="#FFF9F0"
              stroke="#E0CDA0"
              strokeWidth="0.7"
            />
            {/* Apron strings */}
            <Path d="M36 54 L34 48" stroke="#E0CDA0" strokeWidth="1" strokeLinecap="round" />
            <Path d="M50 54 L52 48" stroke="#E0CDA0" strokeWidth="1" strokeLinecap="round" />

            {/* ── SKIRT side silhouette ── */}
            <Path
              d="M30 82 Q42 88 52 82 L54 106 Q44 112 28 108 Z"
              fill="#4CAF82"
            />
            <Path d="M28 108 Q42 112 54 106" fill="none" stroke="#3A9B6F" strokeWidth="0.8" />

            {/* ── LEGS side view (one behind other) ── */}
            {/* Back leg (slightly left, thinner) */}
            <Path d="M36 107 Q34 112 34 116" stroke="#F5C5A3" strokeWidth="5" strokeLinecap="round" fill="none" />
            <Path d="M32 116 Q34 118 38 116" fill="#5D4037" stroke="#5D4037" strokeWidth="1" strokeLinecap="round" />
            {/* Front leg */}
            <Path d="M42 108 Q43 113 44 116" stroke="#F5C5A3" strokeWidth="6" strokeLinecap="round" fill="none" />
            <Path d="M41 116 Q44 119 49 116" fill="#5D4037" stroke="#5D4037" strokeWidth="1" strokeLinecap="round" />

            {/* ── FRONT ARM (raised/forward slightly) ── */}
            <AnimatedG animatedProps={frontArmProps}>
              <Path d="M50 46 Q58 54 60 64" stroke="#3A9B6F" strokeWidth="7" strokeLinecap="round" fill="none" />
              <Path d="M50 46 Q58 55 60 65" stroke="#F5C5A3" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              <Circle cx="60" cy="67" r="3.5" fill="#F5C5A3" />
            </AnimatedG>

            {/* ── NECK ── */}
            <Path d="M38 38 L38 46" stroke="#F5C5A3" strokeWidth="6" strokeLinecap="round" fill="none" />

            {/* ── HEAD side profile facing right ── */}
            {/* Head base */}
            <Path
              d="M26 22 Q26 8 38 8 Q52 8 54 20 Q56 28 52 36 Q48 42 38 42 Q28 40 26 30 Z"
              fill="#F5C5A3"
            />
            {/* Chin taper */}
            <Path
              d="M38 42 Q34 44 34 46 Q36 48 38 46"
              fill="#F5C5A3"
            />

            {/* ── HAIR on head ── */}
            <Path
              d="M26 22 Q24 12 38 8 Q50 6 54 16 Q50 10 38 10 Q28 12 26 22"
              fill="#5C3610"
            />
            {/* Side hair falling */}
            <Path
              d="M26 22 Q22 28 22 44 Q23 55 26 58 Q27 46 27 34 Q26 28 26 22"
              fill="#4A2C0A"
            />

            {/* ── CAP ── */}
            <Path
              d="M26 20 Q28 12 38 10 Q50 8 54 18 Q50 13 38 12 Q30 13 26 20"
              fill="#3A9B6F"
            />
            {/* Brim pointing right */}
            <Path
              d="M26 20 Q38 17 54 18 Q58 20 60 22 Q56 20 54 22 Q38 20 26 22"
              fill="#2E7D56"
            />

            {/* ── FACE ── */}
            {/* Eye */}
            <Ellipse cx="48" cy="23" rx="2.8" ry="3" fill="#FFF" />
            <Circle cx="49" cy="23.5" r="1.7" fill="#3E2723" />
            <Circle cx="49.6" cy="22.8" r="0.55" fill="#FFF" />
            {/* Lash */}
            <Path d="M45 21 Q48 19 51 21" stroke="#4A2C0A" strokeWidth="1" strokeLinecap="round" fill="none" />
            {/* Blush */}
            <Ellipse cx="51" cy="29" rx="3" ry="1.8" fill="rgba(255,140,140,0.38)" />
            {/* Nose */}
            <Path d="M53 27 Q55 29 53 31" stroke="#D4856A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
            {/* Mouth */}
            <Path d="M49 35 Q52 38 54 35" stroke="#D4856A" strokeWidth="1.1" strokeLinecap="round" fill="none" />

            {/* ── NAME TAG ── */}
            <Rect x="36" y="63" width="10" height="6.5" rx="1" fill="#FFF" stroke="#ddd" strokeWidth="0.5" />
            <Rect x="37.5" y="64.2" width="6.5" height="1.2" rx="0.4" fill="#4CAF82" />
            <Rect x="37.5" y="66.5" width="4.5" height="1.2" rx="0.4" fill="#ccc" />

          </G>
        </Svg>
      </Animated.View>
    </View>
  );
};

export default WorkerIcon;
