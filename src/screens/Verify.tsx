import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import {OtpInput} from 'react-native-otp-entry';
import BaseText from '../components/BaseText';
import Button from '../components/Button';

export const Verify = ({navigation, route}: any) => {
  const otp = route.params.otp;
  const phone = route.params.phone;
  const expiry = route.params.expiry;

  const handleVerify = (text: string) => {
    if (expiry < new Date().toISOString()) {
      console.log('expired');
    }
    else if (otp != text) {
      console.log('Invalid code');
    }
    else {
      console.log('Valid code');
    }
  }

  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
      <Icon
        name="chevron-back-outline"
        onPress={() => navigation.navigate('SignupPhone')}
        style={{top: 20, padding: 15}}
        size={32}
      />
      <ScrollView className="container mx-auto px-4 pt-12 pl-6">
        <Header icon={'phone'} heading={'Verify your phone number'} />
        <BaseText className="pt-8 text-base">
          Please enter the 4 digit code sent to {phone}
        </BaseText>
        <OtpInput
          numberOfDigits={4}
          autoFocus
          focusColor="green"
          focusStickBlinkingDuration={500}
          onFilled={text => handleVerify(text)}
          theme={{
            containerStyle: {top: 30},
            pinCodeContainerStyle: {
              width: '20%',
              height: '65%',
              backgroundColor: '#F7F7F8',
              borderWidth: 0,
            },
          }}
        />
        <TouchableOpacity
          style={false ? {opacity: 0.5} : {opacity: 1}}
          disabled={false}
          onPress={() => {}}>
          <View className="pt-6 pb-4 justify-center items-center">
            <BaseText className="text-[#0076FF] text-base">
              Resend code
            </BaseText>
          </View>
        </TouchableOpacity>
        <Button buttonText="Verify" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};
