import React, { useState } from 'react'
import { styles } from './styles'
import { View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector, } from 'react-redux'
import { ScreenProps } from '../types'
import { AppDropDownPicker, AppText, AuthInput, Button, Container, TextArea } from '../../components'
import { Colors, Constants, Layout, } from '../../../globals'
import { FormattedMessage } from '../../../localisations/locale-formatter'
import { LocaleProvider } from '../../../localisations/locale-provider'
import firestore from '@react-native-firebase/firestore';
import { navigationRef } from '../../navigation'
import { updateUser } from '../../../stores/auth/AuthActions'

export const genderDropDownList = [
    {
        value: 'MALE',
        label: 'MALE',
    },
    {
        value: 'FEMALE',
        label: 'FEMALE',
    },
    {
        value: 'OTHERS',
        label: 'OTHERS',
    },
];


export const EditProfileScreen = (props: ScreenProps<'EditProfileScreen'>) => {
    const dispatch = useDispatch()

    const { user } = useSelector(({ Homfford }: any) => Homfford.auth);
    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            age: '',
            address: '',
            gender: '',
        }
    });

    const handleRegister = async (data) => {
        try {
            // Update or add additional fields in Firestore
            await firestore().collection('users').doc(user.uid).update({
                age: data?.age?.trim(),
                address: data?.address?.trim(),
                gender: data?.gender,
            });

            dispatch(updateUser({
                age: data?.age?.trim(),
                address: data?.address?.trim(),
                gender: data?.gender,
            }) as any)
        } catch (error) {
            console.error('Error updating user fields in Firestore:', error);
        }

        navigationRef.goBack()
    }

    return (
        <Container hasScroll insetsToHandle={['top', 'right', 'left']} screenBackgroundStyle={{ backgroundColor: Colors.background, paddingHorizontal: Layout.widthPercentageToDP(Layout.medium / Layout.divisionFactorForWidth) }} containerStyles={{ backgroundColor: Colors.background, paddingHorizontal: 0 }} >
            <View style={styles.container}>
                <View style={styles.screenContent} >
                    <AppText style={styles.appname}>
                        <FormattedMessage id={LocaleProvider.IDs.label.editProfile} />
                    </AppText>

                    <Controller
                        control={control}
                        rules={{
                            pattern: Constants.REGEX_AGE,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AuthInput
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                isError={errors?.age}
                                placeholder={LocaleProvider.formatMessage(LocaleProvider.IDs.label.enterYourAge)}
                            />
                        )}
                        name="age"
                    />
                    {errors?.age && <AppText style={styles.error} >
                        <FormattedMessage id={LocaleProvider.IDs.error.ageIsInvalid} />
                    </AppText>}

                    <Controller
                        control={control}
                        rules={{
                            pattern: Constants.REGEX_FULL_NAME,
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextArea
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                placeholder={LocaleProvider.formatMessage(LocaleProvider.IDs.label.enterYourAddress)}
                                isError={errors?.address}
                            />
                        )}
                        name="address"
                    />
                    {errors?.address && <AppText style={styles.error} >
                        <FormattedMessage id={LocaleProvider.IDs.error.addressIsInvalid} />
                    </AppText>}

                    <Controller
                        control={control}
                        rules={{
                            validate: (value) => value !== undefined && value !== ''
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <AppDropDownPicker
                                value={value}
                                onSelectItem={onChange}
                                dropDownList={genderDropDownList}
                                placeholder={LocaleProvider.formatMessage(
                                    LocaleProvider.IDs.label.genderWithSterek,
                                )}
                                isError={errors?.gender}
                            />
                        )}
                        name="gender"
                    />
                    {errors?.gender && <AppText style={styles.error} >
                        <FormattedMessage id={LocaleProvider.IDs.error.genderIsInvalid} />
                    </AppText>}

                    <View style={styles.existingUserLogin}>
                        <Button
                            buttonLable={LocaleProvider.formatMessage(LocaleProvider.IDs.label.submit)}
                            onPress={handleSubmit(handleRegister)}
                            buttonContainer={{ margin: Layout.zero, marginTop: Layout.zero, backgroundColor: Colors.brand['DEFAULT'] }}
                            btnLabelStyles={{ color: Colors.white }}
                        />
                    </View>
                </View>
            </View>
        </Container>
    )
}