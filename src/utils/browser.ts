import { Linking } from 'react-native'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { Colors } from '../globals'

export const sleep = async (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

export const openLinkInBrowser = async (url: string) => {
    try {
        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: Colors.background,
                preferredControlTintColor: Colors.foreground,
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: Colors.background,
                secondaryToolbarColor: Colors.foreground,
                navigationBarColor: Colors.foreground,
                navigationBarDividerColor: Colors.background,
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                    'my-custom-header': 'my custom header value'
                }
            })
            await sleep(800);
        }
        else Linking.openURL(url)
    } catch (error) {
        //send error to server
    }
}