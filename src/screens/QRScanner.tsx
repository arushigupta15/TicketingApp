/* eslint-disable react-native/no-inline-styles */

import React, {useContext, useState, useEffect} from 'react';

import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import Login from './Login';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const QRScanner = () => {
  const [str, setStr] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.setItem('password', 'deeksha123');
  }, []);
  // let scanner:any;
  const updateEntryScanNext = () => {
    //update entry to database
    //reactivate scanner
    //update number of attendees
  };
  const onSuccess = (e: BarCodeReadEvent) => {
    const qrdata = JSON.parse(e.data);
    const name: string = qrdata.name;
    const empId: string = qrdata.empId;
    const campus: string = qrdata.campus;
    const phoneNumber: string = qrdata.phoneNumber;
    const print: string = 'Name: ' + name + empId + campus + phoneNumber;
    ToastAndroid.show(print, 3000);
    setStr(e.data);
  };
  return (
    <QRCodeScanner
      showMarker={true}
      reactivate={true}
      reactivateTimeout={2000}
      onRead={data => onSuccess(data)}
      cameraStyle={{
        width: 300,
        height: 400,
        alignSelf: 'center',
        borderColor: '#000000',
        borderWidth: 5,
      }}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={
        <View>
          <Text style={styles.centerText}>Scan QR Passes to allow Entry</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.reload}>
              <Text style={styles.buttonText}>Reload</Text>
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  marginBottom: 50,
                  fontSize: 16,
                  color: 'grey',
                  textAlign: 'left',
                }}>
                {'\n'}Number of registrations: {'\n\n'}
                Number of attendees:
              </Text>
            </View>
          </View>
        </View>
      }
      bottomContent={
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text
                style={styles.buttonText}
                onPress={() => updateEntryScanNext()}>
                Download Registration Data
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text
                style={styles.buttonText}
                onPress={() => updateEntryScanNext()}>
                Download Attendee Data
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.textStyle}>
            Logout
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  reload:{
    verticalAlign: 'center',
    margin: 20,
    padding: 10,
    borderColor: '#F9B50A',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#F9B50A',
    width: 80,
    height: 60,
  },
  centerText: {
    flex: 1,
    fontSize: 24,
    marginTop: 20,
    color: '#000',
    fontWeight: '700',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  buttonTouchable: {
    margin: 20,
    padding: 10,
    borderColor: '#F9B50A',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: '#F9B50A',
    width: 120,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
    fontWeight: '700',
    color: '#FAB00C',
    padding: 10,
    fontSize: 16,
  },
});

AppRegistry.registerComponent('default', () => QRScanner);
