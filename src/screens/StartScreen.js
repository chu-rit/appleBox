import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppleIcon from '../assets/icons/AppleIcon';
import OrangeIcon from '../assets/icons/OrangeIcon';
import GrapeIcon from '../assets/icons/GrapeIcon';
import StrawberryIcon from '../assets/icons/StrawberryIcon';
import PearIcon from '../assets/icons/PearIcon';
import WatermelonIcon from '../assets/icons/WatermelonIcon';
import PeachIcon from '../assets/icons/PeachIcon';
import PineappleIcon from '../assets/icons/PineappleIcon';
import FruitBoxLogo from '../assets/icons/FruitBoxLogo';

const { width, height } = Dimensions.get('window');

const BG_FRUITS = [
  { Icon: AppleIcon,       size: 55, top: height*0.04,  left: width*0.05,  rotate: '-15deg', opacity: 0.18 },
  { Icon: OrangeIcon,      size: 48, top: height*0.07,  right: width*0.06, rotate: '20deg',  opacity: 0.18 },
  { Icon: GrapeIcon,       size: 52, top: height*0.17,  left: width*0.72,  rotate: '-8deg',  opacity: 0.15 },
  { Icon: StrawberryIcon,  size: 44, top: height*0.25,  left: width*0.03,  rotate: '12deg',  opacity: 0.18 },
  { Icon: PearIcon,        size: 50, top: height*0.38,  right: width*0.04, rotate: '-20deg', opacity: 0.15 },
  { Icon: WatermelonIcon,  size: 60, top: height*0.55,  left: width*0.05,  rotate: '8deg',   opacity: 0.15 },
  { Icon: PeachIcon,       size: 46, top: height*0.62,  right: width*0.07, rotate: '15deg',  opacity: 0.18 },
  { Icon: PineappleIcon,   size: 56, top: height*0.72,  left: width*0.68,  rotate: '-10deg', opacity: 0.13 },
  { Icon: AppleIcon,       size: 42, top: height*0.80,  left: width*0.07,  rotate: '25deg',  opacity: 0.13 },
  { Icon: OrangeIcon,      size: 50, top: height*0.85,  right: width*0.10, rotate: '-5deg',  opacity: 0.15 },
];

export default function StartScreen({ onStart, onSettings, onRanking, onLogoPress, gameMode = 'apple' }) {
  const isFruitMode = gameMode === 'fruit';

  return (
    <View style={[styles.container, isFruitMode && styles.containerFruit]}>

      {/* Background fruit icons */}
      {BG_FRUITS.map(({ Icon, size, top, left, right, rotate, opacity }, i) => (
        <View
          key={i}
          pointerEvents="none"
          style={[styles.bgFruit, { top, left, right, opacity, transform: [{ rotate }] }]}
        >
          <Icon size={size} />
        </View>
      ))}

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <TouchableOpacity style={styles.iconBox} onPress={onLogoPress} activeOpacity={0.8}>
          <AppleIcon size={72} />
        </TouchableOpacity>
        <FruitBoxLogo width={280} isFruitMode={isFruitMode} />
        <Text style={styles.subtitle}>{isFruitMode ? 'Mix & Match' : 'Collect & Stack'}</Text>
        <View style={styles.fruitRow}>
          <OrangeIcon size={28} />
          <GrapeIcon size={28} />
          <StrawberryIcon size={28} />
          <PearIcon size={28} />
          <WatermelonIcon size={28} />
        </View>
      </View>

      {/* Menu Buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={[styles.button, isFruitMode && styles.buttonFruit]} onPress={onStart}>
          <Text style={styles.buttonText}>▶  START GAME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonSecondary, isFruitMode && styles.buttonSecondaryFruit]} onPress={onRanking}>
          <Text style={[styles.buttonSecondaryText, isFruitMode && styles.buttonSecondaryTextFruit]}>🏆  RANKING</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonSecondary, isFruitMode && styles.buttonSecondaryFruit]} onPress={onSettings}>
          <Text style={[styles.buttonSecondaryText, isFruitMode && styles.buttonSecondaryTextFruit]}>⚙  SETTINGS</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>v1.1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  containerFruit: {
    backgroundColor: '#FFF5E6',
  },
  bgFruit: {
    position: 'absolute',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.08,
  },
  iconBox: {
    width: 110,
    height: 110,
    backgroundColor: '#FFF',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#FF8C42',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#8B7355',
    letterSpacing: 2,
    marginBottom: 14,
  },
  fruitRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    opacity: 0.75,
  },
  menuContainer: {
    paddingHorizontal: 40,
    paddingBottom: height * 0.13,
    gap: 14,
  },
  button: {
    backgroundColor: '#FF4444',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonFruit: {
    backgroundColor: '#FF8C42',
    shadowColor: '#FF8C42',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  buttonSecondary: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  buttonSecondaryFruit: {
    borderColor: '#FF8C42',
  },
  buttonSecondaryText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  buttonSecondaryTextFruit: {
    color: '#FF8C42',
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#8B7355',
    opacity: 0.5,
  },
});
