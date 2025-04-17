import {StatusBar} from "react-native"
import {ThemeProvider} from "styled-components"
import {theme} from "./src/theme";
import {useFonts, Roboto_400Regular, Roboto_700Bold} from "@expo-google-fonts/roboto"

import { Groups } from '@screens/Groups';
import { Loading } from "@components/Loading";
import { NewGroup } from "@screens/NewGroup";
import { Playres } from "@screens/Players";

export default function App() {

  const [fontsLoader] = useFonts({Roboto_400Regular, Roboto_700Bold})


  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/> 
        {fontsLoader ? <Groups/> : <Loading/>}
    </ThemeProvider>
  );
}

