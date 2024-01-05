import {Platform, StyleSheet} from 'react-native';
import {Layout, Fonts, Colors} from '../../../globals';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Layout.widthPercentageToDP(
      Layout.mini / Layout.divisionFactorForWidth,
    ),
    marginVertical: Layout.heightPercentageToDP(
      Layout.micro / Layout.divisionFactorForHeight,
    ),
  },
  input: {
    borderRadius: Layout.widthPercentageToDP(
      Layout.mini / Layout.divisionFactorForWidth,
    ),
    backgroundColor: Colors.background,
    paddingVertical: Layout.heightPercentageToDP(
      Platform.select({ios: Layout.small, android: Layout.mini}) /
        Layout.divisionFactorForHeight,
    ),
    borderColor: Colors.typography['DEFAULT'],
    ...Fonts.poppinsRegular,
    flex: 1,
    borderWidth: 0,
    height: '100%',
    marginVertical: Layout.zero,
  },
  leftIconContainer: {
    paddingHorizontal: Layout.widthPercentageToDP(
      Layout.small / Layout.divisionFactorForWidth,
    ),
  },
});
