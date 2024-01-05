import React, { useState } from 'react'
import { AppText, Button, Container, } from '../../../components'
import { Colors, Layout, } from '../../../../globals'
import { styles } from './styles'
import { FormattedMessage } from '../../../../localisations/locale-formatter'
import { LocaleProvider } from '../../../../localisations/locale-provider'
import { TouchableOpacity, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ScreenProps } from '../../types'
import { SvgXml } from 'react-native-svg'
import { appLogoBlueIcon, googleLogoIcon } from '../../../components/icon/custome-icons'


export const LoginScreen = (props: ScreenProps<'LoginScreen'>) => {
  const dispatch = useDispatch()

  const { loading } = useSelector(({ Homfford }: any) => Homfford.auth)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const [showPass, setShowPass] = useState(false)

  const handleTogglePassword = () => {
    setShowPass(!showPass)
  }

  const handleLogin = (data) => {
    const payload = {
      email: data?.email?.toLowerCase()?.trim(),
      password: data?.password?.trim(),
      type: 1,
    }
  }

  return (
    <Container hasScroll={true} insetsToHandle={['top', 'right', 'left']} screenBackgroundStyle={{ backgroundColor: Colors.background, paddingHorizontal: Layout.widthPercentageToDP(Layout.medium / Layout.divisionFactorForWidth) }} containerStyles={{ backgroundColor: Colors.background, paddingHorizontal: 0 }} >
      <View style={styles.container}>
        <View style={styles.screenContent} >
          <View style={{ alignSelf: 'center', marginBottom: Layout.heightPercentageToDP(5) }}>
            <SvgXml xml={appLogoBlueIcon} />
          </View>

          <AppText style={styles.title}>
            <FormattedMessage id={LocaleProvider.IDs.label.loginHere} />
          </AppText>
          <AppText style={styles.titleDescription}>
            <FormattedMessage id={LocaleProvider.IDs.label.signinToYourAccount} />
          </AppText>

          <View style={styles.existingUserLogin}>
            <Button
              buttonLable={LocaleProvider.formatMessage(LocaleProvider.IDs.label.signin)}
              loading={loading}
              onPress={handleSubmit(handleLogin)}
              btnLabelStyles={{
                color: Colors.white,
              }}
              buttonContainer={{
                backgroundColor: Colors.brand['DEFAULT'],
                marginTop: Layout.heightPercentageToDP(0.4)
              }}
            />
          </View>

          <View style={styles.socialLoginsContainer}>
            <TouchableOpacity style={styles.socialLoginContainer}>
              <SvgXml xml={googleLogoIcon} />
              <AppText style={styles.socialLoginLabel}>
                <FormattedMessage id={LocaleProvider.IDs.label.signinWithGoogle} />
              </AppText>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Container>
  )
}