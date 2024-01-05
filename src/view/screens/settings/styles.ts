import {StyleSheet} from 'react-native';

import {Colors, Fonts, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  screenContent: {
    flex: 1,
  },
  topBannerContainer: {
    backgroundColor: Colors.brand['DEFAULT'],
    paddingVertical: Layout.heightPercentageToDP(1),
    paddingHorizontal: Layout.widthPercentageToDP(2.4),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...Fonts.poppinsSemiBold,
    fontSize: Layout.RFValue(16),
    marginLeft: Layout.widthPercentageToDP(2),
    color: Colors.white,
  },
  editButtonContainer: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Layout.widthPercentageToDP(3),
    paddingVertical: Layout.heightPercentageToDP(0.8),
    backgroundColor: Colors.brand['400'],
    flexDirection: 'row',
  },
  editLabel: {
    color: Colors.brand['DEFAULT'],
    ...Fonts.poppinsMedium,
    fontSize: Layout.RFValue(14),
    marginLeft: Layout.widthPercentageToDP(1.5),
  },
  profileDetailsContainer: {
    marginTop: Layout.heightPercentageToDP(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Layout.heightPercentageToDP(4),
  },
  profilePic: {
    width: Layout.widthPercentageToDP(28),
    height: Layout.widthPercentageToDP(28),
    borderRadius: 100,
  },
  profileDetails: {
    marginLeft: Layout.heightPercentageToDP(3),
  },
  userName: {
    color: Colors.white,
    ...Fonts.poppinsSemiBold,
    fontSize: Layout.RFValue(20),
    marginBottom: Layout.heightPercentageToDP(1.6),
  },
  profileDetailsItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Layout.heightPercentageToDP(0.8),
  },
  profileDetailsItemLabel: {
    color: Colors.white,
    ...Fonts.poppinsMedium,
    fontSize: Layout.RFValue(12),
    marginLeft: Layout.widthPercentageToDP(2),
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Layout.heightPercentageToDP(1.6),
  },
  settingItemLabel: {
    color: Colors.surface['500'],
    ...Fonts.poppinsMedium,
    fontSize: Layout.RFValue(14),
    marginLeft: Layout.widthPercentageToDP(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    backgroundColor: `${Colors.brand['DEFAULT']}20`,
    borderRadius: Layout.widthPercentageToDP(1),
    paddingHorizontal: Layout.widthPercentageToDP(2),
    paddingVertical: Layout.heightPercentageToDP(0.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownLabel: {
    fontSize: Layout.RFValue(14),
    color: Colors.brand['DEFAULT'],
    fontWeight: '500',
    ...Fonts.poppinsRegular,
    marginRight: Layout.widthPercentageToDP(1),
  },
});
