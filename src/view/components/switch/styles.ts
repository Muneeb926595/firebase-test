import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../globals';

const SWITCH_BUTTON_PADDING = Layout.widthPercentageToDP(1);

export const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 100,
    paddingVertical: Layout.heightPercentageToDP(1.4),
  },
  switchButton: {
    position: 'absolute',
    left: SWITCH_BUTTON_PADDING,
    borderRadius: 100,
  },
});
