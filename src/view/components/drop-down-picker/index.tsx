import { View, Text } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors, Layout } from '../../../globals'
import { FieldError } from 'react-hook-form'

type Props = {
    dropDownList: any,
    value: any,
    placeholder: string,
    onSelectItem?: any,
    isError?: boolean | FieldError | any;
}

export const AppDropDownPicker = ({ value, isError, onSelectItem, dropDownList, placeholder }: Props) => {
    const [open, setOpen] = useState<boolean>(false)

    const getInputBorderColor = () => {
        return isError ? Colors.red : Colors.surface['DEFAULT']
    }
    const getInputBackgroundColor = () => {
        return isError ? `${Colors.red}20` : Colors.transparent
    }
    const getInputTextColor = () => {
        return isError ? `${Colors.red}` : Colors.surface['DEFAULT']
    }

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={dropDownList}
            placeholder={placeholder}
            setOpen={setOpen}
            setValue={() => { }}
            onSelectItem={(item) => onSelectItem(item?.value)}
            style={{
                borderColor: getInputBorderColor(),
                backgroundColor: getInputBackgroundColor(),
                borderRadius: Layout.widthPercentageToDP(1),
                marginVertical: Layout.heightPercentageToDP(
                    Layout.micro / Layout.divisionFactorForHeight,
                ),
            }}
            containerStyle={{
            }}
            dropDownContainerStyle={{
                borderTopColor: Colors.brand['DEFAULT'],
                borderLeftColor: Colors.transparent,
                borderRightColor: Colors.transparent,
                borderBottomColor: Colors.transparent,
            }}
            textStyle={{
                color: getInputTextColor(),
            }}
            listMode='MODAL'
            modalAnimationType='slide'
        />
    )
}