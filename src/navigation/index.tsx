import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigation from './StackNavigation';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
