import { TouchableOpacityProps } from "react-native";
import { ButtonIconContainer, ButtonIconStyleProps, Icon } from "./styles";
import {MaterialIcons} from "@expo/vector-icons"

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap
    type?: ButtonIconStyleProps
}

export function ButtonIcon({icon, type="primary", ...rest}: Props) {
    return (
        <ButtonIconContainer {...rest}>
            <Icon name={icon} type={type}/>
        </ButtonIconContainer>
    )
}