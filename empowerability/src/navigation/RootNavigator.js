import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import LoginScreen from '../screens/LoginScreen';
import StudentDashboard from '../screens/StudentDashboard';
import ParentDashboard from '../screens/ParentDashboard';
import FacultyDashboard from '../screens/FacultyDashboard';
import AdminDashboard from '../screens/AdminDashboard';
import NGODashboard from '../screens/NGODashboard';
import ForumScreen from '../screens/ForumScreen';
import FeedScreen from '../screens/FeedScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Student" component={StudentDashboard} />
        <Stack.Screen name="Parent" component={ParentDashboard} />
        <Stack.Screen name="Faculty" component={FacultyDashboard} />
        <Stack.Screen name="Admin" component={AdminDashboard} />
        <Stack.Screen name="NGO" component={NGODashboard} />
        <Stack.Screen name="Forum" component={ForumScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
