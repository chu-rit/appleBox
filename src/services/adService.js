import { Platform } from 'react-native';

// 플랫폼별 조건부 import
let RewardedAd, RewardedAdEventType, TestIds;

if (Platform.OS !== 'web') {
  const ads = require('react-native-google-mobile-ads');
  RewardedAd = ads.RewardedAd;
  RewardedAdEventType = ads.RewardedAdEventType;
  TestIds = ads.TestIds;
}

// 테스트용 광고 단위 ID
const REWARDED_AD_UNIT_ID = Platform.OS !== 'web' ? Platform.select({
  android: TestIds.REWARDED,
  ios: TestIds.REWARDED,
}) : null;

let rewardedAd = null;
let isAdLoaded = false;
let isAdLoading = false;

export const loadRewardedAd = () => {
  if (Platform.OS === 'web') {
    // 웹에서는 광고 로드 안 함
    return Promise.resolve({ success: true, skipped: true });
  }

  return new Promise((resolve) => {
    if (isAdLoaded || isAdLoading) {
      resolve({ success: isAdLoaded, skipped: false });
      return;
    }

    isAdLoading = true;
    rewardedAd = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribe = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      isAdLoaded = true;
      isAdLoading = false;
      unsubscribe();
      resolve({ success: true, skipped: false });
    });

    rewardedAd.addAdEventListener(RewardedAdEventType.FAILED_TO_LOAD, () => {
      isAdLoaded = false;
      isAdLoading = false;
      unsubscribe();
      resolve({ success: false, skipped: false });
    });

    rewardedAd.load();
  });
};

export const showRewardedAd = () => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web') {
      // 웹에서는 광고 스킵
      resolve({ success: true, skipped: true });
      return;
    }

    if (!isAdLoaded) {
      resolve({ success: false, skipped: false });
      return;
    }

    const unsubscribe = rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
      unsubscribe();
      resolve({ success: true, skipped: false });
    });

    rewardedAd.addAdEventListener(RewardedAdEventType.CLOSED, () => {
      isAdLoaded = false;
      unsubscribe();
      resolve({ success: true, skipped: false });
    });

    rewardedAd.show();
  });
};

export const showRewardedAdOrSkip = async () => {
  if (Platform.OS === 'web') {
    // 웹에서는 바로 스킵
    return { success: true, skipped: true };
  }

  // 네이티브에서는 광고 표시 시도
  await loadRewardedAd();
  return await showRewardedAd();
};
