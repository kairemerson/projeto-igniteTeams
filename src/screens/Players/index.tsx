import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Form, HeaderList, NumbersOfPLayers, PlayersContainer } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppErros";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGrouAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveBygroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";


type RouteParams = {
    group: string
}

export function Players() {
    const [isLoading, setIsloading] = useState(true)
    const [team, setTeam] = useState("TIME A")
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
    const [newPlayerName, setNewPlayerName] = useState('')

    const navigation = useNavigation()
    const route = useRoute()
    const {group} = route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handelAddPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert("Nova pessoa", "Informe o nome da pessoa para adicionar")
        }

        const newPlayer = {
            name: newPlayerName,
            team: team
        }

        try {

            await playerAddByGroup(newPlayer, group)

            newPlayerNameInputRef.current?.blur()
            setNewPlayerName("")
            fetchPlayersByTeam()
            
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert("Nova pessoa", error.message)
            }else {
                Alert.alert("Nova pessoa", "Não foi possível adicioar")
            }
        }

    }

    async function fetchPlayersByTeam() {
        try {
            setIsloading(true)
            const playersByTeam = await playersGetByGroupAndTeam(group, team)
            setPlayers(playersByTeam)
            setIsloading(false)
        } catch (error) {
            Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionado")
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group)
            fetchPlayersByTeam()

        } catch (error) {
            Alert.alert("Remover Pessoa", "Não foi possível remover essa pessoa")
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group)
            navigation.navigate("groups")
        } catch (error) {
            Alert.alert("Remover Grupo", "Não foi possível remover grupo")
        }
    }

    async function handleGroupRemove() {
        Alert.alert("Remover", "Deseja remover o grupo?", [
            {text: "Não", style: "cancel"},
            {text: "Sim", onPress: ()=> groupRemove()}
        ])
    }

    useEffect(() => {
        fetchPlayersByTeam()
    }, [team])

    return(
        <PlayersContainer>
            <Header showBackButton/>
            <Highlight 
                title={group}
                subtitle="Adicione a galera e separa os times"/>

            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    value={newPlayerName}
                    placeholder="Nome da pessoa" 
                    onChangeText={setNewPlayerName}
                    onSubmitEditing={handelAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon icon="add" onPress={handelAddPlayer}/>

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

            {
                isLoading ? <Loading/> : 
            
                <FlatList
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item})=> (
                        <PlayerCard 
                            name={item.name} 
                            onRemove={()=>{handlePlayerRemove(item.name)}}
                        />
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
            }
            <Button title="Remover turma" type="secondary" onPress={handleGroupRemove}/>
        </PlayersContainer>
    )
}