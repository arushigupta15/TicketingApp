/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */

// Generation of QR Code in React Native
// https://aboutreact.com/generation-of-qr-code-in-react-native/

// import React in our code
import React, { useState, useRef, useEffect, useContext } from 'react';
import PhoneInput from 'react-native-phone-number-input';
// import all the components we are going to use
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Image,
    ToastAndroid,
} from 'react-native';


import { useNavigation } from '@react-navigation/native';
import QRCodeScreen from './QRCodeScreen';
import QRCode from 'react-native-qrcode-svg';
import Scanner from './Scanner';
import { AuthContext } from '../context/AuthContext';



const App = () => {

    const { isAdmin } = useContext(AuthContext);

    const [inputText, setInputText] = useState('');
    const [email, setEmail] = useState('');
    const [qrvalue, setQrvalue] = useState('');
    const [campus, setCampus] = useState('');
    const [empId, setEmpId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const phoneInput = React.useRef(null);
    //   const savePhoneNumberPass = async () => {
    //     await AsyncStorage.setItem('PHONE_NUMBER', phoneNumber);
    //   };
    const navigation = useNavigation();
    const getPhoneNumber = (text: string) => {
        setPhoneNumber(text);
    };

    const validate = () => {
        Keyboard.dismiss();
    };
    const register = () => {
        if (inputText === '' || empId === '' || campus === '' || phoneNumber === '' || email === '') {
            ToastAndroid.show('Enter all inputs.', 3);
        }
        else {
            let qrData = {
                name: inputText,
                emailId: email,
                phoneNumber: parseInt(phoneNumber, 10),
                campus: campus,
                employeeId: parseInt(empId, 10),
            };
            ;
            setQrvalue(JSON.stringify(qrData));
            updateToDatabase(qrData);
        }
    };

    const updateToDatabase = async (qrvalue: any) => {
        //Code to update registration data

        let json: any = {};

        try {
            const response = await fetch('http://rejuvenate.deekshalearning.com:8080/deeksha-event-api/user/register', {
                method: 'POST',
                // headers: {
                //     Accept: 'application/json',
                //     'Content-Type': 'application/json',
                // },
                body: JSON.stringify(qrvalue),
            });

            console.log('m got resp');

            json = await response.json();

            navigation.navigate('QRCodeScreen' as never, { paramKey: JSON.stringify(qrvalue) } as never);
            // if (json.status == 200) {
            //     console.log(json.stringify);
            //     ToastAndroid.show('Registered successfully', 3000);
            //     navigation.navigate('QRCodeScreen' as never, { paramKey: JSON.stringify(qrvalue) } as never);
            // } else {
            //     ToastAndroid.show(json.error, 3000);
            // }
        } catch (error) {
            //ToastAndroid.show(error., 3000);
            console.log(error);

        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/cropped-Deeksha-Logo.png')}
                    style={{ width: '50%', height: 59 }}
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
                    Welcome to Rejuvenate '25
                </Text>
                <Text style={styles.specialText}>Reload... Refuel... Recharge...</Text>
                <Text style={styles.titleStyle}>
                    Please Register using the below registration form and click submit to generate a QR pass. You need to Show the QR pass at the event entry.
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginTop: 8, fontWeight: '700', color: 'grey' }}> Name:           </Text>
                    <TextInput
                        // style={styles.textInputStyle}
                        onChangeText={inputText => setInputText(inputText)}
                        placeholder="Enter your name"
                        value={inputText}
                        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, height: 35, width: 260 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ marginTop: 8, fontWeight: '700', color: 'grey' }}> Emp ID:         </Text>
                    <TextInput
                        // style={styles.textInputStyle}
                        keyboardType="numeric"
                        onChangeText={empId => setEmpId(empId)}
                        placeholder="Enter your Employee ID"
                        value={empId}
                        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, height: 35, width: 260 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ marginTop: 16, fontWeight: '700', color: 'grey' }}> Campus:       </Text>
                    <TextInput
                        // style={styles.textInputStyle}
                        onChangeText={campus => setCampus(campus)}
                        placeholder="Enter your Campus Name"
                        value={campus}
                        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, height: 35, width: 260, marginTop: 9 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginTop: 14, fontWeight: '700', color: 'grey' }}> Phone No:    </Text>
                    <PhoneInput
                        containerStyle={{ width: 260, borderBottomColor: 'grey', borderBottomWidth: 0.5 }}
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode="IN"
                        layout="second"
                        placeholder="Enter Phone No."
                        textContainerStyle={{ paddingVertical: 0, height: 40, width: 80, backgroundColor: 'white', paddingLeft: 0, marginLeft: 0 }}
                        onChangeText={text => {
                            getPhoneNumber(text);
                        }}
                        countryPickerProps={{ withAlphaFilter: true }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ marginTop: 16, fontWeight: '700', color: 'grey' }}> E-mail ID:      </Text>
                    <TextInput
                        // style={styles.textInputStyle}
                        onChangeText={email => setEmail(email)}
                        placeholder="Enter your E-mail ID"
                        value={email}
                        style={{ borderBottomColor: 'grey', borderBottomWidth: 0.5, height: 35, width: 260, marginTop: 9 }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => register()}>
                    <Text style={styles.buttonTextStyle}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
export default App;

const styles = StyleSheet.create({
    specialText: {
        color: '#FAB00C',
        textShadowColor: '#FAB00C',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        fontStyle: 'italic',
        fontSize: 20,
        fontWeight: '500',
    },
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
        textAlign: 'justify',
        margin: 3,
        marginBottom: 30,
        padding: 10,
        fontWeight: '400',
        color: 'grey',
    },
    textStyle: {
        textAlign: 'center',
        margin: 10,
    },
    textInputStyle: {
        flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: '#FAB00C',
        borderWidth: 1,
        color: '#FFFFFF',
        borderColor: '#FAB00C',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 11,
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
