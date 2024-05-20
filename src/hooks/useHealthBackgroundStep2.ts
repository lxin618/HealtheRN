import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SnackBar } from '../utils/Toast';
import axiosAuth from '../middleware/axiosAuth';
import { API_URL } from '../../env/env.json';
import { INDEX_VALUE_KEY_MAPINNG } from '../utils/Tabs';

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
        // convert value of formdata from index to string value
        for (const [key, value] of Object.entries(formData)) {
            // let dynamicKey = key as keyof typeof formData;
            (formData as any)[key] = INDEX_VALUE_KEY_MAPINNG[value];
        }
        try {
            const response = await axiosAuth.patch(
                `${API_URL}/api/customer/profile`,
                JSON.stringify({ ...formData, ...params }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
            );
            const statusCode = response.status;
            if (statusCode != 200) {
                SnackBar.show(`😕 ${response}`, 'error');
                return null;
            } else {
                navigation.navigate('Home');
            }
        } catch (error) {
            SnackBar.show(`😕 Something has gone wrong, please try again later`, 'error');
            return null;
        }
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
