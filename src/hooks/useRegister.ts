import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Keyboard} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { RefObject } from 'react';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
}

export const useRegister = (phoneInput: RefObject<PhoneInput>) => {
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
    birthday: yup.string().required('Birthday is required'),
    phone: yup.string().required('Phone number is required')
      .test('valid-phone-number', 'Phone number is not valid', text => {
        return phoneInput.current?.isValidNumber(text);
      }),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
  } = useForm<SignupFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      birthday: '',
    },
  });

  const onPressSend = async (formData: SignupFormData) => {
    Keyboard.dismiss();
    try {
    } catch (error) {
      console.error(error);
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
      onPressSend,
      // updatePhoneNumber,
    },
  };
};
