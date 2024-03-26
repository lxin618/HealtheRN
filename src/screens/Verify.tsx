import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import {OtpInput} from 'react-native-otp-entry';
import BaseText from '../components/BaseText';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useVerfiyNumber} from '../hooks/useVerifyNumber';
import Button from '../components/Button';

export const Verify = ({navigation, route}: any) => {
  const {otp, value, expiry, type} = route.params;
  const [resendOTP, setRendOTP] = useState(false);
  const [updatedOTP, setUpdatedOTP] = useState('');
  const [updatedOTPExpiry, setUpdatedOTPExpiry] = useState('');
  const [counter, setCounter] = useState(60);
  const timer = useRef<ReturnType<typeof setInterval>>();
  console.log('first time', otp, type);

  const {sendOTP, handleVerify} = useVerfiyNumber();

  const ResendOtp = async () => {
    startTimer();
    setRendOTP(true);
    const res = await sendOTP(value, type);
    if (res) {
      setUpdatedOTP(res.otp);
      setUpdatedOTPExpiry(res.expiry);
    }
    console.log('resend', res, updatedOTP, updatedOTPExpiry);
  };

  const updateCounter = useCallback(() => {
    setCounter(prevCounter => prevCounter - 1);
  }, []);

  const startTimer = useCallback(() => {
    timer.current = setInterval(updateCounter, 1000);
  }, [updateCounter, 1000]);

  const stopTimer = useCallback(() => {
    timer.current && clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (counter <= 0) {
      stopTimer();
      setRendOTP(false);
      setCounter(60);
    }
  }, [counter, stopTimer]);

  const onVerify = (text: string) => {
    const success = handleVerify({
      OTPTyped: text,
      OTPReceived: updatedOTP ? updatedOTP : otp,
      OTPExpiry: updatedOTPExpiry ? updatedOTPExpiry : expiry,
    });

    if (success) {
      stopTimer();
      navigation.navigate('Verified', {type: type});
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
      <Icon
        name="chevron-back-outline"
        onPress={() => navigation.navigate('CreateAccount')}
        style={{top: 20, padding: 15}}
        size={32}
      />
      <ScrollView className="container mx-auto px-4 pt-12 pl-6">
        <Header icon={type} heading={`Verify your ${type == 'phone' ? 'phone number' : 'email'}`} />
        <BaseText className="pt-8 text-base">
          Please enter the 4 digit code sent to {value}
        </BaseText>
        <OtpInput
          numberOfDigits={4}
          autoFocus={true}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onFilled={text => onVerify(text)}
          theme={{
            containerStyle: {top: 30},
            pinCodeContainerStyle: {
              width: '20%',
              height: '75%',
              backgroundColor: '#F7F7F8',
            },
          }}
        />
        <TouchableOpacity
          style={resendOTP ? {opacity: 0.5} : {opacity: 1}}
          disabled={resendOTP}
          onPress={() => ResendOtp()}>
          <View className="pt-6 pb-4 justify-center items-center">
            <BaseText className="text-[#0076FF] text-base">
              {resendOTP ? `Resend code in ${counter}` : 'Resend code'}
            </BaseText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
