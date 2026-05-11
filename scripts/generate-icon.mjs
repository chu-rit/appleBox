import sharp from 'sharp';
import { writeFileSync } from 'fs';
import path from 'path';

const SIZE = 1024;
const PADDING = 160;
const APPLE_SIZE = SIZE - PADDING * 2;
const SCALE = APPLE_SIZE / 100; // viewBox is 0 0 100 100

// 시작화면의 iconBox 스타일: 흰 배경 + 둥근 모서리(borderRadius ~25%) + 사과 아이콘
const svg = `
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <!-- 배경: 따뜻한 크림색 -->
  <rect width="${SIZE}" height="${SIZE}" fill="#FFF8E7" rx="${SIZE * 0.22}" ry="${SIZE * 0.22}"/>

  <!-- 흰 카드 박스 (iconBox) -->
  <rect
    x="${PADDING * 0.7}" y="${PADDING * 0.7}"
    width="${SIZE - PADDING * 1.4}" height="${SIZE - PADDING * 1.4}"
    fill="#FFFFFF"
    rx="${SIZE * 0.13}" ry="${SIZE * 0.13}"
    filter="url(#shadow)"
  />

  <!-- 그림자 필터 -->
  <defs>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#FF8C42" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- 사과 아이콘 (AppleIcon SVG path, viewBox 0 0 100 100 → scale to APPLE_SIZE) -->
  <g transform="translate(${PADDING}, ${PADDING}) scale(${SCALE}) scale(1.1) translate(-5, -5)">
    <!-- Apple body -->
    <path
      d="M50 18 C30 18, 12 28, 12 52 C12 76, 28 90, 50 90 C72 90, 88 76, 88 52 C88 28, 70 18, 50 18 Z"
      fill="#FF4444"
      stroke="#CC0000"
      stroke-width="2"
    />
    <!-- Leaf -->
    <path
      d="M50 20 Q68 8, 78 14 Q72 24, 54 22 Z"
      fill="#7CB342"
    />
    <!-- Stem -->
    <path
      d="M50 18 Q50 10, 48 6"
      stroke="#5D4037"
      stroke-width="3"
      fill="none"
      stroke-linecap="round"
    />
  </g>
</svg>
`;

const svgBuffer = Buffer.from(svg);

// icon.png (1024x1024)
await sharp(svgBuffer)
  .png()
  .toFile(path.resolve('assets/icon.png'));
console.log('✅ assets/icon.png 생성 완료');

// adaptive-icon.png (1024x1024, 배경 없이 사과만)
const svgAdaptive = `
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${SIZE}" height="${SIZE}" fill="#FFF8E7"/>
  <g transform="translate(${PADDING}, ${PADDING}) scale(${SCALE}) scale(1.1) translate(-5, -5)">
    <path
      d="M50 18 C30 18, 12 28, 12 52 C12 76, 28 90, 50 90 C72 90, 88 76, 88 52 C88 28, 70 18, 50 18 Z"
      fill="#FF4444"
      stroke="#CC0000"
      stroke-width="2"
    />
    <path d="M50 20 Q68 8, 78 14 Q72 24, 54 22 Z" fill="#7CB342"/>
    <path d="M50 18 Q50 10, 48 6" stroke="#5D4037" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
</svg>
`;

await sharp(Buffer.from(svgAdaptive))
  .png()
  .toFile(path.resolve('assets/adaptive-icon.png'));
console.log('✅ assets/adaptive-icon.png 생성 완료');

// splash.png (2048x2048)
const splashSvg = `
<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="2048" fill="#FFF8E7"/>
  <g transform="translate(624, 524) scale(8) scale(1.1) translate(-5, -5)">
    <path
      d="M50 18 C30 18, 12 28, 12 52 C12 76, 28 90, 50 90 C72 90, 88 76, 88 52 C88 28, 70 18, 50 18 Z"
      fill="#FF4444"
      stroke="#CC0000"
      stroke-width="2"
    />
    <path d="M50 20 Q68 8, 78 14 Q72 24, 54 22 Z" fill="#7CB342"/>
    <path d="M50 18 Q50 10, 48 6" stroke="#5D4037" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
</svg>
`;

await sharp(Buffer.from(splashSvg))
  .png()
  .toFile(path.resolve('assets/splash.png'));
console.log('✅ assets/splash.png 생성 완료');
