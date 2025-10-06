import React from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';

const FEED = [
  { id: '1', title: 'National Scholarship 2025', source: 'Govt', date: '2025-08-01' },
  { id: '2', title: 'Skill Program for Hearing Impaired', source: 'NGO', date: '2025-07-19' }
];

export default function FeedScreen() {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.lightGrey }}>
      <TextInput placeholder="Search by category / disability / age" style={{ backgroundColor: '#fff', padding: 12, borderRadius: 8 }} />
      <Text style={{ marginTop: 12, color: colors.muted }}>Filters: Scholarships, Jobs, Skill Programs</Text>

      <FlatList
        data={FEED}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontWeight: '700' }}>{item.title}</Text>
            <Text style={{ marginTop: 6 }}>{item.source} • {item.date}</Text>
            <View style={{ marginTop: 10 }}><Text style={{ color: colors.primary }}>Apply</Text></View>
          </Card>
        )}
      />
    </View>
  );
}
 