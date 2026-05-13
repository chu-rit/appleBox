import React from 'react';
import { View, StyleSheet } from 'react-native';

const FruitBlock = ({
  size = 60,
  selected = false,
  style,
  blockFill = '#FFB347',
  blockStroke = '#FF8C42',
}) => {
  return (
    <View
      style={[
        styles.block,
        {
          width: size - 4,
          height: size - 4,
          backgroundColor: blockFill,
          borderColor: selected ? '#FFD700' : blockStroke,
          borderWidth: selected ? 3 : 2,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    borderRadius: 10,
  },
});

export default React.memo(FruitBlock);
