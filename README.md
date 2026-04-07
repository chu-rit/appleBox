# Cross-Platform Game (React Native + Expo)

웹, iOS, Android 모두 지원하는 React Native 기반 게임 프로젝트입니다.

## 📋 사전 요구사항

- Node.js 18+ 
- npm 또는 yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

## 📱 플랫폼별 실행

### 웹
```bash
npm run web
```

### iOS (Mac + Xcode 필요)
```bash
npm run ios
```

### Android (Android Studio 필요)
```bash
npm run android
```

## 🎮 게임 설명

- **점프 게임**: 장애물을 피해 생존하세요
- **조작**: 화면 탭/클릭으로 점프
- **목표**: 최대한 오래 생존해서 높은 점수 획득

## 📁 프로젝트 구조

```
├── App.js                 # 메인 진입점
├── src/
│   ├── Game.js           # 게임 로직
│   ├── entities.js       # 게임 엔티티 정의
│   ├── components/
│   │   ├── Player.js     # 플레이어 컴포넌트
│   │   ├── Obstacle.js   # 장애물 컴포넌트
│   │   └── GameOverlay.js # UI 오버레이
│   └── systems/
│       ├── MoveSystem.js    # 이동 시스템
│       ├── CollisionSystem.js # 충돌 감지
│       └── index.js         # 시스템 통합
├── assets/               # 이미지, 아이콘 등
├── app.json             # Expo 설정
└── package.json         # 의존성
```

## 🛠️ 기술 스택

- **React Native** - 크로스 플랫폼 UI
- **Expo** - 개발 환경 및 빌드
- **react-native-game-engine** - 게임 루프 및 ECS 패턴
- **react-native-web** - 웹 빌드 지원

## 📦 빌드 및 배포

### 웹 빌드
```bash
npm run build:web
```

### 모바일 빌드 (Expo EAS)
```bash
# EAS CLI 설치
npm install -g eas-cli

# iOS 빌드
eas build --platform ios

# Android 빌드
eas build --platform android
```

## 📝 커스터마이징

1. **게임 로직 수정**: `src/systems/` 폴더의 시스템 파일들 수정
2. **새 엔티티 추가**: `src/entities.js`에 정의하고 컴포넌트 생성
3. **스타일 변경**: 각 컴포넌트의 StyleSheet 수정
4. **새 레벨/스테이지**: `src/Game.js`의 상태 관리 확장

## 📄 라이선스

MIT
