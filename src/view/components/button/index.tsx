import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, } from "react-native";
import { useSelector } from "react-redux";
import { Colors, } from "../../../globals";
import { AppIcon } from "../icon";
import { AppIconSize } from "../icon/types";
import { styles } from "./styles";
import { Props } from "./types";

export const Button = (props: Props) => {
    const { authenticated } = useSelector(({ Homfford }: any) => Homfford.auth);

    const { onPress,
        buttonLable,
        buttonContainer,
        btnLabelStyles,
        loading,
        disabled,
        iconName,
        iconOnLeft,
        iconSize,
        authenticationRequired,
        disableBgColor,
        iconColor, } = props

    const renderButtonContent = () => {
        if (loading) {
            return <ActivityIndicator color={Colors.background} />;
        }

        return (
            <>
                {iconName && iconOnLeft && (
                    <AppIcon
                        name={iconName}
                        iconSize={iconSize ?? AppIconSize.primary}
                        color={iconColor ?? Colors.typography[300]}
                    />
                )}
                <Text style={[styles.btnLabel, btnLabelStyles]}>{buttonLable}</Text>
                {iconName && !iconOnLeft && (
                    <AppIcon
                        name={iconName}
                        iconSize={iconSize ?? AppIconSize.primary}
                        color={iconColor ?? Colors.typography[300]}
                    />
                )}
            </>
        );
    };

    return (
        <TouchableOpacity
            onPress={async () => {
                if (authenticationRequired && !authenticated) {
                    return;
                }
                onPress()
            }}
            style={[styles.buttonContainer, buttonContainer, disabled && { backgroundColor: disableBgColor ?? Colors.transparent[300] }]}
            disabled={disabled || loading}
        >
            {renderButtonContent()}
        </TouchableOpacity>
    );
};