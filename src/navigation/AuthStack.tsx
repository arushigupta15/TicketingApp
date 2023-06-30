import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QRCodeScreen from '../screens/QRCodeScreen';
import Generator from '../screens/Generator';
import Scanner from '../screens/Scanner';
import Login from '../screens/Login';
import {QRScanner} from '../screens/QRScanner';

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Generator" component={Generator} />
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
    </Stack.Navigator>
  );
};

export default AuthStack;
