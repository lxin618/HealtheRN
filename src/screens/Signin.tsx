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
import PhoneInput from 'react-native-phone-number-input';
import Spinner from 'react-native-loading-spinner-overlay';
import { useVerfiyNumber, useGoogleAuth, useSignin } from '../hooks';

type OTOPType = 'phone' | 'email';

// const emailInput = (email: string, onChangeEmail: (text: string) => void) => {
//   return (
//   <><BaseText className="pl-1 pb-2 text-[#171B4B]">Email</BaseText><TextInput
//       key={2}
//       style={style.emailInput}
//       defaultValue={email}
//       placeholder="Enter your email"
//       onChangeText={text => onChangeEmail(text)} /></>)
// }

export const Signin = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phoneValid, setPhoneValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [numberValidError, setNumberValidError] = useState('');
    const [screen, setScreen] = useState<'phone' | 'email'>('phone');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const phoneInput = useRef<PhoneInput>(null);

    // hooks
    const { signin } = useSignin();
    const { validateNumber } = useVerfiyNumber();
    const { googleSigninLoading, signInGoogle } = useGoogleAuth();

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
        const res = await signin(type, value, password);
        if (res?.customer.accountSetUp) {
            navigation.navigate('Home');
        } else {
            // navigate to the next screen
            navigation.navigate('AccountSetup');
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

    const onChangePassword = (pass: string) => {
        if (pass.length < 6) {
            setPasswordValidError('Password must be at least 6 characters');
            return;
        }
        if (pass.search(/[a-z]/i) < 0) {
            setPasswordValidError('Password must contain at least one letter');
            return;
        } else {
            setPasswordValidError('');
            setPassword(pass);
        }
    };

    const disabledButton = () => {
        if (screen == 'phone') {
            return numberValidError || !phoneValid ? true : false || !password;
        } else {
            return numberValidError || !emailValid ? true : false || !password;
        }
    };

    const googleSignin = async () => {
        const res = await signInGoogle();
        if (res?.customer.accountSetUp) {
            navigation.navigate('Home');
        } else {
            // navigate to the next screen
            navigation.navigate('AccountSetup');
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <Icon
                name="chevron-back-outline"
                onPress={() => navigation.goBack()}
                style={{ top: 20, padding: 15 }}
                size={32}
            />
            <ScrollView className="container mx-auto px-4 pt-12 pl-6 pr-6">
                <Spinner
                    visible={loading || googleSigninLoading}
                    overlayColor={'rgba(0, 0, 0, 0.40)'}
                />
                <Animated.View entering={FadeInDown.delay(50).duration(500).springify()}>
                    <Header heading={'Login to your account'} />
                    <View className="pt-6 pb-1">
                        {screen == 'phone' && (
                            <>
                                <BaseText className="pl-1 pb-2 text-[#171B4B]">Phone</BaseText>
                                <PhoneInput
                                    key={1}
                                    ref={phoneInput}
                                    defaultValue={phoneNumber}
                                    containerStyle={style.textInput}
                                    defaultCode="NZ"
                                    layout="first"
                                    onChangeText={(number) => onChangeNumber(number)}
                                    disableArrowIcon
                                    countryPickerProps={{
                                        countryCodes: ['NZ'],
                                    }}
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
                                    onChangeText={(text) => onChangeEmail(text)}
                                />
                            </>
                        )}
                        {numberValidError && (
                            <BaseText className="pt-2 pl-2 text-red-500">
                                {numberValidError}
                            </BaseText>
                        )}
                        <BaseText className="pl-1 pt-3 pb-2 text-[#171B4B]">Password</BaseText>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <TextInput
                                secureTextEntry={passwordVisible ? false : true}
                                style={style.emailInput}
                                returnKeyType="go"
                                defaultValue={password}
                                placeholder="Enter your password"
                                onChangeText={(text) => onChangePassword(text)}
                            />
                            <Icon
                                style={{ position: 'absolute', right: 20 }}
                                name={passwordVisible ? 'eye' : 'eye-off-sharp'}
                                color="#8B8DA5"
                                size={24}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                            />
                        </View>
                        {passwordValidError && (
                            <BaseText className="pt-2 pl-2 text-red-500">
                                {passwordValidError}
                            </BaseText>
                        )}
                        <TouchableOpacity className="w-1/2 mx-auto" onPress={() => {}}>
                            <View className="pt-4 justify-center items-center">
                                <BaseText className="text-[#0076FF] text-base">
                                    Forgot password?
                                </BaseText>
                            </View>
                        </TouchableOpacity>
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
                        textStyle={style.textStyle}
                        buttonText={
                            screen == 'email' ? 'Continue with phone' : 'Continue with email'
                        }
                        onPress={() => {
                            setScreen(screen == 'email' ? 'phone' : 'email');
                            setNumberValidError('');
                        }}
                    />
                    <View className="pt-10 justify-center items-center">
                        <BaseText className="text-[#171B4B] text-base">Or sign in with</BaseText>
                    </View>
                    <View className="pt-6 justify-center items-center">
                        <Icon
                            name="logo-google"
                            onPress={googleSignin}
                            style={style.google}
                            size={32}
                        />
                    </View>
                    <View className="flex-row justify-center mt-12">
                        <BaseText className="text-[#171B4B]">New to HealthE? </BaseText>
                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                            <BaseText className="font-medium text-[#0076FF]">
                                Create a new account
                            </BaseText>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <View style={{ height: 100 }} />
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
