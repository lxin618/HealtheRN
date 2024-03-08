import React from 'react';
import {AppNavigation} from './src/navigations';
import {RootSiblingParent} from 'react-native-root-siblings';

const App = () => {
  return (
    <>
      <RootSiblingParent>
        <AppNavigation />
      </RootSiblingParent>
    </>
  );
};

export default App;
