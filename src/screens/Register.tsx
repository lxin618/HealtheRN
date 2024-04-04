import { SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import BaseText from '../components/BaseText';
import { useRegister } from '../hooks/useRegister';
import { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';
import { Controller } from 'react-hook-form';

export const Register = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);

    // hooks
    const {
        data: {control, errors, isValid},
        operations: {handleSubmit, onPressSend},
    } = useRegister(phoneInput);

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-12 pl-6 pr-6">
            <Animated.View 
                entering={FadeInDown.delay(50).duration(500).springify()}
                >
                <Progress.Bar 
                    className="mb-8"
                    borderWidth={0} 
                    progress={0.3} 
                    width={null}
                    unfilledColor="#E6E6EE"
                    borderRadius={0}
                    height={4}
                    />
                <Header heading={'Finish sign up'} noIcon/>
                <View className="flex flex-row mt-7">
                    <Icon name="settings-outline" size={23} />
                    <BaseText 
                        className='text-sm ml-2 font-bold text-[#070651]'>
                        Account set up
                    </BaseText>
                </View>
                <BaseText className="pt-8 pl-1 pb-2 text-[#171B4B]">First Name*</BaseText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextInput
                            className='p-5 bg-[#F7F7F8] rounded-lg'
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter your first name"
                            placeholderTextColor={'#8B8DA5'}
                            autoCorrect={false}
                            textContentType={'givenName'}
                        />
                    )}
                    name="firstName"
                    />
                <BaseText className="pt-4 pl-1 pb-2 text-[#171B4B]">Last Name*</BaseText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextInput
                            className='p-5 bg-[#F7F7F8] rounded-lg'
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter your last name"
                            placeholderTextColor={'#8B8DA5'}
                            autoCorrect={false}
                            textContentType={'familyName'}
                        />
                    )}
                    name="lastName"
                    />
                <BaseText className="pt-4 pl-1 pb-2 text-[#171B4B]">Email Address*</BaseText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextInput
                            className='p-5 bg-[#F7F7F8] rounded-lg'
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter your email address"
                            placeholderTextColor={'#8B8DA5'}
                            autoCorrect={false}
                            textContentType={'emailAddress'}
                        />
                    )}
                    name="email"
                    />
                <BaseText className="pt-4 pl-1 pb-2 text-[#171B4B]">Mobile Number*</BaseText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            containerStyle={{
                                backgroundColor: '#F7F7F8',
                                borderRadius: 8,
                                width: '100%',
                            }}
                            defaultCode="NZ"
                            layout="first"
                            onChangeText={number => onChange(number)}
                            disableArrowIcon
                            countryPickerProps={{
                                countryCodes: ['NZ'],
                            }}
                            autoFocus
                        />
                    )}
                    name="phone"
                    />
                <BaseText className="pt-4 pl-1 pb-2 text-[#171B4B]">Password*</BaseText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <View className='flex flex-row align-center'>
                            <TextInput
                                secureTextEntry={passwordVisible ? false : true}
                                className='p-5 bg-[#F7F7F8] rounded-lg w-full'
                                value={value}
                                placeholderTextColor={'#8B8DA5'}
                                placeholder="Enter your password"
                                onChangeText={text => onChange(text)} />
                            <Icon
                                style={{position: 'absolute', top:15, right: 20}}
                                name={passwordVisible ? 'eye' : 'eye-off-sharp'}
                                color="#8B8DA5"
                                size={24}
                                onPress={() => setPasswordVisible(!passwordVisible)} />
                        </View>
                    )}
                    name="password"
                    />
            </Animated.View>
            </ScrollView>
        </SafeAreaView>
    )
}