import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Card from '../components/Card';
import colors from '../constants/colors';

const THREADS = [
  { id: '1', title: 'Braille-Science Curriculum', replies: 10 },
  { id: '2', title: 'Inclusive STEM Projects', replies: 6 }
];

export default function ForumScreen() {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.lightGrey }}>
      <Text style={{ color: colors.primary, fontWeight: '700', marginBottom: 12 }}>Forum</Text>
      <FlatList
        data={THREADS}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Card><Text style={{ fontWeight: '700' }}>{item.title}</Text><Text>{item.replies} replies</Text></Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
