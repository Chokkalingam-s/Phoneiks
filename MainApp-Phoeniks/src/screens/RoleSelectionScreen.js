import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import RoleCard from '../components/RoleCard';

export default function RoleSelectionScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.h}>Select Your Role to Continue</Text>
      <RoleCard title="Student / Specially-Abled Person" subtitle="Access UDID & Schemes" onPress={() => navigation.navigate('Login', { role: 'student' })}/>
      <RoleCard title="Parent / Guardian" subtitle="Track progress & schedules" onPress={() => navigation.navigate('Login', { role: 'parent' })}/>
      <RoleCard title="Institution / Faculty" subtitle="Manage students & forum" onPress={() => navigation.navigate('Login', { role: 'faculty' })}/>
      <RoleCard title="Government / Admin" subtitle="Scheme & geo management" onPress={() => navigation.navigate('Login', { role: 'admin' })}/>
      <RoleCard title="NGO Partner" subtitle="Partner programs & events" onPress={() => navigation.navigate('Login', { role: 'ngo' })}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  h: { fontSize: 20, color: '#FF7A00', fontWeight: '700', marginBottom: 12 }
});
