import {StyleSheet} from 'react-native';
import {Colors, Layout} from '../../../globals';

export const styles = StyleSheet.create({
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.small,
  },
  tab: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingVertical: Layout.mini - Layout.tiny,
  },
  textCenter: {
    textAlign: 'center',
    color: Colors.brand[600],
  },
});
