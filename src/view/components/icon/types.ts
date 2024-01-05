import {StyleProp, ViewStyle} from 'react-native';

import {Layout} from '../../../globals';
import {ItemType} from '../../../types';

export type Props = {
  name: AppIconName;
  iconSize?: AppIconSize;
  type?: AppIconType | ItemType;
  style?: StyleProp<ViewStyle>;
  color?: string;
  backgroundColor?: string;
};

export enum AppIconName {
  add = 'Homfford-add',
  airBnb = 'Homfford-air-bnb',
  annualizedRentalYield = 'Homfford-annualized-rental-yield',
  backArrow = 'Homfford-back-arrow',
  bell = 'Homfford-bell',
  biometric = 'Homfford-biometric',
  camera = 'Homfford-camera',
  closedIncome = 'Homfford-closed-income',
  comment = 'Homfford-comment',
  cross = 'Homfford-cross',
  deposit = 'Homfford-deposit',
  earn = 'Homfford-earn',
  editPen = 'Homfford-edit-pen',
  email = 'Homfford-email',
  feedFlled = 'Homfford-feed-flled',
  feed = 'Homfford-feed',
  file = 'Homfford-file',
  filter = 'Homfford-filter',
  graduationCap = 'Homfford-graduation-cap',
  heart = 'Homfford-heart',
  hidePassword = 'Homfford-hide-password',
  homeFilled = 'Homfford-home-filled',
  home = 'Homfford-home',
  horizontalDots = 'Homfford-horizontal-dots',
  house = 'Homfford-house',
  id = 'Homfford-id',
  infoCircle = 'Homfford-info-circle',
  info = 'Homfford-info',
  invest = 'Homfford-invest',
  language = 'Homfford-language',
  like = 'Homfford-like',
  listDownArrow = 'Homfford-list-down-arrow',
  listRightArrow = 'Homfford-list-right-arrow',
  locationPinUnfilled = 'Homfford-location-pin-unfilled',
  locationPin = 'Homfford-location-pin',
  logout = 'Homfford-logout',
  longTermRental = 'Homfford-long-term-rental',
  moneySend = 'Homfford-money-send',
  monthlyIncome = 'Homfford-monthly-income',
  note = 'Homfford-note',
  password = 'Homfford-password',
  phone = 'Homfford-phone',
  portfolioFilled = 'Homfford-portfolio-filled',
  portfolio = 'Homfford-portfolio',
  portofilioOccupancy = 'Homfford-portofilio-occupancy',
  profileCircle = 'Homfford-profile-circle',
  rewardsFilled = 'Homfford-rewards-filled',
  rewards = 'Homfford-rewards',
  rightArrow = 'Homfford-right-arrow',
  search = 'Homfford-search',
  share = 'Homfford-share',
  showPassword = 'Homfford-show-password',
  tick = 'Homfford-tick',
  trash = 'Homfford-trash',
  trophy = 'Homfford-trophy',
  user = 'Homfford-user',
  walletFilled = 'Homfford-wallet-filled',
  wallet = 'Homfford-wallet',
  withdraw = 'Homfford-withdraw',
}

export enum AppIconSize {
  tiny = Layout.widthPercentageToDP(
    Layout.icon.size.tiny / Layout.divisionFactorForWidth,
  ),
  micro = Layout.widthPercentageToDP(
    Layout.icon.size.micro / Layout.divisionFactorForWidth,
  ),
  mini = Layout.widthPercentageToDP(
    Layout.icon.size.mini / Layout.divisionFactorForWidth,
  ),
  small = Layout.widthPercentageToDP(
    Layout.icon.size.small / Layout.divisionFactorForWidth,
  ),
  medium = Layout.widthPercentageToDP(
    Layout.icon.size.medium / Layout.divisionFactorForWidth,
  ),
  primary = Layout.widthPercentageToDP(
    Layout.icon.size.large / Layout.divisionFactorForWidth,
  ),
  xlarge = Layout.widthPercentageToDP(
    Layout.icon.size.xlarge / Layout.divisionFactorForWidth,
  ),
  xxlarge = Layout.widthPercentageToDP(
    Layout.icon.size.xxlarge / Layout.divisionFactorForWidth,
  ),
  xxxlarge = Layout.widthPercentageToDP(
    Layout.icon.size.xxxlarge / Layout.divisionFactorForWidth,
  ),
  huge = Layout.widthPercentageToDP(
    Layout.icon.size.huge / Layout.divisionFactorForWidth,
  ),
}

export enum AppIconType {
  primary = 'primary',
  info = 'info',
  action = 'action',
  success = 'success',
  error = 'error',
  pending = 'pending',
  warning = 'warning',
}
