import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Game from './src/Game';

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
