import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { TabScreenProps } from '../types';
import { AppText, Container, } from '../../components';
import { useSelector } from 'react-redux';
import { FormattedMessage } from '../../../localisations/locale-formatter';
import { LocaleProvider } from '../../../localisations/locale-provider';


export const HomeScreen = (props: TabScreenProps<'HomeScreen'>) => {
    const { showWelcomeMessage, user } = useSelector(({ Homfford }: any) => Homfford.auth);

    return (
        <Container >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <AppText style={styles.message}>
                        {
                            showWelcomeMessage ?
                                <FormattedMessage id={LocaleProvider.IDs.label.welcomeMessage} values={{ name: user?.userName }} />
                                :
                                <FormattedMessage id={LocaleProvider.IDs.label.notWelcomedHere} />
                        }
                    </AppText>
                </View>
            </View>
        </Container>
    );
};
