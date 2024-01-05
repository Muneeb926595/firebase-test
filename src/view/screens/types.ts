import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainBottomTabsParamList, MainStackParamList } from '../navigation';

export type ScreenProps<RouteName extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  RouteName
>;

type AllParamsList = MainStackParamList & MainBottomTabsParamList;

export type TabScreenProps<RouteName extends keyof AllParamsList> = CompositeScreenProps<
  BottomTabScreenProps<MainBottomTabsParamList, Exclude<RouteName, keyof MainStackParamList>>,
  NativeStackScreenProps<MainStackParamList, Exclude<RouteName, keyof MainBottomTabsParamList>>
>;
