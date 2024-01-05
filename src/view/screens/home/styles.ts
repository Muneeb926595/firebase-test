import {StyleSheet} from 'react-native';

import {Colors, Fonts, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  screenContent: {
    paddingHorizontal: Layout.widthPercentageToDP(Layout.tiny),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    color: Colors.brand['DEFAULT'],
    fontSize: Layout.RFValue(22),
    ...Fonts.poppinsRegular,
  },
});
