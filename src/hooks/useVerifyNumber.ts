import {useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {API_URL} from '../../env/env.json';
import Toast from 'react-native-root-toast';
import { SnackBar } from '../utils/Toast';

type VerifyOTPInput = {
  OTPTyped: string;
  OTPReceived: string;
  OTPExpiry: string;
};

type SendOTPRes = {
  otp: string;
  expiry: string;
  value: string;
  type: string;
};

export const useVerfiyNumber = () => {

  const phoneInput = useRef<PhoneInput>(null);

  const sendOTP = async (value: string, type: string): Promise<null | SendOTPRes> => {
    if (!value) {
      return null;
    }
    const url = `${API_URL}/api/auth/sendOtp`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({value, type}),
      });
      const res = await response.json();
      const statusCode = response.status;
      if (statusCode != 200) {
        SnackBar.show(`😕 ${res}`, 'error')
        return null;
      } else {
        return {
          otp: res.otp,
          expiry: res.expiry,
          value,
          type
        };
      }
    } catch (error) {
      SnackBar.show(`😕 Something has gone wrong, please try again later`, 'error')
      return null;
    }
  };

  const validateNumber = (
    number: string,
    phoneInput: React.RefObject<PhoneInput>,
  ): boolean => {
    const checkValid = phoneInput.current?.isValidNumber(number);
    if (!checkValid) {
      return false;
    } else {
      return true;
    }
  };

  const handleVerify = (codeInfo: VerifyOTPInput) => {
    const {OTPTyped, OTPReceived, OTPExpiry} = codeInfo;
    if (OTPExpiry < new Date().toISOString()) {
      SnackBar.show(`😕 Verification code is expired`, 'error')
      return false;
    } else if (OTPTyped != OTPReceived) {
      SnackBar.show(`😕 Invalid code`, 'error')
      return false;
    }
    return true;
  };

  return {
    phoneInput,
    sendOTP,
    validateNumber,
    handleVerify,
  };
};
