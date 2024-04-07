import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Keyboard} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { RefObject } from 'react';
import {API_URL} from '../../env/env.json';
import { SnackBar } from '../utils/Toast';
// import * as Keychain from 'react-native-keychain';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
}

export const useRegister = (phoneInput: RefObject<PhoneInput>, type: string, value: string) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('First name is required')
      .email('Please enter a valid email address'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must contain at least 6 characters')
      .matches(/^(?=.*[A-Z])/, 'Password must contain one uppercase character'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last Name is required'),
    // needs to be at least 16 years old
    birthday: yup.string()
        .required('Birthday is required')
        .test('valid-phone-number', 'You must be at least 16 years old', text => {
            const date = text.split("/")
            if (date.length === 3 && date[2].length === 4) {
                return new Date().getFullYear() - Number(date[2]) >= 16;
            }
            return false;
        }),
    phone: yup.string().required('Phone number is required')
      .test('valid-phone-number', 'Phone number is not valid', text => {
        return phoneInput.current?.isValidNumber(text);
      }),
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors, isValid, isSubmitting},
  } = useForm<SignupFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: (type == 'email' ? value : ''),
      password: '',
      firstName: '',
      lastName: '',
      phone: (type == 'phone' ? value.substring(3) : ''),
      birthday: '',
    },
  });
  const onPressSend = async (formData: SignupFormData) => {
    Keyboard.dismiss();
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const res = await response.json();
      const statusCode = response.status;
      if (statusCode != 200) {
        SnackBar.show(`😕 ${res}`, 'error');
        return null;
      } else {
        // save tokens in keychain
        const {accessToken, refreshToken} = res;
        // await Keychain.setGenericPassword('accessToken', accessToken);
        // await Keychain.setGenericPassword('refreshToken', refreshToken);
        
      }
    } catch (error) {
      SnackBar.show(
        `😕 Something has gone wrong, please try again later`,
        'error',
      );
      return null;
    }
  };

  return {
    data: {
      control,
      errors,
      isValid,
    },
    operations: {
      handleSubmit,
      getValues,
      onPressSend,
      setValue,
    },
  };
};
