import React, { useState } from 'react'
import { styles } from './styles'
import { View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, } from 'react-redux'
import { ScreenProps } from '../types'
import { AppDropDownPicker, AppText, Button, Container, TextArea } from '../../components'
import { Colors, Constants, Layout, } from '../../../globals'
import { FormattedMessage } from '../../../localisations/locale-formatter'
import { LocaleProvider } from '../../../localisations/locale-provider'

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

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            address: '',
            gender: '',
        }
    });

    const handleRegister = (data) => {
        const payload = {
            name: data?.fullname?.trim(),
            email: data?.email?.toLowerCase()?.trim(),
            phone_number: data?.phoneNo?.trim(),
            password: data?.password?.trim(),
            gender: data?.gender,
            address: data?.address?.trim(),
            occupation: data?.occupation?.trim()
        }
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
                            buttonContainer={{ margin: Layout.zero, marginTop: Layout.zero, backgroundColor: Colors.black }}
                            btnLabelStyles={{ color: Colors.white }}
                        />
                    </View>
                </View>
            </View>
        </Container>
    )
}