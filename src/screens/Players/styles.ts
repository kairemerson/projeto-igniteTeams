import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";


export const PlayersContainer = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({theme})=> theme.COLORS.GRAY_600};
    padding: 24px;
`

export const Form = styled.View`
    width: 100%;
    background-color: ${({theme})=> theme.COLORS.GRAY_700};

    flex-direction: row;
    border-radius: 6px;
`

export const HeaderList = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin: 32px 0 12px;
`

export const NumbersOfPLayers = styled.Text`
    ${({theme}) => css`
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
    `}
` 