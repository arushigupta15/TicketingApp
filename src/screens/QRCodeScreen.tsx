/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  View,
  Text,
  Share,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {RefreshControl} from 'react-native-gesture-handler';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
const QRCodeScreen = ({route}) => {
  let myQRCode = useRef();
  let qrvalue = route.params.paramKey;
  console.log(qrvalue);

  // useEffect(() => {
  //   qrvalue = route.params.paramKey;
  // }, []);
  //const time = '9:30 am';
  //const date = '1st April, 2023';
  //const venue = 'Prestige Srihari Khoday Centre for Performing Arts';
  //const map = 'https://maps.app.goo.gl/CMezTBb6SByfZMyL8';
  const [venue, setVenue] = useState(
    'Prestige Srihari Khoday Centre for Performing Arts',
  );
  const [time, setTime] = useState('9:30 am');
  const [date, setDate] = useState('1st April, 2023');
  const [map, setMap] = useState('https://maps.app.goo.gl/CMezTBb6SByfZMyL8');
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/cropped-Deeksha-Logo.png')}
        style={{width: '70%', height: 65.4}}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: '700',
          alignSelf: 'center',
          textAlign: 'center',
          color: '#FA8015',
          padding: 16,
        }}>
        Rejuvenate '25
      </Text>
      <Text style={styles.specialText}>Reload... Refuel... Recharge...</Text>
      <Text style={styles.titleStyle}>Present your QR Pass during entry:</Text>
      <QRCode
        getRef={ref => (myQRCode = ref)}
        // ref={myQRCode}
        //QR code value
        value={qrvalue ? qrvalue : 'NA'}
        //size of QR Code
        size={250}
        //Color of the QR Code (Optional)
        color="black"
        //Background Color of the QR Code (Optional)
        backgroundColor="white"
        //Center Logo size  (Optional)
        logoSize={100}
        //Center Logo margin (Optional)
        logoMargin={2}
        //Center Logo radius (Optional)
        logoBorderRadius={15}
        //Center Logo background (Optional)
        logoBackgroundColor="yellow"
      />
      <View style={{flex: 1, margin: 10, justifyContent: 'space-around'}}>
        <Text style={styles.textStyle}> Venue: {venue}</Text>
        <Text style={styles.textStyle}> Date: {date}</Text>
        <Text style={styles.textStyle}> Time: {time}</Text>
        <Text
          onPress={() => {
            Linking.openURL(map);
          }}
          style={{
            fontWeight: '700',
            textAlign: 'center',
            width: 200,
            color: '#FA8015',
            textDecorationLine: 'underline',
          }}>
          Location on Map
        </Text>
      </View>
    </View>
  );
};

export default QRCodeScreen;

const styles = StyleSheet.create({
  specialText: {
    color: '#FA8015',
    textShadowColor: '#FAB00C',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: '700',
  },
  container: {
    borderColor: '#FA8015',
    borderWidth: 20,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 30,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: '700',
    color: '#FAB00C',
  },
  textStyle: {
    fontWeight: '700',
    textAlign: 'center',
    width: 200,
    color: '#5a5a5a',
  },
});
