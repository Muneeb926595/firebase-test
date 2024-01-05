import React, { useEffect } from 'react'
import { AppText, Container, } from '../../../components'
import { Colors, Layout, } from '../../../../globals'
import { styles } from './styles'
import { FormattedMessage } from '../../../../localisations/locale-formatter'
import { LocaleProvider } from '../../../../localisations/locale-provider'
import { TouchableOpacity, View } from 'react-native'
import { ScreenProps } from '../../types'
import { SvgXml } from 'react-native-svg'
import { googleLogoIcon } from '../../../components/icon/custome-icons'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux'
import { loginUser, } from '../../../../stores/auth/AuthActions'

GoogleSignin.configure({
  webClientId: '1078838042725-e70s3mc18enegk6fupv1rgf9iesloobu.apps.googleusercontent.com',
});

export const LoginScreen = (props: ScreenProps<'LoginScreen'>) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribeAuth = auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        dispatch(loginUser(authUser) as any)
        await createUserInFirestore(authUser?.uid, authUser?.displayName, authUser?.email);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const createUserInFirestore = async (userId, displayName, email) => {
    try {
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        // Create user document in Firestore
        await firestore().collection('users').doc(userId).set({
          displayName,
          email,
        });
      }
    } catch (error) {
      console.error('Error creating user in Firestore:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken } = userInfo;
      const { accessToken } = await GoogleSignin.getTokens();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken,);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in process
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Operation (e.g., sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated
      } else {
        // Some other error happened
      }
    }
  };

  return (
    <Container hasScroll={true} insetsToHandle={['top', 'right', 'left']} screenBackgroundStyle={{ backgroundColor: Colors.background, paddingHorizontal: Layout.widthPercentageToDP(Layout.medium / Layout.divisionFactorForWidth) }} containerStyles={{ backgroundColor: Colors.background, paddingHorizontal: 0 }} >
      <View style={styles.container}>
        <View style={styles.screenContent} >
          <View style={{ alignSelf: 'center', marginBottom: Layout.heightPercentageToDP(5) }}>
            <AppText style={styles.appLogo}>
              <FormattedMessage id={LocaleProvider.IDs.label.firebaseTest} />
            </AppText>
          </View>

          <AppText style={styles.title}>
            <FormattedMessage id={LocaleProvider.IDs.label.loginHere} />
          </AppText>
          <AppText style={styles.titleDescription}>
            <FormattedMessage id={LocaleProvider.IDs.label.signinToYourAccount} />
          </AppText>

          <View style={styles.socialLoginsContainer}>
            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.socialLoginContainer}>
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