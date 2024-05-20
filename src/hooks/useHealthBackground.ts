import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { INDEX_VALUE_KEY_MAPINNG } from '../utils/Tabs';

interface HealthBackgroundData {
    highBloodPressure?: number;
    overweight?: number;
    smoke?: number;
    alcohol?: number;
}

export const useHealthBackground = (params: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const schema = yup.object().shape({
        highBloodPressure: yup.number().notRequired().nonNullable(),
        overweight: yup.number().notRequired().nonNullable(),
        smoke: yup.number().notRequired().nonNullable(),
        alcohol: yup.number().notRequired().nonNullable(),
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
            highBloodPressure: 2,
            overweight: 2,
            smoke: 2,
            alcohol: 2,
        },
    });
    const onPressSend = async (formData: HealthBackgroundData) => {
        Keyboard.dismiss();
        // convert value of formdata from index to string value
        for (const [key, value] of Object.entries(formData)) {
            // let dynamicKey = key as keyof typeof formData;
            (formData as any)[key] = INDEX_VALUE_KEY_MAPINNG[value];
        }
        // navigate to the next screen with the data from the form
        navigation.navigate('HealthBackgroundStep2', { ...formData, ...params });
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
