import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { TabScreenProps } from '../types';
import { Container, } from '../../components';


export const HomeScreen = (props: TabScreenProps<'HomeScreen'>) => {


    return (
        <Container hasScroll>
            <View style={styles.container}>
                <View style={styles.screenContent} >

                </View>
            </View>
        </Container>
    );
};
