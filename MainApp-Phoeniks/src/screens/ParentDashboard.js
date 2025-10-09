import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';

export default function ParentDashboard() {
  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: colors.lightGrey }}>
      <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Welcome, Parent</Text>

      <Card>
        <Text style={{ fontWeight: '700' }}>Linked Child: Aarav</Text>
        <Text>UDID: UDID-987654321</Text>
        <Text>Disability: Hearing Impairment</Text>
      </Card>

      <Card>
        <Text style={{ fontWeight: '700' }}>Track Progress</Text>
        <Text>Therapy: Weekly — Next: Sep 18, 2025</Text>
      </Card>

      <Card>
        <Text style={{ fontWeight: '700' }}>Recommended Schemes</Text>
        <Text>- Special Education Allowance</Text>
      </Card>
    </ScrollView>
  );
}
