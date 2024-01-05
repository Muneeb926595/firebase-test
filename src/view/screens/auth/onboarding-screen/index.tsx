import React from 'react';
import _ from 'lodash';
import { StatusBar, StyleSheet } from 'react-native';
import { Images, Layout } from '../../../../globals';
import { LocaleProvider } from '../../../../localisations/locale-provider';
import { Carousel } from '../../../components';

type CarouselData = {
    source?: string;
    heading?: React.ReactNode;
    onComplete?: () => void;
    onSkip?: () => void;
    description?: string;
    id: string | number;
};
export const OnboardingScreen = (props) => {

    const carouselData: CarouselData[] = [
        {
            source: Images.WelcomeCarousel1,
            description: LocaleProvider.formatMessage(LocaleProvider.IDs.label.WelcomeCarouselDescription1 || ''),
            id: 1,
        },
        {
            source: Images.WelcomeCarousel2,
            description: LocaleProvider.formatMessage(LocaleProvider.IDs.label.WelcomeCarouselDescription2 || ''),
            id: 2,
        },
        {
            source: Images.WelcomeCarousel3,
            description: LocaleProvider.formatMessage(LocaleProvider.IDs.label.WelcomeCarouselDescription3 || ''),
            id: 3,
        },
        {
            source: Images.WelcomeCarousel4,
            description: LocaleProvider.formatMessage(LocaleProvider.IDs.label.WelcomeCarouselDescription4 || ''),
            id: 4,
        },
        {
            source: Images.WelcomeCarousel5,
            description: LocaleProvider.formatMessage(LocaleProvider.IDs.label.WelcomeCarouselDescription5 || ''),
            id: 5,
        },
    ];

    return (
        <>
            <StatusBar barStyle="light-content" />
            <Carousel onComplete={props?.onComplete} onSkip={props?.onSkip} data={carouselData} />
        </>
    );
};


