import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
  screenContent: {
    paddingHorizontal: Layout.widthPercentageToDP(Layout.tiny),
  },
  tabContainer: {
    width: '50%',
    alignSelf: 'center',
  },
});
