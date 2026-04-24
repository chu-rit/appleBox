import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import RankingScreen from './screens/RankingScreen';

export default function Game() {
  const [screen, setScreen] = useState('start'); // 'start', 'game', 'ranking', 'settings'
  const [running, setRunning] = useState(false);
  const animationRef = useRef(null);
  const [tick, setTick] = useState(0);
  const [mapSize, setMapSize] = useState(7); // 5~8 configurable

  // TODO: Add your game state refs here

  const startGame = () => {
    setScreen('game');
    reset();
    setRunning(true);
  };

  const goToRanking = () => {
    setScreen('ranking');
  };

  const goToSettings = () => {
    setScreen('settings');
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
          />
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
