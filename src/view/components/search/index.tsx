import React from 'react'
import { TextInput, View } from 'react-native'
import { Colors } from '../../../globals'
import { AppIcon } from '../icon'
import { AppIconName } from '../icon/types'

import { styles } from './styles'
import { Props } from './types'

export const Search = (props: Props) => {
    const { searchText, setSearchText } = props
    return (
        <View style={styles.container} >
            <TextInput
                placeholder='Search'
                value={searchText}
                placeholderTextColor={Colors.typography[400]}
                style={styles.inputBox}
                onChangeText={setSearchText}
            />
            <AppIcon
                name={AppIconName.search}
                color={Colors.typography[500]}
            />
        </View>
    )
}