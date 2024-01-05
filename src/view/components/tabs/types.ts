import {ViewStyle} from 'react-native';
import {StyleProp} from 'react-native/types';

export enum ParaSurahTab {
  Surah = 'Surah',
  Para = 'Para',
}

export interface ITab {
  label: string;
  tabName: ParaSurahTab;
  isFeatureDisabled?: boolean;
  onPress: () => void;
}

export interface TabsProps {
  selectedTab: ParaSurahTab;
  containerStyles?: StyleProp<ViewStyle>;
  tabs?: ITab[];
}
