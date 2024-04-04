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
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import Spinner from 'react-native-loading-spinner-overlay';
import {useVerfiyNumber} from '../hooks/useVerifyNumber';
import {useGoogleAuth} from '../hooks/useGoogleAuth';
import Toast from 'react-native-root-toast';

type OTOPType = 'phone' | 'email';

export const CreateAccount = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [numberValidError, setNumberValidError] = useState('');
  const [screen, setScreen] = useState<'phone' | 'email'>('phone');
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  // hooks
  const {sendOTP, validateNumber} = useVerfiyNumber();
  const {googleSigninLoading, signIn} = useGoogleAuth();

  const onChangeNumber = (number: string) => {
    const isValid = validateNumber(number, phoneInput);
    if (isValid) {
      setNumberValidError('');
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
      setNumberValidError('Please provide a valid phone number');
    }
    setPhoneNumber(number);
  };

  const onSend = async (type: OTOPType) => {
    setLoading(true);
    let value;
    if (type == 'phone') {
	  const countryCode = phoneInput.current?.getCallingCode();
      value = '+' + countryCode + phoneNumber;
    } else {
      value = email;
    }
    const res = await sendOTP(value, type);
    if (res) {
      navigation.navigate('Verify', {
        otp: res.otp,
        value,
        expiry: res.expiry,
        type,
      });
    }
    setLoading(false);
  };

  const onChangeEmail = (text: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === true) {
      setEmailValid(true);
      setNumberValidError('');
    } else {
      setEmailValid(false);
      setNumberValidError('Please provide a valid email address');
    }
    setEmail(text);
  };

  const disabledButton = () => {
    if (screen == 'phone') {
      return numberValidError || !phoneValid ? true : false;
    } else {
      return numberValidError || !emailValid ? true : false;
    }
  };

  const googleSignin = async () => {
    const res = await signIn();
	if (res) {
		navigation.navigate('Home');
	}
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <Icon
        name="chevron-back-outline"
        onPress={() => navigation.goBack()}
        style={{top: 20, padding: 15}}
        size={32}
      />
      <ScrollView className="container mx-auto px-4 pt-12 pl-6 pr-6">
        <Spinner visible={loading || googleSigninLoading} overlayColor={'rgba(0, 0, 0, 0.40)'} />
        <Header heading={'Create an account'} />
        <View className="pt-10 pb-4">
          {screen == 'phone' && (
            <>
              <BaseText className="pl-1 pb-2 text-[#171B4B]">Phone</BaseText>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                containerStyle={style.textInput}
                defaultCode="NZ"
                layout="first"
                onChangeText={number => onChangeNumber(number)}
                disableArrowIcon
                countryPickerProps={{
                  countryCodes: ['NZ'],
                }}
                autoFocus
              />
            </>
          )}
          {screen == 'email' && (
            <>
              <BaseText className="pl-1 pb-2 text-[#171B4B]">Email</BaseText>
              <TextInput
                style={style.emailInput}
                autoFocus
                defaultValue={email}
                placeholder="Enter your email"
                onChangeText={text => onChangeEmail(text)}
              />
            </>
          )}
          {numberValidError && (
            <BaseText className="pt-2 pl-2 text-red-500">
			  {numberValidError}
            </BaseText>
          )}
        </View>
        <Button
          disabled={disabledButton()}
          buttonText="Continue"
          onPress={() => onSend(screen == 'phone' ? 'phone' : 'email')}
        />
        <Button
          icon={screen == 'email' ? 'cellphone' : 'email-outline'}
          iconStyle={style.icon}
          style={style.emailBtn}
          textStyle={style.textStyle as StyleProp<ViewStyle>}
          buttonText={
            screen == 'email' ? 'Continue with phone' : 'Continue with email'
          }
          onPress={() => {
            setScreen(screen == 'email' ? 'phone' : 'email');
            setNumberValidError('');
          }}
        />
        <View className="pt-12 justify-center items-center">
          <BaseText className="text-[#171B4B] text-base">
            Or sign up with
          </BaseText>
        </View>
        <View className="pt-8 justify-center items-center">
          <Icon
            name="logo-google"
            onPress={googleSignin}
            style={style.google}
            size={32}
          />
        </View>
        <Animated.View
          entering={FadeInDown.delay(50).duration(500).springify()}
          className="flex-row justify-center mt-28">
          <BaseText className="text-[#171B4B]">
            Already have an account?{' '}
          </BaseText>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
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
  emailInput: {
    backgroundColor: '#F7F7F8',
    borderRadius: 8,
    width: '100%',
    padding: 20,
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
