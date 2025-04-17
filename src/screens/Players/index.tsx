import { Header } from "@components/Header";
import { Form, HeaderList, NumbersOfPLayers, PlayersContainer } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";


export function Playres() {

    const [team, setTeam] = useState("TIME A")
    const [players, setPlayers] = useState([])

    return(
        <PlayersContainer>
            <Header showBackButton/>
            <Highlight title="Nome da turma" subtitle="Adicione a galera e separa os times"/>

            <Form>
                <Input placeholder="Nome da pessoa"/>
                <ButtonIcon icon="add"/>

            </Form>

            <HeaderList>
                <FlatList
                    data={["TIME A", "TIME B"]}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <Filter title={item} isActive={item === team} onPress={()=> setTeam(item)}/>

                    )}
                    horizontal
                />  
                <NumbersOfPLayers>{players.length}</NumbersOfPLayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({item})=> (
                    <PlayerCard name={item} onRemove={()=>{}}/>
                )}
                                ListEmptyComponent={()=> (
                    <ListEmpty message="Não há pessoas nesse time"/>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />

            <Button title="Remover turma" type="secondary"/>
        </PlayersContainer>
    )
}