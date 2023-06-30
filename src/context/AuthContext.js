/* eslint-disable no-shadow */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext} from 'react';
import {useState, useEffect} from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [password, setPassword] = useState('');

  const loginAsAdmin = async () => {
    let password = await AsyncStorage.getItem('password');
    setPassword(password);
  };

  useEffect(() => {
    loginAsAdmin();
  }, []);
  return (
    <AuthContext.Provider value={{loginAsAdmin, password}}>
      {children}
    </AuthContext.Provider>
  );
};
