import React, { useState } from 'react';
import { StyleProp, TextInput, ViewStyle, } from 'react-native';
import { styles } from './styles';
import { FieldError } from 'react-hook-form';
import { Colors } from '../../../globals';

type Props = {
    placeholder?: string,
    onChange: (value: any) => void,
    handleTogglePassword?: () => void,
    value: string,
    onBlur: any,
    maxLength?: number,
    selectionColor?: string,
    enablesReturnKeyAutomatically?: boolean,
    isError?: boolean | FieldError,
    customStyles?: StyleProp<ViewStyle>
}

export const TextArea = ({ placeholder, onChange, maxLength, selectionColor, onBlur, enablesReturnKeyAutomatically, value, isError, customStyles }: Props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        onBlur(e)
        setIsFocused(false);
    };

    const getInputBackgroundColor = () => {
        return isError ? `${Colors.actions['DEFAULT']}20` : isFocused ? `${Colors.brand['DEFAULT']}20` : Colors.surface['400']
    }

    const getInputBorderColor = () => {
        return isError ? Colors.actions['DEFAULT'] : isFocused ? Colors.brand['DEFAULT'] : Colors.transparent
    }

    const getInputTextColor = () => {
        return value?.length > 0 ? Colors.typography['DEFAULT'] : Colors.surface['500']
    }
    return (
        <TextInput
            value={value}
            onChangeText={onChange}
            multiline
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={maxLength}
            underlineColorAndroid={Colors.transparent}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically || true}
            selectionColor={selectionColor || Colors.brand['DEFAULT']}
            placeholderTextColor={isError ? Colors.red : Colors.typography['100']}
            placeholder={placeholder}
            style={[
                styles.textArea,
                {
                    borderColor: getInputBorderColor(),
                    backgroundColor: getInputBackgroundColor(),
                    color: getInputTextColor()
                },
                customStyles,
            ]}
        />
    );
};