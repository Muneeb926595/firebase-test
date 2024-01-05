import React, { useRef, useState } from 'react';
import { View, Animated, TouchableOpacity, ImageBackground } from 'react-native';

import { Colors, Layout } from '../../../globals';
import { styles } from './styles';
import { Button } from '../button';
import { LocaleProvider } from '../../../localisations/locale-provider';
import { AppText, } from '../text';
import { Conditional } from '../conditional';
import { FormattedMessage } from '../../../localisations/locale-formatter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

const renderListItem = ({ item }: any) => {
    return (
        <ImageBackground
            source={item?.source as any}
            resizeMode={'cover'}
            style={{
                flex: 1,
                width: '100%',
                height: '100%'
            }}>
            <SafeAreaView>
                <View style={styles.container} >
                    <AppText style={styles.appLogo}>
                        <FormattedMessage id={LocaleProvider.IDs.label.firebaseTest} />
                    </AppText>
                    <AppText style={styles.description}>
                        {item?.description}
                    </AppText>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export const Carousel = ({ data, onComplete, onSkip }: any) => {
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, Layout?.window?.width);
    const [currentPage, setCurrentPage] = useState(0);
    const flatListRef = useRef(null);

    const handleNext = () => {
        if (currentPage < data.length - 1) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);

            const scrollPosition = nextPage * Layout.window.width;

            flatListRef.current?.scrollToOffset({
                offset: scrollPosition,
                animated: true,
            });
        } else {
            if (typeof onComplete === 'function') {
                onComplete()
            }
        }
    };

    if (data && data.length) {

        return (
            <View>
                <Animated.FlatList
                    data={data}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    ref={flatListRef}
                    pagingEnabled
                    style={{
                        backgroundColor: Colors?.foreground
                    }}
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderListItem}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                />

                <View style={styles.carouselFooterContainer}>
                    <View style={styles.dotView}>
                        {data.map((_: any, i: number) => {
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1],
                                outputRange: [0.2, 1, 0.2],
                                extrapolate: 'clamp',
                            });
                            return <Animated.View key={i} style={[{ opacity }, styles.animatedView]} />;
                        })}
                    </View>
                    <Button
                        onPress={handleNext}
                        buttonLable={LocaleProvider.formatMessage(LocaleProvider.IDs.general.next)}
                        authenticationRequired={false}
                        btnLabelStyles={{
                            color: Colors.white,
                        }}
                        buttonContainer={{
                            backgroundColor: Colors.brand['DEFAULT'],
                            width: '92%',
                        }}
                    />
                    <Conditional ifTrue={typeof onSkip === 'function'}>
                        <TouchableOpacity onPress={onSkip} style={styles.skipContainer}>
                            <AppText style={styles.skip} >
                                <FormattedMessage id={LocaleProvider.IDs.general.skip} />
                            </AppText>
                        </TouchableOpacity>
                    </Conditional>
                </View>
            </View>
        );
    }
    return null;
};

