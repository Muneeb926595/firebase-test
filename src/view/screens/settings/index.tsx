import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { injectIntl } from 'react-intl';
import RNRestart from 'react-native-restart'; // Import package from node modules

import { styles } from './styles';
import { ApplicationSettings, Languages } from './types';
import { AppIcon, AppText, Container, Divider, DropDownListModal, SwitchBtn } from '../../components';
import { Colors, Layout } from '../../../globals';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import StorageHelper, { StorageKeys } from '../../../utils/StorageHelper';
import { LocaleProvider } from '../../../localisations/locale-provider';
import { FormattedMessage } from '../../../localisations/locale-formatter';
import { AppIconName, AppIconSize } from '../../components/icon/types';
import { logoutUser, setAppLanguage } from '../../../stores/auth/AuthActions';
import { navigationRef } from '../../navigation';

export const SettingsScreen = injectIntl((props) => {
    const { user } = useSelector(({ Homfford }: any) => Homfford.auth);

    const [locationSwitchValue, setLocationSwitchValue] = useState(false)
    const [isLanguagesModalVisible, setIsLanguagesModalVisible] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [supportedLanguages, setSupportedLanguages] = useState([
        {
            id: Languages.English,
            value: LocaleProvider.formatMessage(LocaleProvider.IDs.label.english),
            label: LocaleProvider.formatMessage(LocaleProvider.IDs.label.english),
        },
        {
            id: Languages.Spainish,
            value: LocaleProvider.formatMessage(LocaleProvider.IDs.label.spain),
            label: LocaleProvider.formatMessage(LocaleProvider.IDs.label.spain),
        }
    ])

    const [userSettings, setUserSettings] = useState([
        {
            id: ApplicationSettings.Language,
            title: LocaleProvider.t(LocaleProvider.IDs.label.language),
            leftIconName: AppIconName.language,
            leftIconColor: `${Colors.surface['500']}90`,
            isDropDown: true,
            dropdownLabel: "English"
        },
        {
            id: ApplicationSettings.DeleteAccount,
            title: LocaleProvider.t(LocaleProvider.IDs.label.deleteAccount),
            leftIconName: AppIconName.trash,
            leftIconColor: Colors.actions['DEFAULT']
        },
        {
            id: ApplicationSettings.Logout,
            title: LocaleProvider.t(LocaleProvider.IDs.label.logout),
            leftIconName: AppIconName.logout,
            leftIconColor: Colors.actions['DEFAULT']
        }
    ])


    const initialRender = async () => {
        // when user visit this screen first check if user has set language
        // inside of setting before or not if yes then enable that option 
        // else check if user device language is other then english then 
        // set that language as setlected as that will be the lanaguage the 
        // app will be using else if none of them found then choose the default app language
        try {
            const appLocale = await StorageHelper.getItem(StorageKeys.SELECTED_APP_LANGUAGE) as string;
            const deviceLocale = props?.intl?.locale
            if (appLocale) {
                const updatedOptions = supportedLanguages?.map(item => item.id === appLocale ? { ...item, isSelected: true } : { ...item, isSelected: false })
                setSupportedLanguages(updatedOptions)

                // update the selected langaue label in user settings as well
                setUserSettings((prev) => prev?.map((item) => item?.id === ApplicationSettings.Language ? { ...item, dropdownLabel: updatedOptions?.find((optionItem) => optionItem?.isSelected === true)?.label } : { ...item }))
            } else if (deviceLocale) {
                const updatedOptions = supportedLanguages?.map(item => item.id === deviceLocale ? { ...item, isSelected: true } : { ...item, isSelected: false })
                setSupportedLanguages(updatedOptions)

                // update the selected langaue label in user settings as well
                setUserSettings((prev) => prev?.map((item) => item?.id === ApplicationSettings.Language ? { ...item, dropdownLabel: updatedOptions?.find((optionItem) => optionItem?.isSelected === true)?.label } : { ...item }))
            }
        } catch (err) {
            setSupportedLanguages([
                {
                    id: Languages.English,
                    value: LocaleProvider.formatMessage(LocaleProvider.IDs.label.english),
                    label: LocaleProvider.formatMessage(LocaleProvider.IDs.label.english),
                },
                {
                    id: Languages.Spainish,
                    value: LocaleProvider.formatMessage(LocaleProvider.IDs.label.spain),
                    label: LocaleProvider.formatMessage(LocaleProvider.IDs.label.spain),
                }
            ])
        }
    }

    useEffect(() => {
        initialRender()
    }, [])


    const handleDeleteAccount = async () => {
        try {
            // Delete user account in Firebase Authentication
            await auth().currentUser.delete();

            // Delete user document in Firestore
            await firestore().collection('users').doc(user?.uid).delete();

            // After deleting, sign out the user
            await auth().signOut();
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const doSelectedOperation = async (selectedOp: string) => {
        switch (selectedOp) {
            case ApplicationSettings.Language:
                setIsLanguagesModalVisible(true)
                break;
            case ApplicationSettings.DeleteAccount:
                handleDeleteAccount()
                break;
            case ApplicationSettings.Logout:
                dispatch(logoutUser() as any)
                break;
        }
    }

    const dispatch = useDispatch()

    const handleBack = () => {
        props.navigation.goBack()
    }

    const RenderRightSection = (item) => {
        if (item?.isCheckBox) {
            return (
                <SwitchBtn value={locationSwitchValue} onValueChange={setLocationSwitchValue} />
            )
        } else if (item?.isDropDown) {
            return (
                <View style={styles.dropdownContainer}>
                    <AppText style={styles.dropdownLabel}>
                        {item?.dropdownLabel}
                    </AppText>
                    <AppIcon
                        name={AppIconName.listDownArrow}
                        color={Colors.brand['DEFAULT']}
                        iconSize={Layout.widthPercentageToDP(1.6)}
                    />
                </View>
            )
        } else {
            return (
                <AppIcon
                    name={item?.rightArrow}
                    color={`${Colors.surface['500']}80`}
                    iconSize={AppIconSize.mini}
                />
            )
        }
    }

    const handleLanguageSelected = async (selectedLanague) => {
        //when user selecte new language from options first update all of the message accordingley
        //then store that language in user mobile so if user restart app then inside of app.ts we can use that language
        try {
            setIsLoading(true)
            // update in global store :Redux
            dispatch(setAppLanguage(selectedLanague?.id) as any)

            //update current user language
            await LocaleProvider.init(selectedLanague?.id);

            //set in device settings
            await StorageHelper.saveItem(StorageKeys.SELECTED_APP_LANGUAGE, selectedLanague?.id);

            RNRestart.restart();
        } catch (error) {
            const e = error as any;
            alert(e.details.error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCurrencySelected = (selectedCurrency) => {

    }

    return (
        <Container hasScroll insetsToHandle={['left', 'right']} screenBackgroundStyle={{ paddingHorizontal: 0, flex: 1 }} containerStyles={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <View style={styles.topBannerContainer} >
                        <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} >
                            <View style={styles.headerLeft}>
                                <TouchableOpacity onPress={handleBack} >
                                    <AppIcon
                                        name={AppIconName.backArrow}
                                        color={Colors.white}
                                    />
                                </TouchableOpacity>
                                <AppText style={styles.headerTitle}>
                                    <FormattedMessage id={LocaleProvider.IDs.label.profile} />
                                </AppText>
                            </View>
                            <TouchableOpacity onPress={() => navigationRef.navigate('EditProfileScreen')} style={styles.editButtonContainer}>
                                <AppIcon
                                    name={AppIconName.editPen}
                                    color={Colors.brand['DEFAULT']}
                                    iconSize={AppIconSize.small}
                                />
                                <AppText style={styles.editLabel}>
                                    <FormattedMessage id={LocaleProvider.IDs.label.edit} />
                                </AppText>
                            </TouchableOpacity>
                        </SafeAreaView>

                        <View style={styles.profileDetailsContainer}>
                            <Image
                                source={{ uri: user?.profileImage }}
                                style={styles.profilePic}
                            />

                            <View style={styles.profileDetails}>
                                <AppText style={styles.userName}>
                                    {user?.userName}
                                </AppText>

                                <View style={styles.profileDetailsItemContainer}>
                                    <AppIcon
                                        name={AppIconName.email}
                                        color={Colors.white}
                                        iconSize={AppIconSize.small}
                                    />
                                    <AppText style={styles.profileDetailsItemLabel}>
                                        {user?.email}
                                    </AppText>
                                </View>
                                <View style={styles.profileDetailsItemContainer}>
                                    <AppIcon
                                        name={AppIconName.locationPinUnfilled}
                                        color={Colors.white}
                                        iconSize={AppIconSize.small}
                                    />
                                    <AppText style={styles.profileDetailsItemLabel}>
                                        13th Street. 47 W 13th St, NY 10011
                                    </AppText>
                                </View>
                            </View>
                        </View>
                    </View>

                    <FlatList
                        data={userSettings}
                        style={{
                            marginTop: Layout.heightPercentageToDP(2.5),
                            paddingHorizontal: Layout.widthPercentageToDP(4),
                        }}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => doSelectedOperation(item.id)} style={styles.settingItem}>
                                <View style={styles.row}>
                                    <View style={{ alignItems: 'center' }}>
                                        <AppIcon
                                            name={item?.leftIconName}
                                            color={item?.leftIconColor}
                                            iconSize={AppIconSize.small}
                                            style={{ alignItems: 'flex-start', }}
                                        />
                                    </View>
                                    <AppText style={styles.settingItemLabel}>{item.title}</AppText>
                                </View>


                                {RenderRightSection(item)}
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <Divider />}
                    />
                </View>
            </View>
            <Modal visible={isLanguagesModalVisible} animationType="slide">
                <DropDownListModal
                    data={supportedLanguages}
                    headerTitle={LocaleProvider.formatMessage(LocaleProvider.IDs.label.language)}
                    setIsModalVisible={setIsLanguagesModalVisible}
                    handleItemSelected={handleLanguageSelected}
                />
            </Modal>
        </Container >
    );
});