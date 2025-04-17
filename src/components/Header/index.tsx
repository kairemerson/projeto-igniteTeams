import {BackButton, BackIcon, HeaderContainer, Logo} from "./styles"

import logo from "@assets/logo.png"

type Props = {
    showBackButton?: boolean
}

export function Header({showBackButton=false}: Props) {
    return(
        <HeaderContainer>

            {showBackButton && (
                <BackButton>
                    <BackIcon/>

                </BackButton>

            )}
            <Logo source={logo}/>
        </HeaderContainer>
    )
}