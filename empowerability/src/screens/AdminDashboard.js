import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';

export default function AdminDashboard({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: colors.lightGrey }}>
      <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>Admin Panel</Text>

      <Card>
        <Text style={{ fontWeight: '700' }}>Overview</Text>
        <Text>Total Users: 2,000,000</Text>
        <Text>UDIDs issued: 1,600,000</Text>
      </Card>

      <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
        <Card><Text style={{ fontWeight: '700' }}>Scheme Management</Text></Card>
      </TouchableOpacity>

      <Card>
        <Text style={{ fontWeight: '700' }}>Geo Awareness</Text>
        <Text>India heatmap (open region reports)</Text>
      </Card>
    </ScrollView>
  );
}
