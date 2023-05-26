import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../ui/screens/HomeScreen';
import AsteroidDetailsScreen from '../ui/screens/AsteroidDetailsScreen';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();
const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="AsteroidDetailsScreen"
        component={AsteroidDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
