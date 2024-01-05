import { LinkingOptions } from "@react-navigation/native";

export const linkingConfigs: LinkingOptions<ReactNavigation.RootParamList> = {
    /* your linking prefixes */
    prefixes: [
        // "any prefix",
    ],

    /* configuration for matching screens with paths */
    config: {
        screens: {
            // InsuranceAuthentication: {
            //     path: "anypath",
            //     parse: {
            //         code: code => code,
            //     },
            // },
            NoMatch: '*',
        }
    },
};