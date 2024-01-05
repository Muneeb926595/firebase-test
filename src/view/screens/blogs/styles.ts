import {StyleSheet} from 'react-native';

import {Colors, Fonts, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  screenContent: {
    paddingHorizontal: Layout.widthPercentageToDP(Layout.tiny),
  },
  message: {
    textAlign: 'center',
    color: Colors.brand['DEFAULT'],
    fontSize: Layout.RFValue(22),
    ...Fonts.poppinsRegular,
  },
  error: {
    color: Colors.red,
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(12),
  },
});
