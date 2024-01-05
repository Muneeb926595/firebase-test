import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import _ from 'lodash';

import { Colors } from '../../globals';
import { linkingConfigs } from './deep-links'

import { navigationRef } from './navigation-utils';
import { MainBottomTabsParamList, MainStackParamList } from './types';
import { AppIconName, } from '../components/icon/types';
import { AppIcon, Conditional } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import StorageHelper, { StorageKeys } from '../../utils/StorageHelper';
import { useFirstTimeAppOpen } from '../../hooks';
import { LoginScreen, OnboardingScreen } from '../screens/auth';
import { HomeScreen, SettingsScreen } from '../screens';

const MainAppStack = createNativeStackNavigator<MainStackParamList>();
const MainTabs = createBottomTabNavigator<MainBottomTabsParamList>();

/**
 * Define core App navigator
 */
export const AppNavigator = () => {
  const dispatch = useDispatch()

  const isFirstTime = useFirstTimeAppOpen();
  const [showOnboarding, setShowOnboarding] = useState(true)

  const { authenticated } = useSelector(({ Homfford }: any) => Homfford.auth);

  const routeNameRef = useRef<string>();

  const handleNavContainerReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name;
  };

  const handleNavStateChanged = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      // handle Analytics
    }
    routeNameRef.current = currentRouteName;
  };

  const checkUserAuthentication = async () => {
    const userId = await StorageHelper.getItem(
      StorageHelper.StorageKeys.USER_ID,
    );
    const accessToken = await StorageHelper.getItem(
      StorageHelper.StorageKeys.Access_Token,
    );

    if (!authenticated) {
      if (userId && accessToken) {
        // dispatch(authenticateUser(true) as any)
      } else if (isFirstTime) { } else {
        // await magicSheet.show(() => <Signup />, { backgroundStyle: { backgroundColor: Colors.background }, animationConfigs: { duration: 5 }, snapPoints: [Layout.heightPercentageToDP((Layout.xxxlarge * 7.3) / Layout.divisionFactorForHeight)] });
        // dispatch(authenticateUser(false) as any)
      }
    }
  };

  useEffect(() => {
    checkUserAuthentication();

    if (isFirstTime && showOnboarding) {
      setShowOnboarding(true)
    } else {
      setShowOnboarding(false)
    }
  }, [authenticated, isFirstTime]);

  const RenderAppNavigations = (
    <NavigationContainer ref={navigationRef} linking={linkingConfigs} onReady={handleNavContainerReady} onStateChange={handleNavStateChanged}>
      <MainAppStack.Navigator>
        {
          authenticated ?
            <MainAppStack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
            :
            AuthFlow
        }
      </MainAppStack.Navigator>
    </NavigationContainer>
  )

  return (
    <Conditional ifTrue={isFirstTime && showOnboarding} elseChildren={RenderAppNavigations}>
      <OnboardingScreen
        onComplete={async () => { await StorageHelper.saveItem(StorageKeys.IS_APP_OPEND_FIRSTTIME, 'false'); setShowOnboarding(false) }}
        onSkip={async () => { await StorageHelper.saveItem(StorageKeys.IS_APP_OPEND_FIRSTTIME, 'false'); setShowOnboarding(false) }} />
    </Conditional>

  );
};

const AuthFlow = (
  <MainAppStack.Group
    navigationKey="Auth"
    screenOptions={{
      title: '',
      headerBackTitleVisible: false,
      headerShadowVisible: false,
    }}
  >
    <MainAppStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
  </MainAppStack.Group>
);

/**
 * Define Tab navigator
 */
const TabsNavigator = () => {
  return (
    <MainTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: Colors.brand['DEFAULT'],
        tabBarInactiveTintColor: Colors.foreground,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'HomeScreen':
              return <AppIcon
                name={focused ? AppIconName.homeFilled : AppIconName.home}
                color={color}
              />;
            case 'SettingsScreen':
              return <AppIcon
                name={focused ? AppIconName.portfolioFilled : AppIconName.portfolio}
                color={color}
              />;
            default:
              return '';
          }
        },
      })}
    >
      <MainTabs.Screen name="HomeScreen" component={HomeScreen} options={{ tabBarLabel: "Home" }} />
      <MainTabs.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
        }}
      />
    </MainTabs.Navigator>
  );
};