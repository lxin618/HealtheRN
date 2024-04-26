import { View } from 'react-native';
import BaseText from '../components/BaseText';
import Button from '../components/Button';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';

export const Home = () => {
    const { setAccessToken } = useContext(AuthContext);
    return (
        <View className="flex h-screen">
            <BaseText className="m-auto">Home</BaseText>
            <Button
                style={{ margin: 'auto', marginBottom: 200 }}
                buttonText="Signout"
                onPress={() => {
                    setAccessToken('');
                }}
            />
        </View>
    );
};
