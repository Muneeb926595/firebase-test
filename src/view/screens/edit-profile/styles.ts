import {Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  screenContent: {
    marginTop: Layout.heightPercentageToDP(4),
  },
  subtitle: {
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(14),
    color: Colors.surface['DEFAULT'],
    marginBottom: Layout.heightPercentageToDP(1.8),
  },
  appname: {
    ...Fonts.poppinsBold,
    fontSize: Layout.RFValue(30),
  },
  input: {
    borderRadius: Layout.widthPercentageToDP(
      Layout.mini / Layout.divisionFactorForWidth,
    ),
    color: '#000000',
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
  },
  forgotPassword: {
    alignContent: 'flex-end',
    width: '100%',
  },
  existingUserLogin: {
    flexDirection: 'row',
    marginVertical: Layout.heightPercentageToDP(
      Layout.small / Layout.divisionFactorForHeight,
    ),
  },
  error: {
    color: Colors.red,
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(12),
  },
  alreadyHaveAccount: {
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: Layout.heightPercentageToDP(
      Layout.mini / Layout.divisionFactorForHeight,
    ),
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(15),
  },
  login: {
    color: Colors.brand['300'],
    marginLeft: Layout.widthPercentageToDP(1),
    textAlign: 'center',
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(15),
  },
  datePickerContainer: {
    borderRadius: Layout.widthPercentageToDP(1),
    color: Colors.surface['DEFAULT'],
    backgroundColor: Colors.background,
    paddingVertical: Layout.heightPercentageToDP(
      Layout.small / Layout.divisionFactorForHeight,
    ),
    borderColor: Colors.surface['DEFAULT'],
    borderWidth: 1,
    paddingHorizontal: Layout.widthPercentageToDP(
      Layout.medium / Layout.divisionFactorForWidth,
    ),
    marginVertical: Layout.heightPercentageToDP(
      Layout.micro / Layout.divisionFactorForHeight,
    ),
    ...Fonts.poppinsRegular,
  },
  errorDobContainer: {
    borderColor: Colors.red,
    backgroundColor: `${Colors.red}20`,
  },
});
