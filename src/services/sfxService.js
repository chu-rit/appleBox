import { Audio } from 'expo-av';

const sfx = {
  start: null,
  trade: null,
};
let sfxEnabled = true;

export function setSFXEnabled(enabled) {
  sfxEnabled = enabled;
}

export async function preloadSFX() {
  try {
    const [s1, s2] = await Promise.all([
      Audio.Sound.createAsync(require('../assets/sound/start.wav'), { volume: 1.0 }),
      Audio.Sound.createAsync(require('../assets/sound/trade.wav'), { volume: 1.0 }),
    ]);
    sfx.start = s1.sound;
    sfx.trade = s2.sound;
  } catch (e) {
    console.log('[SFX] 프리로드 실패:', e);
  }
}

async function playSFX(key) {
  if (!sfxEnabled) return;
  try {
    const sound = sfx[key];
    if (!sound) return;
    await sound.setPositionAsync(0);
    await sound.playAsync();
  } catch (e) {}
}

export function playStartSFX() { playSFX('start'); }
export function playTradeSFX() { playSFX('trade'); }
