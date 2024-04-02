import {SafeAreaView, View} from 'react-native';
import Header from '../components/Header';
import BaseText from '../components/BaseText';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';

export const Verified = ({navigation, route}: any) => {
  const {type} = route.params;
  return (
    <SafeAreaView style={{backgroundColor: 'white'}} className="h-full">
      <Icon
        name="chevron-back-outline"
        onPress={() => navigation.goBack()}
        style={{top: 20, padding: 15}}
        size={32}
      />
      <View className="container mx-auto px-4 pt-12 pl-6">
        <Header
          icon={'check'}
          heading={`We verified your ${
            type == 'phone' ? 'number' : 'email'
          }`}
        />
        <BaseText className="pt-8 text-base text-[#515185]">
          {`Your ${
            type == 'phone' ? 'phone number' : 'email'
          } has been successfully verified. Next, please proceed to set up your account to access all the features of our platform.`}
        </BaseText>
        <Button
            style={{marginTop: 20}}
            buttonText="Continue"
            onPress={() => navigation.navigate('Register')}
        />
      </View>
    </SafeAreaView>
  );
};
