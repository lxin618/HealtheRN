import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {API_URL} from '../../env/env.json';
import Toast from 'react-native-root-toast';

export const SignupPhone = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberValidError, setNumberValidError] = useState('');
  const phoneInput = useRef<PhoneInput>(null);

  const onPressPhoneContinue = async () => {
    if (!phoneNumber) {
      setNumberValidError('Please re-type the phone number');
      return;
    }
    const url = `${API_URL}/api/auth/sendOtp`;
    // call the api to send otp
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          phone: phoneNumber
        }),
      });
      const res = await response.json();
      const statusCode = response.status;
      if (statusCode != 200) {
        Toast.show(`😕 ${res.response}`, {
          duration: 5000,
          position: Toast.positions.TOP,
          shadow: true,
          opacity: 1,
          animation: true,
          hideOnPress: true,
          backgroundColor: 'red',
        });
      }
      else {
        navigation.navigate('Verify', {otp: res.otp, phone: phoneNumber})
      }
    } catch (error) {
      Toast.show(`😕 Something has gone wrong`, {
        duration: 5000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        opacity: 1,
        animation: true,
        hideOnPress: true,
        backgroundColor: 'red',
      });
    }
  };

  const validateNumber = (number: string) => {
    const checkValid = phoneInput.current?.isValidNumber(number);
    if (!checkValid) {
      setNumberValidError('Please provide a valid phone number');
      return;
    } else {
      setNumberValidError('');
    }
    setPhoneNumber(number);
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
      <Icon
        name="chevron-back-outline"
        onPress={() => navigation.navigate('Disclaimer')}
        style={{top: 20, padding: 15}}
        size={32}
      />
      <ScrollView className="container mx-auto px-4 pt-12 pl-6">
        <Header heading={'Create an account'} />
        <View className="pt-10 pb-4">
          <BaseText className="pl-1 pb-2 text-[#171B4B]">Phone</BaseText>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            containerStyle={style.textInput}
            defaultCode="NZ"
            layout="first"
            onChangeFormattedText={number => validateNumber(number)}
            disableArrowIcon
            countryPickerProps={{
              countryCodes: ['NZ'],
            }}
            autoFocus
          />
          {numberValidError && (
            <BaseText className="pt-2 pl-2 text-red-500">
              {numberValidError}
            </BaseText>
          )}
        </View>
        <Button
          disabled={numberValidError || !phoneNumber ? true : false}
          buttonText="Continue"
          onPress={onPressPhoneContinue}
        />
        <Button
          icon={'email'}
          iconStyle={style.icon}
          style={style.emailBtn}
          textStyle={style.textStyle as StyleProp<ViewStyle>}
          buttonText="Continue with email"
          onPress={() => navigation.navigate('Verify')}
        />
        <View className="pt-12 justify-center items-center">
          <BaseText className="text-[#171B4B] text-base">
            Or sign up with
          </BaseText>
        </View>
        <View className="pt-8 justify-center items-center">
          <Icon
            name="logo-google"
            onPress={() => {
              console.log('123');
            }}
            style={style.google}
            size={32}
          />
        </View>
        <Animated.View
          entering={FadeInDown.delay(50).duration(500).springify()}
          className="flex-row justify-center h-full mt-20 pb-50">
          <BaseText className="text-[#171B4B]">
            Already have an account?{' '}
          </BaseText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <BaseText className="font-medium text-[#0076FF]">Sign in</BaseText>
          </TouchableOpacity>
        </Animated.View>
        <View style={{height:100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textInput: {
    backgroundColor: '#F7F7F8',
    borderRadius: 8,
    width: '100%',
  },
  emailBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    marginTop: 20,
    borderColor: '#070651',
  },
  textStyle: {
    color: '#070651',
    left: '3%',
  },
  icon: {
    position: 'absolute',
    right: '76%',
    top: '55%',
    color: '#070651',
  },
  google: {
    padding: 18,
    backgroundColor: '#F7F7F8',
    borderRadius: 30,
    width: 60,
    height: 60,
    fontSize: 25,
    overflow: 'hidden',
    color: '#0076FF',
  },
});
