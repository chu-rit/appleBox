import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function StartScreen({ onStart, onSettings, onRanking }) {
  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.background}>
        {/* Decorative apples */}
        <View style={[styles.apple, styles.apple1]}>
          <View style={styles.appleBody} />
          <View style={styles.appleLeaf} />
        </View>
        <View style={[styles.apple, styles.apple2]}>
          <View style={styles.appleBody} />
          <View style={styles.appleLeaf} />
        </View>
        <View style={[styles.apple, styles.apple3]}>
          <View style={styles.appleBody} />
          <View style={styles.appleLeaf} />
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <View style={styles.iconBox}>
          <View style={styles.iconApple}>
            <View style={styles.iconBody} />
            <View style={styles.iconLeaf} />
          </View>
        </View>
        <Text style={styles.title}>APPLE BOX</Text>
        <Text style={styles.subtitle}>Collect & Stack</Text>
      </View>

      {/* Menu Buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>START GAME</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={onRanking}>
          <Text style={styles.buttonSecondaryText}>RANKING</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={onSettings}>
          <Text style={styles.buttonSecondaryText}>SETTINGS</Text>
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
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  buttonSecondary: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  buttonSecondaryText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
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
