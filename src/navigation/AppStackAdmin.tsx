import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {QRScanner} from '../screens/QRScanner';
import Scanner from '../screens/Scanner';
import Generator from '../screens/Generator';
import Login from '../screens/Login';
import QRCodeScreen from '../screens/QRCodeScreen';

const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="Generator" component={Generator} />
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
