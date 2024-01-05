import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Colors, Fonts, Layout, } from '../../../globals'
import { SmallParagraph } from '../text';
import { styles } from './styles';
import { ITab, TabsProps } from './types';

export const Tabs = ({ selectedTab, tabs, containerStyles }: TabsProps) => {
    return (
        <View style={[styles.tabsContainer, containerStyles]} >
            {
                tabs?.map((tab: ITab) =>
                    <>
                        {!tab?.isFeatureDisabled &&
                            <TouchableOpacity style={[styles.tab,
                            {
                                borderBottomWidth: selectedTab === tab?.tabName ? Layout.widthPercentageToDP(Layout.micro / Layout.divisionFactorForWidth) : 0,
                                borderBottomColor: selectedTab === tab?.tabName ? Colors.brand[600] : Colors.transparent
                            }]} onPress={tab?.onPress} >
                                <SmallParagraph style={[styles.textCenter, { ...Fonts.bold },]}>
                                    {tab?.label}
                                </SmallParagraph>
                            </TouchableOpacity>
                        }
                    </>
                )
            }
        </View>
    )
}
