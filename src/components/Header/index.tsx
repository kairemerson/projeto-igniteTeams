import { useNavigation } from "@react-navigation/native"
import {BackButton, BackIcon, HeaderContainer, Logo} from "./styles"

import logo from "@assets/logo.png"

type Props = {
    showBackButton?: boolean
}

export function Header({showBackButton=false}: Props) {

    const navigation = useNavigation()

    function handleGoBack() {
        navigation.navigate("groups")
    }

    return(
        <HeaderContainer>

            {showBackButton && (
                <BackButton onPress={handleGoBack}>
                    <BackIcon/>

                </BackButton>

            )}
            <Logo source={logo}/>
        </HeaderContainer>
    )
}