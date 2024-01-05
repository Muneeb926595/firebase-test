import {StyleSheet} from 'react-native';

import {Colors, Fonts, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  screenContent: {
    paddingHorizontal: Layout.widthPercentageToDP(Layout.tiny),
  },
  message: {
    textAlign: 'center',
    ...Fonts.poppinsBold,
    color: Colors.brand['DEFAULT'],
    fontSize: Layout.RFValue(28),
    marginBottom: Layout.heightPercentageToDP(1.8),
  },
  error: {
    color: Colors.red,
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(12),
  },
});
