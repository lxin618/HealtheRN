import {SafeAreaView, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import BaseText from '../components/BaseText';
import Button from '../components/Button';

export const SignupPhone = ({navigation}: any) => {
  return (
    <SafeAreaView style={{backgroundColor:'white'}} className="h-full">
      <Icon
        name="chevron-back-outline"
        onPress={() => navigation.navigate('Disclaimer')}
        style={{top: 20, padding: 15}}
        size={32}
      />
      <ScrollView className="container mx-auto px-4 pt-12 pl-6">
        <Header heading={'Create an account'} />
        <View className="pt-10">
            <BaseText className='pl-1 pb-2 text-[#171B4B]'>
                Phone
            </BaseText>
            <TextInput
                // value={''}
                keyboardType='numeric'
                style={style.textInput}
                onChangeText={() => {}}
                placeholder="Enter you phone number"
                placeholderTextColor={'#8B8DA5'}
            />
          </View>
        <Button buttonText='Continue' navigateTo='SignupDetails' />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
    textInput: {
        backgroundColor: '#F7F7F8',
        padding: 20,
        borderRadius: 8,
        width: '100%'
    },
  });
  
