import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DisplayPage from '../screens/DisplayPage';
import PostList from '../screens/PostList';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();
const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PostList" component={PostList} />
      <Stack.Screen name="DisplayPage" component={DisplayPage} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
