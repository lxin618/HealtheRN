import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRef, useState } from 'react';
import PhoneInput from "react-native-phone-number-input";

export const SignupPhone = ({navigation}: any) => {

  const [phoneNumber, setPhoneNumber] = useState('')
  const [numberValid, setNumberValid] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const onPressPhoneContinue = () => {
    const checkValid = phoneInput.current?.isValidNumber(phoneNumber);
    console.log(phoneNumber, checkValid)
    
    // navigation.navigate('SignupDetails')
  }
 
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
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            countryPickerProps={{
              countryCodes: ['NZ', 'AU'],
            }}
            autoFocus
          />
        </View>
        <Button buttonText="Continue" onPress={onPressPhoneContinue} />
        <Button icon={'email'} iconStyle={style.icon} style={style.emailBtn} textStyle={style.textStyle as StyleProp<ViewStyle>} buttonText="Continue with email" onPress={() => navigation.navigate('SignupEmail')} />
        <View className='pt-12 justify-center items-center'>
          <BaseText className='text-[#171B4B] text-base'>
            Or sign up with 
          </BaseText>
        </View>
        <View className='pt-8 justify-center items-center'>
          <Icon
            name="logo-google"
            onPress={() => {console.log('123')}}
            style={style.google}
            size={32}
          />
        </View>
        <Animated.View
          entering={FadeInDown.delay(50).duration(500).springify()}
          className="flex-row justify-center bottom-0 h-full top-10 mt-20">
          <BaseText className="text-[#171B4B]">Already have an account? </BaseText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <BaseText className="font-medium text-[#0076FF]">Sign in</BaseText>
          </TouchableOpacity>
        </Animated.View>
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
    left: 15
  },
  icon: {
    position:'absolute',
    left: 85,
    top: 1,
    color: '#070651'
  },
  google: {
    padding: 18,
    backgroundColor: '#F7F7F8',
    borderRadius: 30,
    width: 60,
    height: 60,
    fontSize:25,
    overflow: 'hidden',
    color: '#0076FF',
  }
});
