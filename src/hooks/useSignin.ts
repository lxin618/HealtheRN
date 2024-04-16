import Toast from 'react-native-root-toast';
import {API_URL} from '../../env/env.json';
import {SnackBar} from '../utils/Toast';
import {Keyboard} from 'react-native';

export const useSignin = () => {
  const signin = async (
    type: string,
    value: string,
    password: string,
  ): Promise<null | {token: string}> => {
    Keyboard.dismiss();
    if (!value || !password) {
      return null;
    }
    const url = `${API_URL}/api/auth/login`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({value, password, type}),
      });
      const res = await response.json();
      const statusCode = response.status;
      if (statusCode != 200) {
        SnackBar.show(`😕 ${res}`, 'error');
        return null;
      } else {
        return res;
      }
    } catch (error) {
      SnackBar.show(
        `😕 Something has gone wrong, please try again later`,
        'error',
      );
      return null;
    }
  };
  return {signin};
};
