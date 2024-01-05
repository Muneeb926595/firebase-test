import React, { useState, } from 'react';
import { View } from 'react-native';
import { useDispatch, } from 'react-redux';

import { Container, } from '../../components';
import { Tabs } from '../../components/tabs';
import { ITab, ParaSurahTab } from '../../components/tabs/types';
import { TabScreenProps } from '../types';
import { styles } from './styles';

export const SettingsScreen = (props: TabScreenProps<'SettingsScreen'>) => {
    const [selectedTab, setSlectedTab] = useState<ParaSurahTab>(ParaSurahTab.Surah)
    const dispatch = useDispatch()

    const handleTabChange = (value: ParaSurahTab) => {
        setSlectedTab(value)
    }

    const profileTabs: ITab[] = [
        {
            label: "Surah",
            tabName: ParaSurahTab.Surah,
            onPress: () => {
                handleTabChange(ParaSurahTab.Surah)
            }
        },
        {
            label: "Para",
            tabName: ParaSurahTab.Para,
            onPress: () => {
                handleTabChange(ParaSurahTab.Para)
            }
        },
    ]

    return (
        <Container >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <Tabs
                        tabs={profileTabs}
                        selectedTab={selectedTab}
                        containerStyles={styles.tabContainer}
                    />

                </View>
            </View>
        </Container>
    );
};