import Toast from 'react-native-root-toast';
import { API_URL } from '../../env/env.json';
import { SnackBar } from '../utils/Toast';
import { Keyboard } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignupResponseType } from '../helper/signupResponseType';

interface SigninResponse {
    accessToken: string;
    refreshToken: string;
    customer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        birthday: string;
        accountSetup: boolean;
        alcohol: boolean | null;
        chronic: boolean | null;
        diabetes: boolean | null;
        highBloodPressure: boolean | null;
        highCholesterol: boolean | null;
        overweight: boolean | null;
        smoker: boolean | null;
    };
}

export const useSignin = () => {
    const { setLoading, setAccessToken, setCustomer } = useContext(AuthContext);

    const signin = async (
        type: string,
        value: string,
        password: string
    ): Promise<null | SignupResponseType> => {
        Keyboard.dismiss();
        if (!value || !password) {
            return null;
        }
        const url = `${API_URL}/api/auth/login`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value, password, type }),
            });
            const res = await response.json();
            const statusCode = response.status;
            if (statusCode != 200) {
                SnackBar.show(`😕 ${res}`, 'error');
                return null;
            } else {
                // set context
                const { accessToken, refreshToken, customer } = res;
                await AsyncStorage.setItem('refreshToken', refreshToken);
                await AsyncStorage.setItem('accessToken', accessToken);
                // set context
                setAccessToken(accessToken);
                setCustomer(customer);
                setLoading(false);
                return res;
            }
        } catch (error) {
            SnackBar.show(`😕 Something has gone wrong, please try again later`, 'error');
            return null;
        }
    };
    return { signin };
};
