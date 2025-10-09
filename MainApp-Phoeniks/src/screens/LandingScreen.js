import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../constants/colors';

export default function LandingScreen({ navigation }) {
  return (
    <ScrollView style={styles.outer} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.nav}>
        <Image source={require('../../assets/logo.png')} style={{ width: 36, height: 36 }} />
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Text style={styles.menu}>About</Text>
          <Text style={styles.menu}>Features</Text>
          <Text style={styles.menu}>Contact</Text>
        </View>
        <PrimaryButton onPress={() => navigation.navigate('RoleSelect')}>Login</PrimaryButton>
      </View>

      <View style={styles.hero}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Inclusive Digital Ecosystem for the Differently-Abled</Text>
          <Text style={styles.subtitle}>From UDID registration to lifelong empowerment.</Text>
          <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
            <PrimaryButton onPress={() => navigation.navigate('RoleSelect')}>Get Started</PrimaryButton>
            <PrimaryButton outline onPress={() => {}}>Learn More</PrimaryButton>
          </View>
        </View>
        <Image source={require('../../assets/illustrations/people.png')} style={styles.illus} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: colors.primary, fontWeight: '700', marginBottom: 8 }}>Features</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.featureCard}><Text style={{fontWeight:'700'}}>AI UDID Assistant</Text></View>
          <View style={styles.featureCard}><Text style={{fontWeight:'700'}}>Scholarship & Job Feed</Text></View>
          <View style={styles.featureCard}><Text style={{fontWeight:'700'}}>Faculty Collaboration</Text></View>
          <View style={styles.featureCard}><Text style={{fontWeight:'700'}}>Accessible Dashboards</Text></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outer: { backgroundColor: colors.lightGrey },
  nav: { flexDirection: 'row', alignItems:'center', justifyContent:'space-between', marginBottom: 24 },
  menu: { color: colors.muted, marginHorizontal: 6 },
  hero: { backgroundColor: colors.white, borderRadius: 14, padding: 18, flexDirection: 'row', alignItems: 'center' },
  title: { color: colors.primary, fontSize: 22, fontWeight: '700' },
  subtitle: { color: colors.text, marginTop: 8 },
  illus: { width: 140, height: 120, resizeMode: 'contain' },
  featureCard: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    width: 160,
    marginRight: 8,
    elevation: 2
  }
});
