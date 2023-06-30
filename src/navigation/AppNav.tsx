import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStackAdmin from './AppStackAdmin';
import {AuthContext} from '../context/AuthContext';
import AppStackUser from './AppStackUser';
const AppNav = () => {
  const {password} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {password !== '' ? (
        password === 'deeksha123' ? (
          <AppStackAdmin />
        ) : (
          <AppStackUser />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNav;
