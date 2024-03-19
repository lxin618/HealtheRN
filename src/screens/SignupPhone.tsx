import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
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
import Spinner from 'react-native-loading-spinner-overlay';
import {useVerfiyNumber} from '../hooks/useVerifyNumber';

export const SignupPhone = ({navigation, route}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberValidError, setNumberValidError] = useState('');
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const {sendOTP, validateNumber} = useVerfiyNumber();

  const onChangeNumber = (number: string) => {
    const isValid = validateNumber(number, phoneInput);
    if (isValid) {
      setNumberValidError('');
      setPhoneNumber(number);
    } else {
      setNumberValidError('Please provide a valid phone number');
    }
  };

  const onSend = async () => {
    setLoading(true);
    const res = await sendOTP(phoneNumber);
    if (res) {
      navigation.navigate('Verify', {
        otp: res.otp,
        phone: phoneNumber,
        expiry: res.expiry,
      });
    }
    setLoading(false);
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
        <Spinner visible={loading} overlayColor={'rgba(0, 0, 0, 0.40)'} />
        <Header heading={'Create an account'} />
        <View className="pt-10 pb-4">
          <BaseText className="pl-1 pb-2 text-[#171B4B]">Phone</BaseText>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            containerStyle={style.textInput}
            defaultCode="NZ"
            layout="first"
            onChangeFormattedText={number => onChangeNumber(number)}
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
          onPress={onSend}
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
        <View style={{height: 100}} />
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
