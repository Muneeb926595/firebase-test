import React, { useEffect, useState } from 'react';
import "./utils/ignore-warnings"
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Provider } from 'react-redux';
import firebase from '../firebase.js'

import { Constants } from './globals';
import { LocaleProvider } from './localisations/locale-provider';
import { AppNavigator } from './view/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MagicSheetPortal } from 'react-native-magic-sheet';
import store from './stores';
import StorageHelper, { StorageKeys } from './utils/StorageHelper';
import { AppError } from './utils/error/app-error';



export default function App() {
  const [appLocaleProviderReady, setAppLocaleProviderReady] = useState(false);

  useEffect(() => {
    (async () => {
      await initAppAssets();
      setAppLocaleProviderReady(true);
      SplashScreen.hide();
    })();
  }, [])

  /**
   * Setup and init Locale provider, api, and repositories
   */
  const initAppAssets = async () => {
    let appLocale = Constants.DEFAULT_APP_LOCALE;
    try {
      appLocale = await StorageHelper.getItem(StorageKeys.SELECTED_APP_LANGUAGE) as string;
    } catch (e) {
      throw new AppError('App.tsx', 'initLocaleProvider', e);
    }
    await LocaleProvider.init(appLocale);
  };

  return appLocaleProviderReady ? (
    <Provider store={store}>
      <LocaleProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <MagicSheetPortal />
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <AppNavigator />
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </LocaleProvider>
    </Provider>
  ) : null;
}
