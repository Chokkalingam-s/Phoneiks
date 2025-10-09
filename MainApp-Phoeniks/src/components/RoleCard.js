import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function RoleCard({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrap}>
      <View style={styles.iconCircle} accessibilityHidden>
        <Text style={{ color: colors.primary }}>{title[0]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4CC',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { color: colors.primary, fontWeight: '700', fontSize: 16 },
  sub: { color: colors.muted, marginTop: 4, fontSize: 13 }
});
