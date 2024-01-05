import {StyleSheet} from 'react-native';

import {Colors, Fonts, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    width: Layout.window.width,
    height: Layout.window.height,
  },
  description: {
    ...Fonts.poppinsSemiBold,
    color: Colors.white,
    textAlign: 'center',
    fontSize: Layout.RFValue(16),
    marginHorizontal: Layout.widthPercentageToDP(2),
    marginTop: Layout.heightPercentageToDP(45),
  },
  animatedView: {
    height: Layout.mini,
    width: Layout.mini,
    backgroundColor: Colors.background,
    margin: Layout.mini,
    marginHorizontal: Layout.micro,
    borderRadius: Layout.widthPercentageToDP(1.5),
  },
  appLogo: {
    textAlign: 'center',
    ...Fonts.poppinsBold,
    fontSize: Layout.RFValue(32),
    color: Colors.white,
  },
  carouselFooterContainer: {
    position: 'absolute',
    zIndex: 100,
    bottom: Layout.heightPercentageToDP(3),
    left: 0,
    right: 0,
  },
  skipContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.heightPercentageToDP(2.8),
    alignSelf: 'center',
    paddingHorizontal: Layout.widthPercentageToDP(7.4),
    paddingVertical: Layout.heightPercentageToDP(0.8),
    marginBottom: Layout.heightPercentageToDP(2),
  },
  skip: {
    color: Colors.background,
    textAlign: 'center',
    fontSize: Layout.RFValue(12),
  },
});
