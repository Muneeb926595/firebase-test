import { StyleSheet } from "react-native";
import { Colors, Layout } from "../../../globals";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Layout.widthPercentageToDP(Layout.mini / Layout.divisionFactorForWidth),
        ...Layout.shadowBox.lightShallow
    },
    inputBox: {
        flex: 1,
        borderRadius: 100,
        backgroundColor: Colors.background,
        padding: Layout.heightPercentageToDP(Layout.mini / Layout.divisionFactorForHeight),
    }
})