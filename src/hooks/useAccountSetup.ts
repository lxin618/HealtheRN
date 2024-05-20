import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SetupFormData {
    ethnicity: string;
    height?: string;
    weight?: string;
}

export const useAccountSetup = (gender: string) => {
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
        formState: { errors, isValid, isSubmitting },
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
        // navigate to the next screen with the data from the form
        navigation.navigate('HealthBackground', { ...formData, gender });
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
