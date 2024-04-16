import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Keyboard} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {RefObject} from 'react';
import {API_URL} from '../../env/env.json';
import {SnackBar} from '../utils/Toast';
import * as Keychain from 'react-native-keychain';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { authKeychainService } from '../services/Keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SetupFormData {
  ethnicity: string;
  height?: string;
  weight?: string;
}

export const useAccountSetup = (
  gender: string,
) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const schema = yup.object().shape({
    ethnicity: yup.string().required('Ethnicity is required'),
    height: yup.string(),
    weight: yup.string(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors, isValid, isSubmitting},
  } = useForm<SetupFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      ethnicity: '',
      height: '',
      weight: '',
    },
  });
  const onPressSend = async (formData: SetupFormData) => {
    Keyboard.dismiss();
    console.log(formData, gender)
    // try {
    //   const response = await fetch(`${API_URL}/api/auth/register`, {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(formData),
    //   });
    //   const res = await response.json();
    //   const statusCode = response.status;
    //   if (statusCode != 200) {
    //     SnackBar.show(`😕 ${res}`, 'error');
    //     return null;
    //   } else {
    //     const {accessToken, refreshToken} = res;
    //     // save tokens in keychain
    //     await Keychain.setGenericPassword('token', accessToken, {
    //         service: authKeychainService,
    //     })
    //     await AsyncStorage.setItem('refreshToken', refreshToken);
    //     navigation.navigate('AccountSetup');
    //   }
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
