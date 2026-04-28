import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import RankingScreen from './screens/RankingScreen';
import FruitBoxScreen from './screens/FruitBoxScreen';

export default function Game() {
  const [screen, setScreen] = useState('start'); // 'start', 'game', 'ranking', 'settings'
  const [running, setRunning] = useState(false);
  const animationRef = useRef(null);
  const [tick, setTick] = useState(0);
  const [mapSize, setMapSize] = useState(7); // 5~8 configurable
  const [gameMode, setGameMode] = useState('fruit'); // 'apple' or 'fruit'

  // Load saved mapSize on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedMapSize = await AsyncStorage.getItem('mapSize');
        if (savedMapSize !== null) {
          setMapSize(parseInt(savedMapSize, 10));
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    };
    loadSettings();
  }, []);

  // Save mapSize when changed
  useEffect(() => {
    const saveSettings = async () => {
      try {
        await AsyncStorage.setItem('mapSize', mapSize.toString());
      } catch (e) {
        console.error('Failed to save settings:', e);
      }
    };
    saveSettings();
  }, [mapSize]);

  // TODO: Add your game state refs here

  const startGame = () => {
    setScreen(gameMode === 'fruit' ? 'fruitbox' : 'game');
    reset();
    setRunning(true);
  };

  const goToRanking = () => {
    setScreen('ranking');
  };

  const goToSettings = () => {
    setScreen('settings');
  };

  const toggleGameMode = () => {
    setGameMode(prev => prev === 'apple' ? 'fruit' : 'apple');
  };

  const backToStart = () => {
    setRunning(false);
    setScreen('start');
  };

  const reset = () => {
    // TODO: Reset game state
  };

  const gameLoop = () => {
    if (!running) return;
    // TODO: Your game logic here
    setTick(t => t + 1);
    animationRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (running) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [running]);

  // Render screens
  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return (
          <StartScreen
            onStart={startGame}
            onRanking={goToRanking}
            onSettings={goToSettings}
            onLogoPress={toggleGameMode}
            gameMode={gameMode}
          />
        );
      case 'fruitbox':
        return (
          <FruitBoxScreen onBackToStart={backToStart} mapSize={mapSize} />
        );
      case 'game':
        return (
          <GameScreen onBackToStart={backToStart} mapSize={mapSize} />
        );
      case 'ranking':
        return (
          <RankingScreen onBack={backToStart} />
        );
      case 'settings':
        return (
          <SettingsScreen
            onBack={backToStart}
            mapSize={mapSize}
            onChangeMapSize={setMapSize}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
});
