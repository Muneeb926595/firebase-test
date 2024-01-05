import { TextStyle, ViewStyle } from "react-native";
import { StyleProp } from "react-native/types";
import { AppIconName, AppIconSize } from "../icon/types";

export type Props = {
  onPress: () => void;
  buttonLable: string;
  buttonContainer?: StyleProp<ViewStyle>;
  btnLabelStyles?: StyleProp<TextStyle>;
  loading?: boolean;
  iconSize?: AppIconSize;
  disabled?: boolean;
  authenticationRequired?: boolean;
  iconName?: AppIconName;
  iconOnLeft?: boolean;
  iconColor?: string;
  disableBgColor?: string;
};
