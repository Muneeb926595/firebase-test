import { StyleSheet } from "react-native";
import { Colors, Layout } from "../../../globals";

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    paddingHorizontal: Layout.widthPercentageToDP(Layout.medium / Layout.divisionFactorForWidth)
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.transparent,
    zIndex: 1,
  },
  backgroundImageStyle: {
    flex: 1,
  },
});
