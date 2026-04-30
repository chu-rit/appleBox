import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Defs, LinearGradient, Stop, Text } from 'react-native-svg';

/**
 * 과일 페인트로 그린 듯한 FRUIT BOX 로고
 * - 각 글자마다 다른 과일 색상
 * - 글자 뒤에 붓 터치(불규칙 blob) path로 페인트 느낌
 */

// 붓칠 blob: 글자 배경에 깔리는 불규칙 타원형 path
const BLOBS = [
  // F - 사과빨강
  { d: 'M14 8 Q22 4 34 7 Q42 9 44 18 Q46 28 40 33 Q32 38 20 35 Q10 32 8 22 Q6 12 14 8 Z', fill: '#FF3B2F', opacity: 0.18 },
  // R - 오렌지
  { d: 'M58 6 Q68 2 80 5 Q90 8 92 18 Q94 29 87 34 Q78 40 64 37 Q52 33 50 22 Q48 11 58 6 Z', fill: '#FF8C00', opacity: 0.18 },
  // U - 포도보라
  { d: 'M102 7 Q113 2 126 6 Q136 10 137 21 Q138 32 130 37 Q120 42 106 38 Q94 34 93 22 Q92 10 102 7 Z', fill: '#AB47BC', opacity: 0.18 },
  // I - 딸기빨강
  { d: 'M148 8 Q155 4 163 7 Q169 10 170 19 Q171 29 165 33 Q157 38 148 35 Q141 32 140 22 Q139 12 148 8 Z', fill: '#E91E63', opacity: 0.18 },
  // T - 수박초록
  { d: 'M188 6 Q200 2 215 6 Q225 10 226 21 Q227 32 218 37 Q206 42 192 38 Q180 34 179 22 Q178 10 188 6 Z', fill: '#4CAF50', opacity: 0.18 },
  // B - 복숭아
  { d: 'M30 58 Q42 53 58 57 Q70 61 71 73 Q72 85 62 90 Q50 96 35 92 Q22 87 20 74 Q18 62 30 58 Z', fill: '#FFAB76', opacity: 0.18 },
  // O - 배노랑
  { d: 'M88 57 Q102 52 118 57 Q130 62 131 74 Q132 86 120 91 Q107 97 92 92 Q78 87 77 74 Q76 62 88 57 Z', fill: '#D4E000', opacity: 0.18 },
  // X - 파인애플노랑
  { d: 'M148 58 Q162 53 178 57 Q190 61 191 73 Q192 85 180 90 Q166 96 152 92 Q138 87 137 74 Q136 62 148 58 Z', fill: '#FFD600', opacity: 0.18 },
];

// 각 글자 색상 (과일 대응)
const FRUIT_COLORS = {
  F: '#FF3B2F', // 사과
  R: '#FF8C00', // 오렌지
  U: '#AB47BC', // 포도
  I: '#E91E63', // 딸기
  T: '#2E7D32', // 수박
  B: '#FF6D3A', // 복숭아
  O: '#A0B800', // 배
  X: '#FF8F00', // 파인애플
};

const STROKE_COLORS = {
  F: '#7B1100', R: '#7B4000', U: '#4A0072', I: '#7B0032',
  T: '#0A3D0A', B: '#7B3000', O: '#4A5200', X: '#7B4000',
};

// 글자별 x 위치 (FRUIT 윗줄, BOX 아랫줄)
const FRUIT_CHARS = [
  { ch: 'F', x: 22,  y: 46 },
  { ch: 'R', x: 68,  y: 46 },
  { ch: 'U', x: 114, y: 46 },
  { ch: 'I', x: 168, y: 46 },
  { ch: 'T', x: 204, y: 46 },
];
const BOX_CHARS = [
  { ch: 'B', x: 55,  y: 95 },
  { ch: 'O', x: 112, y: 95 },
  { ch: 'X', x: 168, y: 95 },
];

const FruitBoxLogo = ({ width = 300, isFruitMode = true }) => {
  const h = 115;
  const scale = width / 240;

  return (
    <View style={{ width, height: h * scale }}>
      <Svg width={width} height={h * scale} viewBox={`0 0 250 ${h}`}>

        {/* 붓칠 blob 배경 */}
        {BLOBS.map((b, i) => (
          <Path key={i} d={b.d} fill={b.fill} opacity={b.opacity} />
        ))}

        {/* FRUIT 글자들 */}
        {FRUIT_CHARS.map(({ ch, x, y }) => (
          <G key={ch}>
            {/* 붓 질감: 약간 기울어진 두꺼운 stroke */}
            <Text
              x={x} y={y}
              fontSize="52"
              fontWeight="900"
              fill="none"
              stroke={STROKE_COLORS[ch]}
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
              fontFamily="Arial Rounded MT Bold, Arial Black, sans-serif"
              transform={`rotate(${(FRUIT_CHARS.indexOf(FRUIT_CHARS.find(c=>c.ch===ch)) % 2 === 0) ? -2 : 2}, ${x}, ${y})`}
            >{ch}</Text>
            <Text
              x={x} y={y}
              fontSize="52"
              fontWeight="900"
              fill={FRUIT_COLORS[ch]}
              fontFamily="Arial Rounded MT Bold, Arial Black, sans-serif"
              transform={`rotate(${(FRUIT_CHARS.indexOf(FRUIT_CHARS.find(c=>c.ch===ch)) % 2 === 0) ? -2 : 2}, ${x}, ${y})`}
            >{ch}</Text>
          </G>
        ))}

        {/* BOX 글자들 */}
        {BOX_CHARS.map(({ ch, x, y }) => (
          <G key={ch}>
            <Text
              x={x} y={y}
              fontSize="48"
              fontWeight="900"
              fill="none"
              stroke={STROKE_COLORS[ch]}
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
              fontFamily="Arial Rounded MT Bold, Arial Black, sans-serif"
              transform={`rotate(${(BOX_CHARS.indexOf(BOX_CHARS.find(c=>c.ch===ch)) % 2 === 0) ? 2 : -2}, ${x}, ${y})`}
            >{ch}</Text>
            <Text
              x={x} y={y}
              fontSize="48"
              fontWeight="900"
              fill={FRUIT_COLORS[ch]}
              fontFamily="Arial Rounded MT Bold, Arial Black, sans-serif"
              transform={`rotate(${(BOX_CHARS.indexOf(BOX_CHARS.find(c=>c.ch===ch)) % 2 === 0) ? 2 : -2}, ${x}, ${y})`}
            >{ch}</Text>
          </G>
        ))}

      </Svg>
    </View>
  );
};

export default FruitBoxLogo;
