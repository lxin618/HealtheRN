import { Pressable, Button, SafeAreaView, ScrollView, StyleSheet, TextInput, View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay/lib"
import Animated, { FadeInDown } from "react-native-reanimated"
import * as Progress from 'react-native-progress';
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";
import BaseText from "../components/BaseText";
import { useAccountSetup } from "../hooks";
import { Controller } from "react-hook-form";
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";
import { ButtonSmall } from "../components/Button";

export const AccountSetup = ({navigation}: any) => {

    const [gender, setGender] = useState('Male');
    const [isFocusDropdown, setIsFocusDropdown] = useState(false);
    const [isFocusInput, setIsFocusInput] = useState('');

    const {
        data: {control, errors, isValid, isSubmitting},
        operations: {handleSubmit, onPressSend},
    } = useAccountSetup(gender);

    const ethnicityData = [
        { label: 'European', value: 'european' },
        { label: 'Māori', value: 'maori' },
        { label: 'Pacific peoples', value: 'pacific' },
        { label: 'Asian', value: 'asian' },
        { label: 'Middle Eastern', value: 'middle eastern' },
        { label: 'Latin American', value: 'latin american' },
        { label: 'African', value: 'african' },
        { label: 'Other ethnicity', value: 'others' },
      ];

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="container mx-auto px-4 pt-4 pl-6 pr-6">
                <Spinner visible={false} overlayColor={'rgba(0, 0, 0, 0.40)'} />
                <Animated.View 
                    entering={FadeInDown.delay(50).duration(500).springify()}
                    >
                    <Progress.Bar 
                        className="mb-8"
                        borderWidth={0} 
                        progress={0.50} 
                        width={null}
                        unfilledColor="#E6E6EE"
                        borderRadius={0}
                        height={4}
                        />
                    <Header heading={'Account Setup'} noIcon/>
                    <View className="flex flex-row absolute right-0 top-10">
                        <Icon name="settings-outline" size={18} />
                        <BaseText 
                            className='text-xs ml-1.5 font-bold text-[#070651]'>
                            Personal Info
                        </BaseText>
                    </View>
                    <View>
                        <BaseText className="leading-6 pt-12 text-md text-[#171B4B]">
                            What is your sex at birth?*
                        </BaseText>
                        <View style={style.container}>
                            <Pressable
                                style={[style.radioCircle, gender === 'Male' ? style.selectedGender : null]}
                                onPress={() => setGender('Male')}
                                >
                                <Icon style={style.icon} name="male-outline"/>
                                <BaseText style={style.text}>Male</BaseText>
                            </Pressable>
                            <Pressable
                                style={[style.radioCircle, gender === 'Female' ? style.selectedGender : null]}
                                onPress={() => setGender('Female')}
                                >
                                <Icon style={style.icon} name="female-outline"/>
                                <BaseText style={style.text}>Female</BaseText>
                            </Pressable>
                        </View>
                    </View>
                    <BaseText className="pt-6 pl-1 pb-2 text-[#171B4B]">What is your ethnicity*</BaseText>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({field: {onChange, value}}) => (
                            <Dropdown
                                style={[style.dropdown, isFocusDropdown && {backgroundColor: '#F2F8FF'}]}
                                onFocus={() => setIsFocusDropdown(true)}
                                onBlur={() => setIsFocusDropdown(false)}
                                searchPlaceholder="Search..."
                                placeholder={!isFocusDropdown ? 'Select item' : '...'}
                                search
                                maxHeight={300}
                                value={value}
                                data={ethnicityData}
                                iconStyle={style.iconStyle}
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                labelField={'label'}
                                valueField={'value'}
                                onChange={item => onChange(item.value)}
                            />
                        )}
                        name="ethnicity"
                        />
                    {errors.ethnicity && <BaseText className="pt-2 pl-2 text-red-500">{errors.ethnicity.message}</BaseText>}
                    <View className="flex-row">
                        <BaseText className="flex-1 pt-6 pl-1 pb-2 text-[#171B4B]">Your height</BaseText>
                        <BaseText className="flex-1 pt-6 pl-1 pb-2 text-[#171B4B]">Your weight</BaseText>
                    </View>
                    <View style={{columnGap: 10}} className="flex-row">
                        <Controller
                            control={control}
                            render={({field: {onChange, value}}) => (
                            <TextInput
                                style={isFocusInput === 'height' ? {borderColor: '#3E7BFA',backgroundColor: '#F2F8FF'} : null}
                                className="rounded-lg flex-1 border-2 border-[#E6E6EE] p-4"
                                defaultValue={value}
                                placeholder="Enter your height"
                                onChangeText={text => onChange(text)}
                                keyboardType="numeric"
                                onFocus={() => setIsFocusInput('height')}
                                onBlur={() => setIsFocusInput('')}
                            />
                            )}
                            name="height"
                        />
                        <BaseText className="absolute left-36 top-4">cm</BaseText>
                        <Controller
                            control={control}
                            render={({field: {onChange, value}}) => (
                            <TextInput
                                style={isFocusInput === 'weight' ? {borderColor: '#3E7BFA',backgroundColor: '#F2F8FF'} : null}
                                onFocus={() => setIsFocusInput('weight')}
                                onBlur={() => setIsFocusInput('')}
                                className="rounded-lg flex-1 border-2 border-[#E6E6EE] p-4"
                                defaultValue={value}
                                placeholder="Enter your weight"
                                onChangeText={text => onChange(text)}
                                keyboardType="numeric"
                            />
                            )}
                            name="weight"
                        />
                        <BaseText className="absolute right-5 top-4">kg</BaseText>
                    </View>
                </Animated.View>
            </ScrollView>
            <View className="flex-row justify-around">
                <ButtonSmall
                    style={{left: 0, backgroundColor: '#F7F7F8'}}
                    buttonText="Back"
                    textStyle={{color: '#070651'}}
                    onPress={() => navigation.goBack()}
                />
                <ButtonSmall
                    style={{right: 0, backgroundColor: '#070651'}}
                    textStyle={{color: '#fff'}}
                    disabled={!isValid || isSubmitting}
                    buttonText="Next"
                    onPress={handleSubmit(onPressSend)}
                />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      columnGap: 10,
      justifyContent: 'space-evenly',
      marginTop: 15,
    },
    radioCircle: {
        borderRadius: 10,
        padding: 20,
        columnGap: 20,
        flex: 1,
        borderColor: '#E6E6EE',
        borderWidth: 1,
    },
    text: {
        fontSize: 16,
        color: '#070651',
        textAlign: 'center',
        marginLeft: '10%',
    },
    icon: {
        fontSize: 20,
        position: 'absolute',
        left: '30%',
        top: '95%',
    },
    selectedGender: {
        // borderColor: '#3E7BFA', 
        backgroundColor: '#F2F8FF',
        color: '#4D9FFF',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#E6E6EE',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    iconStyle: {
        color: '#070651',
        fontSize: 20,
        position: 'absolute',
        right: '5%',
    },
    placeholderStyle: {
        color: '#070651',
    },
    selectedTextStyle: {
        color: '#070651',
    }
  });