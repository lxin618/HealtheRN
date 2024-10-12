import React, { ReactNode, createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
    loading: boolean;
    accessToken: string | null;
    customer: any;
    setAccessToken: (token: string) => void;
    setLoading: (loading: boolean) => void;
    setCustomer: (customer: any) => void;
}

type ContextProviderProps = {
    children?: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
    loading: true,
    accessToken: null,
    setAccessToken: () => {},
    setLoading: () => {},
    setCustomer: () => {},
    customer: null,
});

export const AuthProvider = ({ children }: ContextProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [customer, setCustomer] = useState<string | null>(null);

    const isLoggedin = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('accessToken');
            const customer = await AsyncStorage.getItem('customer');
            setAccessToken(token);
            setCustomer(customer);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isLoggedin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                loading,
                accessToken,
                customer,
                setAccessToken,
                setLoading,
                setCustomer,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
