import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function AIChatButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      accessibilityLabel="Open EmpowerBuddy"
    >
      <View style={styles.circle}>
        <Text style={styles.emoji}>💬</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    zIndex: 99,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  emoji: { fontSize: 24, color: colors.white }
});
