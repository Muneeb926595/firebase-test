import {StyleSheet} from 'react-native';

import {Colors, Fonts, Layout} from '../../../globals';

export const ITEM_HEIGHT = 48;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  countryCode: {
    ...Fonts.poppinsSemiBold,
    color: Colors.typography['DEFAULT'],
    marginBottom: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: Layout.heightPercentageToDP(2),
    alignItems: 'center',
    marginHorizontal: Layout.widthPercentageToDP(
      Layout.small / Layout.divisionFactorForWidth,
    ),
    justifyContent: 'space-between',
  },
  screenTitle: {
    marginBottom: Layout.heightPercentageToDP(
      Layout.mini / Layout.divisionFactorForHeight,
    ),
    color: Colors.foreground,
    ...Fonts.poppinsBold,
    fontSize: Layout.RFValue(20),
  },
  searchInput: {
    marginHorizontal: Layout.widthPercentageToDP(
      Layout.small / Layout.divisionFactorForWidth,
    ),
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(18),
    color: Colors.typography['100'],
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.heightPercentageToDP(1.4),
    paddingHorizontal: Layout.widthPercentageToDP(
      Layout.small / Layout.divisionFactorForWidth,
    ),
  },
  itemLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryName: {
    flex: 1,
    paddingRight: Layout.widthPercentageToDP(
      Layout.small / Layout.divisionFactorForWidth,
    ),
    marginBottom: 0,
    color: Colors.typography['100'],
    ...Fonts.poppinsRegular,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Layout.widthPercentageToDP(
      Layout.small / Layout.divisionFactorForWidth,
    ),
  },
});

export const itemLayout = (data: any, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});
