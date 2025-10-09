import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function PrimaryButton({ children, onPress, style, outline }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[styles.btn, outline ? styles.outline : styles.filled, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, outline ? styles.outlineText : null]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 48,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    minWidth: 120,
  },
  filled: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  text: {
    color: colors.white,
    fontWeight: '700',
  },
  outlineText: {
    color: colors.primary,
  }
});
