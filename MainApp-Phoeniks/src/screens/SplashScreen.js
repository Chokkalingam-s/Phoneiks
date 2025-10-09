import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Landing'), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.tag}>Empowering Every Ability</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center'
  },
  logo: { width: 120, height: 120, marginBottom: 16, resizeMode: 'contain' },
  tag: { color: colors.primary, fontWeight: '700', fontSize: 18 }
});
