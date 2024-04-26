import React from 'react';
import { AppNavigation } from './src/navigations';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import { AuthProvider } from './src/context/authContext';

const App = () => {
    return (
        <AuthProvider>
            <RootSiblingParent>
                <AppNavigation />
                <Toast />
            </RootSiblingParent>
        </AuthProvider>
    );
};

export default App;
