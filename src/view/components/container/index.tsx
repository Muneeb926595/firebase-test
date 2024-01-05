import React from 'react';
import {
    KeyboardAvoidingView,
    StatusBar,
    ScrollView,
    Platform,
    View,
    ImageBackground,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { styles } from './styles';
import { Props } from './types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = (props: Props) => {
    const { hasScroll, bounces, onScroll, scrollEventThrottle, options, persistTaps, insetsToHandle, containerStyles, screenBackgroundStyle } = props
    const isAndroid = Platform.OS === 'android';


    const BaseBodyContainer = (
        <View style={[styles.bodyContainer, containerStyles]} {...props} />
    );

    const BodyContent =
        options && options.backgroundImage ? (
            <ImageBackground source={options.backgroundImage} style={styles.backgroundImageStyle}>
                {BaseBodyContainer}
            </ImageBackground>
        ) : (
            BaseBodyContainer
        );

    return (
        <SafeAreaView
            style={[styles.screenContainer, screenBackgroundStyle,]}
            edges={insetsToHandle ?? ['top', 'bottom', 'left', 'right']}
        >
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={isAndroid ? null : 'padding'}
                keyboardVerticalOffset={useHeaderHeight() + StatusBar.currentHeight}>
                {hasScroll ? (
                    <ScrollView
                        bounces={bounces}
                        onScroll={onScroll}
                        scrollEventThrottle={scrollEventThrottle}
                        keyboardShouldPersistTaps={persistTaps ? 'always' : 'never'}>
                        {BodyContent}
                    </ScrollView>
                ) : (
                    <>
                        {BodyContent}
                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};