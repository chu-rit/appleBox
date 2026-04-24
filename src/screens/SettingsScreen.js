import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SettingsScreen({ onBack, mapSize, onChangeMapSize }) {
  const mapSizes = [5, 6, 7, 8];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SETTINGS</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Map Size Setting */}
      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>MAP SIZE</Text>
        <Text style={styles.settingDescription}>
          Select grid size for the game board
        </Text>
        
        <View style={styles.sizeOptions}>
          {mapSizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                mapSize === size && styles.sizeButtonActive,
              ]}
              onPress={() => onChangeMapSize(size)}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  mapSize === size && styles.sizeButtonTextActive,
                ]}
              >
                {size} × {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preview */}
        <View style={styles.previewContainer}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <View style={styles.previewGrid}>
            {Array(mapSize).fill(null).map((_, row) => (
              <View key={row} style={styles.previewRow}>
                {Array(mapSize).fill(null).map((_, col) => (
                  <View key={col} style={styles.previewCell} />
                ))}
              </View>
            ))}
          </View>
        </View>
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
    backgroundColor: '#FFF8E7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FF4444',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF4444',
    letterSpacing: 2,
  },
  placeholder: {
    width: 40,
  },
  settingCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8B7355',
    letterSpacing: 1,
    marginBottom: 8,
  },
  settingDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sizeButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 14,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sizeButtonActive: {
    backgroundColor: '#FF4444',
    borderColor: '#FF4444',
  },
  sizeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  sizeButtonTextActive: {
    color: '#FFF',
  },
  previewContainer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  previewLabel: {
    fontSize: 14,
    color: '#8B7355',
    marginBottom: 12,
  },
  previewGrid: {
    backgroundColor: '#FFF8E7',
    padding: 8,
    borderRadius: 8,
  },
  previewRow: {
    flexDirection: 'row',
  },
  previewCell: {
    width: 16,
    height: 16,
    backgroundColor: '#FF6B6B',
    margin: 2,
    borderRadius: 4,
  },
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
