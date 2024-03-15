import React from 'react';
import {AppNavigation} from './src/navigations';
import {RootSiblingParent} from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

const App = () => {
  return (
    <>
      <RootSiblingParent>
        <AppNavigation />
        <Toast />
      </RootSiblingParent>
    </>
  );
};

export default App;
