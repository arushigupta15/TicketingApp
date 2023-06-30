/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Scanner from './Scanner';
import {QRScanner} from './QRScanner';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Login = () => {
  const [empId, setEmpId] = useState('');
  const navigation = useNavigation();
  const register = () => {
    navigation.navigate('Generator' as never);
  };
  const {password} = useContext(AuthContext);

  const fetchQRDetails = async (empId: any) => {
    //Code to fetch QR Data
    let json: any = {};
    try {
      let url =
        'http://rejuvenate.deekshalearning.com:8080/deeksha-event-api/user?id=' +
        empId;
      const response = await fetch(url);

      console.log('m got resp');
      json = await response.json();
      if (json.status == 200) {
        console.log(json.stringify);
        ToastAndroid.show('Login Successful', 3000);
        navigation.navigate('QRCodeScreen', {paramKey: JSON.stringify(json)});
      } else {
        ToastAndroid.show(json.error, 3000);
      }
    } catch (error) {
      //ToastAndroid.show(error., 3000);
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Image
          source={require('../assets/cropped-Deeksha-Logo.png')}
          style={{width: '50%', height: 59}}
        />
        <Text
          style={{
            fontSize: 27,
            fontWeight: '700',
            alignSelf: 'center',
            textAlign: 'center',
            color: '#FA8015',
            padding: 20,
          }}>
          Welcome to Rejuvenate '25
        </Text>
        <Text style={styles.titleStyle}>Register here for Rejuvenate '25:</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => register()}>
          <Text style={styles.buttonTextStyle}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.titleStyle}>
          If you have already registered, access your QR Pass here:
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginLeft: 10,
          }}>
          <Text style={{marginTop: 10, fontWeight: '700', color: 'grey'}}>
            Emp ID:
          </Text>
          <TextInput
            maxLength={11}
            // style={styles.textInputStyle}
            onChangeText={empId => setEmpId(empId)}
            placeholder="Enter your Employee ID"
            value={empId}
            style={{
              borderBottomColor: 'grey',
              borderRadius: 5,
              borderBottomWidth: 0.5,
              height: 35,
              width: 260,
              paddingLeft: 40,
              paddingVertical: 0,
              textAlign: 'left',
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => fetchQRDetails(empId)}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text
        onPress={() => {
          console.log('On openin login screen: ', password);
          if (password === 'deeksha123') {
            navigation.navigate('QRScanner');
          } else {
            navigation.navigate('Scanner');
          }
        }}
        style={styles.textStyle}>
        Login as Admin
      </Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    fontWeight: '500',
    color: 'grey',
    marginTop: 30,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
    fontWeight: '700',
    color: '#FAB00C',
    padding: 10,
    fontSize: 16,
  },
  textInputStyle: {
    flexDirection: 'row',
    marginLeft: 35,
    marginRight: 35,
  },
  buttonStyle: {
    backgroundColor: '#FAB00C',
    borderWidth: 1,
    color: '#FFFFFF',
    borderColor: '#FAB00C',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
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
});
