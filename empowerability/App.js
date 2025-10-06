import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import colors from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <RootNavigator />
    </SafeAreaView>
  );
}
