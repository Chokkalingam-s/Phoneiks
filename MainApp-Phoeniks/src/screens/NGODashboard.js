import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';

export default function NGODashboard() {
  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: colors.lightGrey }}>
      <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>NGO Partner</Text>
      <Card>
        <Text style={{ fontWeight: '700' }}>Partner Programs</Text>
        <Text>Post events, manage beneficiaries</Text>
      </Card>
    </ScrollView>
  );
}
