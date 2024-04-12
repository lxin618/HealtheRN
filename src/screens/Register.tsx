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
import DatePicker from 'react-native-date-picker'
import MaskInput, { Masks } from 'react-native-mask-input';
import Button from '../components/Button';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export const Register = ({navigation, route}: any) => {

    const {type, value} = route.params;
    const [date, setDate] = useState(new Date())
    const [openCalendar, setOpenCalendar] = useState(false)
    const [age, setAge] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);
    // hooks
    const {
        data: {control, errors, isValid, isSubmitting},
        operations: {handleSubmit, onPressSend, setValue, getValues},
    } = useRegister(phoneInput, type, value);

    const setBrithdayFromCalendar = (date: Date) => {
        setAge((new Date().getFullYear() - date.getFullYear()).toString())
        setValue('birthday', date.toLocaleDateString('en-NZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }), 
        {
            shouldValidate: true,
            shouldDirty: true
        })
        setOpenCalendar(false)
    }
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-4 pl-6 pr-6">
            <Spinner visible={isSubmitting} overlayColor={'rgba(0, 0, 0, 0.40)'} />
            <Animated.View 
                entering={FadeInDown.delay(50).duration(500).springify()}
                >
                <Progress.Bar 
                    className="mb-8"
                    borderWidth={0} 
                    progress={0.25} 
                    width={null}
                    unfilledColor="#E6E6EE"
                    borderRadius={0}
                    height={4}
                    />
                <Header heading={'Finish sign up'} noIcon/>
                <View className="flex flex-row absolute right-0 top-10">
                {/* <View className="flex flex-row mt-5"> */}
                    <Icon name="settings-outline" size={18} />
                    <BaseText 
                        className='text-xs ml-1.5 font-bold text-[#070651]'>
                        Account set up
                    </BaseText>
                </View>
                <BaseText className="pt-5 pl-1 pb-2 text-[#171B4B]">First Name*</BaseText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <TextInput
                            autoFocus
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
                {errors.firstName && <BaseText className="pt-2 pl-2 text-red-500">{errors.firstName.message}</BaseText>}
                <BaseText className="pt-2 pl-1 pb-2 text-[#171B4B]">Last Name*</BaseText>
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
                {errors.lastName && <BaseText className="pt-2 pl-2 text-red-500">{errors.lastName.message}</BaseText>}
                <BaseText className="pt-2 pl-1 pb-2 text-[#171B4B]">Email Address*</BaseText>
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
                {errors.email && <BaseText className="pt-2 pl-2 text-red-500">{errors.email.message}</BaseText>}
                <BaseText className="pt-2 pl-1 pb-2 text-[#171B4B]">Mobile Number*</BaseText>
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
                            onChangeFormattedText={onChange}
                            disableArrowIcon
                            countryPickerProps={{
                                countryCodes: ['NZ'],
                            }}
                        />
                    )}
                    name="phone"
                    />
                {errors.phone && <BaseText className="pt-2 pl-2 text-red-500">{errors.phone.message}</BaseText>}
                <BaseText className="pt-2 pl-1 pb-2 text-[#171B4B]">Birthday*</BaseText>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <View className='flex flex-row align-center'>
                            <MaskInput
                                className='text-base p-4 pb-5 bg-[#F7F7F8] rounded-lg w-full'
                                value={value}
                                placeholderTextColor={'#8B8DA5'}
                                placeholder="dd/mm/yyyy"
                                onChangeText={text => {
                                    onChange(text)
                                    const date = text.split("/")
                                    if (date.length === 3 && date[2].length === 4) {
                                        setAge((new Date().getFullYear() - new Date(date[2]).getFullYear()).toString())
                                    }
                                }}
                                mask={Masks.DATE_DDMMYYYY}
                                />
                            <BaseText
                                style={{color: '#8B8DA5', position: 'absolute', top:18, right: 60}}
                                >
                                {age ? `${age} years old` : null}
                            </BaseText>
                            <Icon
                                style={{position: 'absolute', top:15, right: 20}}
                                name={'calendar-clear-outline'}
                                color="#8B8DA5"
                                size={24}
                                onPress={() => setOpenCalendar(true)} />
                        </View>
                    )}
                    name="birthday"
                    />
                    {errors.birthday ? 
                        <BaseText className="pt-2 pl-2 text-red-500">{errors.birthday.message}</BaseText>
                        : !getValues('password') ? 
                        <BaseText className="text-xs text-[#8B8DA5] pt-1 pl-1 pb-1">To signup, you must be 16 or older</BaseText>
                        : null
                    }
                    <DatePicker
                        mode="date"
                        modal
                        open={openCalendar}
                        date={date}
                        onConfirm={(date) => setBrithdayFromCalendar(date)}
                        onCancel={() => {
                            setOpenCalendar(false)
                        }}
                    />
                <BaseText className="pt-2 pl-1 pb-2 text-[#171B4B]">Password*</BaseText>
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
                    {errors.password ? 
                        <BaseText className="pt-2 pl-2 text-red-500">{errors.password.message}</BaseText>
                        : !getValues('password') ? 
                        <BaseText className="text-xs text-[#8B8DA5] pt-1 pl-1 pb-1">Password must contain an uppercase character, at least 6 characters long.</BaseText>
                        : null
                    }

                    <BaseText 
                        className='text-xs text-[#8B8DA5] pt-5 pl-1 pb-1'
                        >
                        By selecting Agree and continue, I agree to HealthE's Terms and conditions and acknowledge the Privacy Policy
                    </BaseText>
                    <Button
                        disabled={!isValid}
                        buttonText="Agree and Continue"
                        onPress={handleSubmit(onPressSend)}
                        />
            </Animated.View>
            <View style={{height: 100}} />
            </ScrollView>
        </SafeAreaView>
    )
}