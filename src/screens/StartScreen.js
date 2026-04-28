import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function StartScreen({ onStart, onSettings, onRanking, onLogoPress, gameMode = 'apple' }) {
  const isFruitMode = gameMode === 'fruit';
  
  return (
    <View style={[styles.container, isFruitMode && styles.containerFruit]}>
      {/* Background Pattern */}
      <View style={styles.background}>
        {/* Decorative fruits */}
        <View style={[styles.apple, styles.apple1]}>
          <View style={[styles.appleBody, isFruitMode && styles.fruitBody1]} />
          <View style={styles.appleLeaf} />
        </View>
        <View style={[styles.apple, styles.apple2]}>
          <View style={[styles.appleBody, isFruitMode && styles.fruitBody2]} />
          <View style={styles.appleLeaf} />
        </View>
        <View style={[styles.apple, styles.apple3]}>
          <View style={[styles.appleBody, isFruitMode && styles.fruitBody3]} />
          <View style={styles.appleLeaf} />
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <TouchableOpacity style={[styles.iconBox, isFruitMode && styles.iconBoxFruit]} onPress={onLogoPress} activeOpacity={0.7}>
          <View style={styles.iconApple}>
            <View style={[styles.iconBody, isFruitMode && styles.iconBodyFruit]} />
            <View style={styles.iconLeaf} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.title, isFruitMode && styles.titleFruit]}>{isFruitMode ? 'FRUIT BOX' : 'APPLE BOX'}</Text>
        <Text style={styles.subtitle}>{isFruitMode ? 'Mix & Match' : 'Collect & Stack'}</Text>
      </View>

      {/* Menu Buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={[styles.button, isFruitMode && styles.buttonFruit]} onPress={onStart}>
          <Text style={[styles.buttonText, isFruitMode && styles.buttonTextFruit]}>START GAME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonSecondary, isFruitMode && styles.buttonSecondaryFruit]} onPress={onRanking}>
          <Text style={[styles.buttonSecondaryText, isFruitMode && styles.buttonSecondaryTextFruit]}>RANKING</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonSecondary, isFruitMode && styles.buttonSecondaryFruit]} onPress={onSettings}>
          <Text style={[styles.buttonSecondaryText, isFruitMode && styles.buttonSecondaryTextFruit]}>SETTINGS</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7', // Cream background
  },
  containerFruit: {
    backgroundColor: '#FFF5E6', // Orange-tinted cream
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Decorative Apples
  apple: {
    position: 'absolute',
    width: 60,
    height: 70,
    opacity: 0.15,
  },
  apple1: {
    top: height * 0.1,
    left: width * 0.1,
    transform: [{ rotate: '-15deg' }],
  },
  apple2: {
    top: height * 0.3,
    right: width * 0.05,
    transform: [{ rotate: '20deg' }],
  },
  apple3: {
    bottom: height * 0.2,
    left: width * 0.15,
    transform: [{ rotate: '10deg' }],
  },
  appleBody: {
    width: 50,
    height: 55,
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
  },
  fruitBody1: {
    backgroundColor: '#FFB347', // Orange
  },
  fruitBody2: {
    backgroundColor: '#9ED2C6', // Green
  },
  fruitBody3: {
    backgroundColor: '#DDA0DD', // Plum
  },
  appleLeaf: {
    position: 'absolute',
    top: -8,
    left: 15,
    width: 20,
    height: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    transform: [{ rotate: '-30deg' }],
  },
  // Title Section
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.1,
  },
  iconBox: {
    width: 120,
    height: 120,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconBoxFruit: {
    shadowColor: '#FF8C42',
    shadowOpacity: 0.2,
  },
  iconApple: {
    width: 70,
    height: 80,
  },
  iconBody: {
    width: 60,
    height: 65,
    backgroundColor: '#FF4444',
    borderRadius: 30,
    alignSelf: 'center',
  },
  iconBodyFruit: {
    backgroundColor: '#FF8C42', // Orange for fruit mode
  },
  iconLeaf: {
    position: 'absolute',
    top: -5,
    left: 20,
    width: 25,
    height: 18,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    transform: [{ rotate: '-25deg' }],
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FF4444',
    letterSpacing: 4,
    marginBottom: 8,
  },
  titleFruit: {
    color: '#FF8C42', // Orange for fruit mode
  },
  subtitle: {
    fontSize: 16,
    color: '#8B7355',
    letterSpacing: 2,
  },
  // Menu
  menuContainer: {
    paddingHorizontal: 40,
    paddingBottom: height * 0.15,
    gap: 15,
  },
  button: {
    backgroundColor: '#FF4444',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonFruit: {
    backgroundColor: '#FF8C42',
    shadowColor: '#FF8C42',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  buttonTextFruit: {
    color: '#FFF',
  },
  buttonSecondary: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 15,
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
    fontWeight: '600',
    letterSpacing: 1,
  },
  buttonSecondaryTextFruit: {
    color: '#FF8C42',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#8B7355',
    opacity: 0.6,
  },
});
