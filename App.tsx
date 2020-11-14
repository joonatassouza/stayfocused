import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import App from './src';
import AppProviders from './src/hooks';

const jsdevstayfocusedApp = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProviders>
      <StatusBar barStyle="light-content" backgroundColor="#F25D27" />
      <App />
    </AppProviders>
  );
};

export default jsdevstayfocusedApp;
