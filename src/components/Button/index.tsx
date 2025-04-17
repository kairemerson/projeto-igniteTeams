import { TouchableOpacityProps } from "react-native";
import { ButtonContainer, ButtonTypesProps, Title } from "./styles";


type Props = TouchableOpacityProps & {
    title: string
    type?: ButtonTypesProps
}

export function Button({title, type="primary", ...rest}: Props){
    return (
        <ButtonContainer type={type} {...rest}>
            <Title>{title}</Title>
        </ButtonContainer>
    )
}