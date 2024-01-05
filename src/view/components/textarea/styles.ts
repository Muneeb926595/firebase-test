import {Platform, StyleSheet} from 'react-native';

import {Colors, Layout, Fonts} from '../../../globals';

export const styles = StyleSheet.create({
  textArea: {
    borderRadius: Layout.widthPercentageToDP(1),
    color: Colors.surface['DEFAULT'],
    backgroundColor: Colors.background,
    paddingVertical: Layout.heightPercentageToDP(
      Platform.select({ios: Layout.small, android: Layout.mini}) /
        Layout.divisionFactorForHeight,
    ),
    borderColor: Colors.divider,
    borderWidth: 1,
    paddingHorizontal: Layout.widthPercentageToDP(
      Layout.medium / Layout.divisionFactorForWidth,
    ),
    marginVertical: Layout.heightPercentageToDP(
      Layout.micro / Layout.divisionFactorForHeight,
    ),
    ...Fonts.poppinsRegular,
    height: Layout.heightPercentageToDP(14),
    textAlignVertical: 'top',
    paddingTop: Layout.heightPercentageToDP(1),
  },
});
