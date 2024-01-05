import { notify } from "react-native-notificated"

export const showError = (title, description) => {
    notify('error', {
        params: {
            title: title,
            description: description,
            style: {
                multiline: 2,
            },
        },
    })
}