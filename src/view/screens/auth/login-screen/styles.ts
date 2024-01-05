import {Platform, StyleSheet} from 'react-native';
import {Colors, Fonts, Layout} from '../../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  screenContent: {
    marginTop: Layout.heightPercentageToDP(1),
  },
  input: {
    borderRadius: Layout.widthPercentageToDP(
      Layout.mini / Layout.divisionFactorForWidth,
    ),
    color: Colors.surface['DEFAULT'],
    backgroundColor: Colors.background,
    paddingVertical: Layout.heightPercentageToDP(
      Platform.select({ios: Layout.small, android: Layout.mini}) /
        Layout.divisionFactorForHeight,
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
  title: {
    ...Fonts.poppinsSemiBold,
    marginBottom: Layout.heightPercentageToDP(0.6),
    fontSize: Layout.RFValue(28),
  },
  titleDescription: {
    ...Fonts.poppinsRegular,
    color: `${Colors.surface['500']}80`,
    marginBottom: Layout.heightPercentageToDP(2),
    fontSize: Layout.RFValue(15),
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    backgroundColor: Colors.transparent,
    marginTop: Layout.heightPercentageToDP(1.2),
  },
  existingUserLogin: {
    flexDirection: 'row',
    marginTop: Layout.heightPercentageToDP(1.8),
    marginBottom: Layout.heightPercentageToDP(2.6),
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  error: {
    color: Colors.actions['DEFAULT'],
    ...Fonts.poppinsRegular,
    fontSize: Layout.RFValue(12),
  },
  dontHaveAccount: {
    color: Colors.typography['100'],
    textAlign: 'center',
    ...Fonts.poppinsSemiBold,
    fontSize: Layout.RFValue(15),
  },
  createAccount: {
    color: Colors.brand['DEFAULT'],
    marginLeft: Layout.widthPercentageToDP(1),
    textAlign: 'center',
    ...Fonts.poppinsSemiBold,
    fontSize: Layout.RFValue(14),
    textDecorationLine: 'underline',
  },
  forgotPasswordLabel: {
    color: Colors.typography['DEFAULT'],
    ...Fonts.poppinsSemiBold,
    fontSize: Layout.RFValue(15),
    fontWeight: '500',
  },
  socialLoginsContainer: {
    columnGap: Layout.widthPercentageToDP(3),
    width: '100%',
    alignSelf: 'center',
    marginVertical: Layout.heightPercentageToDP(4),
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.heightPercentageToDP(2),
    paddingVertical: Layout.heightPercentageToDP(1.4),
    borderColor: Colors.divider,
    borderWidth: 1,
    width: '100%',
    justifyContent: 'center',
  },
  socialLoginLabel: {
    ...Fonts.poppinsSemiBold,
    fontSize: Layout.RFValue(15),
    marginLeft: Layout.widthPercentageToDP(3),
  },
});
