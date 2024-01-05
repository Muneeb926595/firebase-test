import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { TabScreenProps } from '../types';
import { AppText, Button, Container, } from '../../components';
import { useSelector } from 'react-redux';
import { FormattedMessage } from '../../../localisations/locale-formatter';
import { LocaleProvider } from '../../../localisations/locale-provider';
import firestore from '@react-native-firebase/firestore';
import { Colors, Layout } from '../../../globals';


export const HomeScreen = (props: TabScreenProps<'HomeScreen'>) => {
    const { user } = useSelector(({ Homfford }: any) => Homfford.auth);
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    useEffect(() => {
        checkWelcomeStatus(user?.uid)
    }, [user?.uid])

    const checkWelcomeStatus = async (userId) => {
        try {
            const userDoc = await firestore().collection('users').doc(userId).get();

            if (userDoc.exists) {
                // User document exists, check the welcome status
                const userData = userDoc.data();
                setHasSeenWelcome(userData.hasSeenWelcome || false);
            } else {
                // User document doesn't exist, set initial welcome status
                setHasSeenWelcome(false);
                // Create the user document
                await firestore().collection('users').doc(userId).set({
                    hasSeenWelcome: false,
                });
            }
        } catch (error) {
            console.error('Error checking welcome status:', error);
        }
    };

    const handleWelcomeButtonClick = async () => {
        if (!hasSeenWelcome) {
            // Update the welcome status in Firestore
            try {
                await firestore().collection('users').doc(user.uid).update({
                    hasSeenWelcome: true,
                });
                setHasSeenWelcome(true);
            } catch (error) {
                console.error('Error updating welcome status:', error);
            }
        }
    };
    return (
        <Container >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <AppText style={styles.message}>
                        {
                            hasSeenWelcome ?
                                <FormattedMessage id={LocaleProvider.IDs.label.notWelcomedHere} />
                                :
                                <FormattedMessage id={LocaleProvider.IDs.label.welcomeMessage} values={{ name: user?.userName }} />
                        }
                    </AppText>
                    {!hasSeenWelcome && <Button
                        buttonLable={LocaleProvider.formatMessage(LocaleProvider.IDs.label.submit)}
                        onPress={handleWelcomeButtonClick}
                        buttonContainer={{ margin: Layout.zero, marginTop: Layout.heightPercentageToDP(10), backgroundColor: Colors.brand['DEFAULT'] }}
                        btnLabelStyles={{ color: Colors.white }}
                    />}
                </View>
            </View>
        </Container>
    );
};
