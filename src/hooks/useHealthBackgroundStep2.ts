import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface HealthBackgroundData {
    highCholesterol?: number;
    diabetes?: number;
    historicalFamilyDiseases?: number;
}

export const useHealthBackgroundStep2 = (params: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const schema = yup.object().shape({
        highCholesterol: yup.number().notRequired().nonNullable(),
        diabetes: yup.number().notRequired().nonNullable(),
        historicalFamilyDiseases: yup.number().notRequired().nonNullable(),
    });
    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isValid, isSubmitting },
    } = useForm<HealthBackgroundData>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            highCholesterol: 2,
            diabetes: 2,
            historicalFamilyDiseases: 2,
        },
    });
    const onPressSend = async (formData: HealthBackgroundData) => {
        Keyboard.dismiss();
        console.log('asdasdasdasdad', { ...formData, ...params });
        // navigate to the next screen with the data from the form
        // navigation.navigate('HealthBackgroundStep2', { ...formData });
        // try {
        //   // const response = await axiosAuth(`${API_URL}/api/auth/register`, {
        //   //   method: 'POST',
        //   //   headers: {'Content-Type': 'application/json'},
        //   //   body: JSON.stringify(formData),
        //   // });
        //   // adding gender and setups
        //   const response = await axiosAuth.patch(
        //     `${API_URL}/api/customer/profile`,
        //     JSON.stringify(formData),
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Access-Control-Allow-Origin': '*'
        //         },
        //     });
        //     console.log(response)
        //   // // const res = await response.json();
        //   // const statusCode = response.status;
        //   // if (statusCode != 200) {
        //   //   SnackBar.show(`😕 ${response}`, 'error');
        //   //   return null;
        //   // } else {
        //   //   // const {accessToken, refreshToken} = response;
        //   //   // save tokens in keychain
        //   //   await Keychain.setGenericPassword('token', accessToken, {
        //   //       service: authKeychainService,
        //   //   })
        //   //   await AsyncStorage.setItem('refreshToken', refreshToken);
        //   //   navigation.navigate('AccountSetup');
        //   // }
        // } catch (error) {
        //   SnackBar.show(
        //     `😕 Something has gone wrong, please try again later`,
        //     'error',
        //   );
        //   return null;
        // }
    };

    return {
        data: {
            control,
            errors,
            isValid,
            isSubmitting,
        },
        operations: {
            handleSubmit,
            getValues,
            onPressSend,
            setValue,
        },
    };
};
