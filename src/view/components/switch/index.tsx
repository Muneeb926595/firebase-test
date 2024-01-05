import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    Easing,
    Extrapolate,
    interpolateColor,
} from 'react-native-reanimated';
import { Colors, Layout } from '../../../globals';
import { styles } from './styles';

const SWITCH_BUTTON_PADDING = Layout.widthPercentageToDP(1);
const InterpolateXInput = [0, 1];

interface SwitchBtnProps {
    value: boolean;
    onValueChange?: (value: boolean) => void;
    containerStyle?: ViewStyle;
    height?: number;
    width?: number;
}

export const SwitchBtn: React.FC<SwitchBtnProps> = ({
    value,
    onValueChange,
    containerStyle,
    height = Layout.heightPercentageToDP(2.8),
    width = Layout.widthPercentageToDP(10),
    ...props
}) => {
    const BUTTON_WIDTH = width;
    const BUTTON_HEIGHT = height;
    const SWITCH_BUTTON_AREA = BUTTON_HEIGHT - SWITCH_BUTTON_PADDING;
    const shareValue = useSharedValue(value ? 1 : 0);

    const containerScale = {
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
    };
    const switchScale = {
        height: SWITCH_BUTTON_AREA - 1,
        width: SWITCH_BUTTON_AREA - 1,
    };

    const onPressSwitch = () => {
        if (typeof onValueChange === 'function' || typeof value !== 'undefined') {
            if (shareValue.value === 0) {
                shareValue.value = withTiming(1, {
                    duration: 800,
                    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                });
            } else {
                shareValue.value = withTiming(0, {
                    duration: 800,
                    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                });
            }
            onValueChange?.(!value);
        }
    };

    const switchAreaStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                        shareValue.value,
                        InterpolateXInput,
                        [0, BUTTON_WIDTH - SWITCH_BUTTON_AREA - 2 * SWITCH_BUTTON_PADDING],
                        Extrapolate.CLAMP,
                    ),
                },
            ],
            backgroundColor: interpolateColor(shareValue.value, InterpolateXInput, [
                Colors.white,
                Colors.white,
            ]),
        };
    });

    return (
        <TouchableOpacity
            onPress={onPressSwitch}
            activeOpacity={1}
            style={[
                styles.containerStyle,
                containerScale,
                containerStyle,
                {
                    backgroundColor: value
                        ? Colors.brand['DEFAULT']
                        : Colors.typography['400']
                },
            ]}
        >
            <Animated.View
                style={[styles.switchButton, switchScale, switchAreaStyles]}
            />
        </TouchableOpacity>
    );
};

