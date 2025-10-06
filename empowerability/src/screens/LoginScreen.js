import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen({ route, navigation }) {
  const role = route.params?.role || 'student';
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace with real auth + role routing logic
    if (role === 'student') navigation.replace('Student');
    else if (role === 'parent') navigation.replace('Parent');
    else if (role === 'faculty') navigation.replace('Faculty');
    else if (role === 'admin') navigation.replace('Admin');
    else if (role === 'ngo') navigation.replace('NGO');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.form}>
        <Text style={styles.h}>Sign in as {role.toUpperCase()}</Text>
        <TextInput style={styles.input} placeholder="Email or Phone" value={identifier} onChangeText={setIdentifier}/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>
        <TouchableOpacity onPress={() => {}}><Text style={{color:'#FF7A00', marginTop: 6}}>Forgot Password?</Text></TouchableOpacity>
        <PrimaryButton onPress={handleLogin} style={{ marginTop: 16 }}>Login</PrimaryButton>
        <TouchableOpacity onPress={() => navigation.navigate('RoleSelect')} style={{ marginTop: 12 }}>
          <Text style={{ color: '#666' }}>New here? Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F8' },
  form: { width: '92%', maxWidth: 520, backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  h: { fontSize: 18, color: '#FF7A00', fontWeight: '700', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 12, marginTop: 8 }
});
