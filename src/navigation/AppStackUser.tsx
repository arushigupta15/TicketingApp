import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QRCodeScreen from '../screens/QRCodeScreen';
import Login from '../screens/Login';
import Generator from '../screens/Generator';
import Scanner from '../screens/Scanner';
import {QRScanner} from '../screens/QRScanner';

const AppStackUser = () => {
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

export default AppStackUser;
