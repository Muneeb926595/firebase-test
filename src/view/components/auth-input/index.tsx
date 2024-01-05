import React, { useState } from 'react';
import { StyleProp, TextInput, TouchableOpacity, View, ViewStyle, } from 'react-native';
import { styles } from './styles';
import { Colors, Layout } from '../../../globals';
import { Conditional } from '../conditional';
import { AppIcon } from '../icon';
import { AppIconName } from '../icon/types';
import { FieldError } from 'react-hook-form';

type Props = {
    secure?: boolean,
    showPass?: boolean,
    isPassword?: boolean,
    placeholder?: string,
    leftIcon?: React.ReactElement,
    onChange: (value: any) => void,
    handleTogglePassword?: () => void,
    value: string,
    onBlur: any,
    isError?: boolean | FieldError,
    customStyles?: StyleProp<ViewStyle>
}

export const AuthInput = ({ secure, leftIcon, isPassword, handleTogglePassword, showPass, placeholder, onChange, value, onBlur, isError, customStyles }: Props) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        onBlur(e)
        setIsFocused(false);
    };

    const getInputBorderColor = () => {
        return isError ? Colors.actions['DEFAULT'] : isFocused ? Colors.brand['DEFAULT'] : Colors.transparent
    }

    const getInputBackgroundColor = () => {
        return isError ? `${Colors.actions['DEFAULT']}20` : isFocused ? `${Colors.brand['DEFAULT']}20` : Colors.surface['400']
    }

    const getInputTextColor = () => {
        return value?.length > 0 ? Colors.typography['DEFAULT'] : Colors.surface['500']
    }

    const RenderInput = (
        <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholderTextColor={isError ? Colors.actions['DEFAULT'] : Colors.typography['100']}
            placeholder={placeholder}
            style={[
                styles.input,
                {
                    backgroundColor: Colors.transparent,
                    color: getInputTextColor()
                },
                customStyles
            ]}
            secureTextEntry={secure && !showPass}
        />
    )

    return (
        <>
            <View style={[styles.inputContainer, { borderColor: getInputBorderColor(), backgroundColor: getInputBackgroundColor() }]}>
                {/* render left icon */}
                <View style={styles.leftIconContainer}>
                    <Conditional ifTrue={leftIcon}>
                        {leftIcon}
                    </Conditional>
                </View>

                {/* render input field */}
                {RenderInput}

                {/* render right icon / passwords icon */}
                {isPassword && <TouchableOpacity onPress={() => { if (typeof handleTogglePassword === 'function') { handleTogglePassword() } }} style={{ paddingRight: Layout.widthPercentageToDP(Layout.small / Layout.divisionFactorForWidth) }}>
                    {showPass ? <AppIcon
                        name={AppIconName.hidePassword}
                        color={Colors.surface['500']}
                    /> : <AppIcon
                        name={AppIconName.showPassword}
                        color={Colors.surface['500']}
                    />}
                </TouchableOpacity>}
            </View>
        </>
    );
};