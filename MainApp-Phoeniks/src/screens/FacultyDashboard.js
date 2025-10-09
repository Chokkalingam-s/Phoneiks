import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';

export default function FacultyDashboard({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: colors.lightGrey }}>
      <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Faculty Dashboard</Text>
      <Card>
        <Text style={{ fontWeight: '700' }}>Enrolled Special Students</Text>
        <Text>UDID verified: 42 | Pending: 5</Text>
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('Forum')} style={{ marginTop: 14 }}>
        <Card>
          <Text style={{ fontWeight: '700' }}>Open Faculty Forum</Text>
          <Text>Collaborate on teaching resources</Text>
        </Card>
      </TouchableOpacity>

      <Card>
        <Text style={{ fontWeight: '700' }}>Accessibility Audit</Text>
        <Text>- Ramps: Yes</Text>
        <Text>- Sign Language Staff: Partial</Text>
      </Card>
    </ScrollView>
  );
}
