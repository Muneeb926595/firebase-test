import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppIcon, AppText, Conditional } from '..';
import { AppIconName } from '../icon/types';
import { Colors, Layout } from '../../../globals';
import { itemLayout, styles } from './styles';
import { SvgXml } from 'react-native-svg';
import { tickIconBlack } from '../icon/custome-icons';


const ListItem = React.memo(
    (props: { item: any; onPress: () => void }) => {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
                <View style={styles.itemLeftContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: Layout.widthPercentageToDP(6) }}>
                            <Conditional ifTrue={props?.item?.isSelected} >
                                <SvgXml xml={tickIconBlack} />
                            </Conditional>
                        </View>
                        <AppText
                            style={styles.countryName}
                            maxNumberOfLines={1}
                        >
                            {props?.item?.label}
                        </AppText>
                    </View>

                    <Conditional ifTrue={props?.item?.symbol} >
                        <AppText style={styles.countryCode}>{props?.item?.symbol}</AppText>
                    </Conditional>
                </View>
            </TouchableOpacity>
        );
    },
    (prev, next) => {
        return prev.item === next.item;
    }
);

export const DropDownListModal = ({ data, handleItemSelected, headerTitle, setIsModalVisible }) => {
    const renderItem = (info) => {
        return <ListItem item={info.item} onPress={handleOnPress(info.item)} />;
    };
    const renderSeparator = () => <View style={styles.separator} />;

    const handleOnPress = (selectedItem) => () => {
        setIsModalVisible(false)
        if (typeof handleItemSelected === 'function') {
            handleItemSelected(selectedItem)
        }
    };
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.headerContainer}>
                <AppText style={styles.screenTitle}>{headerTitle}</AppText>
                <TouchableOpacity onPress={() => { setIsModalVisible(false) }} >
                    <AppIcon
                        name={AppIconName.cross}
                        color={Colors.foreground}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                ListFooterComponent={renderSeparator}
                getItemLayout={itemLayout}
            />
        </SafeAreaView>
    )
}