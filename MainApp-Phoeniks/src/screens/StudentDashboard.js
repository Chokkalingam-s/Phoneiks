import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../components/Card';
import AIChatButton from '../components/AIChatButton';
import colors from '../constants/colors';

export default function StudentDashboard({ navigation }) {
  // Dummy UDID data; replace with fetch from backend
  const udid = 'UDID-123456789';
  const disability = 'Visual Impairment';

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGrey }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Card>
          <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
            <View>
              <Text style={{ color: colors.primary, fontWeight:'700' }}>Welcome, Student</Text>
              <Text>UDID: {udid}</Text>
              <Text>Disability: {disability}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={{ color: colors.primary }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Text style={{ marginTop: 12, color: colors.muted }}>My Schemes</Text>
        <Card>
          <Text style={{ fontWeight:'700' }}>National Scholarship 2025</Text>
          <Text style={{ marginTop: 6 }}>Open for applicants. Ends in 20 days.</Text>
          <TouchableOpacity style={{ marginTop: 10, backgroundColor: colors.primary, padding: 10, borderRadius: 12, alignSelf:'flex-start' }}>
            <Text style={{ color: '#fff' }}>Apply</Text>
          </TouchableOpacity>
        </Card>

        <Text style={{ marginTop: 12, color: colors.muted }}>AI Suggested Jobs</Text>
        <Card><Text>Accessible Data Entry - Remote (AI suggested)</Text></Card>
      </ScrollView>

      <AIChatButton onPress={() => alert('Open EmpowerBuddy chat (wire this)')} />
    </View>
  );
}
