/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
// import React in our code
import React, {useState} from 'react';
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {QRScanner} from './QRScanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Scanner = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Please enter the admin password to unlock this feature.
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 48,
              fontWeight: '700',
              color: 'grey',
            }}>
            {' '}
            Password:{' '}
          </Text>
          <TextInput
            // style={styles.textInputStyle}
            onChangeText={password => setPassword(password)}
            placeholder="Enter password"
            secureTextEntry={secure}
            value={password}
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 0.5,
              height: 35,
              width: 260,
              marginVertical: 40,
              paddingLeft: 20,
              marginLeft: 10,
            }}
          />
          <Text
            onPress={() => {
              setSecure(!secure);
            }}
            style={{marginTop: 45, paddingRight: 20, color: 'grey'}}>
            👁️👁️
          </Text>
        </View>

        <TouchableHighlight
          onPress={() => {
            if (password === 'deeksha123') {
              AsyncStorage.setItem('password', password);
              console.log('Updating password: ', password);
              Alert.alert('You are now registered as admin');
              navigation.navigate('QRScanner');
            } else {
              Alert.alert(
                'Wrong Password',
                'Enter the correct password.                      If you do not know the password, contact HeadOffice.',
              );
            }
          }}
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    backgroundColor: '#FAB00C',
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#FAB00C',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 3,
    padding: 2,
    paddingHorizontal: 10,
    width: '45%',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '700',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
});
