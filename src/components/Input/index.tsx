import { TextInput, TextInputProps } from "react-native";
import { InputContainer } from "./styles";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>
}

export function Input({inputRef ,...rest}: Props) {
    const {COLORS} = useTheme()

    return(
        <InputContainer ref={inputRef} placeholderTextColor={COLORS.GRAY_300} {...rest} >
        
        </InputContainer>
    )
}