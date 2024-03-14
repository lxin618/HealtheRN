import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import {useEffect} from 'react';
import {OtpInput} from 'react-native-otp-entry';
import BaseText from '../components/BaseText';
import Button from '../components/Button';

export const Verify = ({navigation, route}: any) => {
  const number = route.params.phone;

  useEffect(() => {
    if (!number) {
    }
  });

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
          Please enter the 4 digit code sent to {number}
        </BaseText>
        <OtpInput
          numberOfDigits={4}
          focusColor="green"
          focusStickBlinkingDuration={500}
          onTextChange={text => console.log(text)}
          onFilled={text => console.log(`OTP is ${text}`)}
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
