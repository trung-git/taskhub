import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ direction = 'horizontal', color = 'gray', width = 1, height }) => {
  const dividerStyle = {
    backgroundColor: color,
    width: direction === 'horizontal' ? '100%' : width,
    height: direction === 'horizontal' ? height : '100%',
  };

  return <View style={[styles.divider, dividerStyle]} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: 'gray',
  },
});

export default Divider;