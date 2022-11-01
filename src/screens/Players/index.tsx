import { FlatList, TextInput, Alert } from "react-native";
import { useState, useCallback, useRef } from "react";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayes } from "./styles";

import { Header } from "@components/Header";
import { HightLight } from "@components/HightLight";
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { GroupStorageDTO } from '@storage/groups/GroupStorageDTO';
import { TeamStorageDTO } from '@storage/players/TeamStorageDTO';
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO';
import { deleteGroup } from '@storage/groups';
import { selectPlayers, createPlayer, deletePlayer } from '@storage/players';
import { AppError } from "@utils/AppError";

type RouteParams = {
    groupDTO: GroupStorageDTO;
}

export function Players() {

    const [teams, setTeams] = useState<TeamStorageDTO[]>([{id: 1, name: 'Time A'}, {id: 2, name: 'Time B'}]);
    const [activeTeam, setActiveTeam] = useState(1);
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const inputTextRef = useRef<TextInput>(null); //Apenas para capturar o foco do input

    const navigation = useNavigation();

    const route = useRoute();
    const { groupDTO } = route.params as RouteParams;


    function handleRemoveGroup() {
        Alert.alert('Turma', `Deseja realmente remover a turma '${groupDTO.name}'?`,[
            {text: 'Sim', onPress: removeGroup},
            {text: 'Não', style: 'cancel'}
        ]);
    }

    async function removeGroup() {

        try {

            //await deletePlayersByGroup(groupDTO.id);
            await deleteGroup(groupDTO.id);
    
            navigation.navigate('groups');

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Algo de errado não está certo :(');
        }
    }


    async function handleCreatePlayer() {
        try {

            if(!inputText) {
                return Alert.alert('Participante', 'Informe o nome do participante!');
            }

            const newPlayer: PlayerStorageDTO = {
                id: -1,
                groupId: groupDTO.id,
                teamId: activeTeam,
                name: inputText
            };

            await createPlayer(newPlayer);

            inputTextRef.current?.blur(); //Apenas para remover o foco do input e abaizar o teclado
            //inputTextRef.current?.focus(); //Recebendo foco
            //Keyboard.dismiss(); //para fechar o teclado pode ser utilizado tb a classe do teclado
            
            getPlayers();

            setInputText('');

        } catch (error) {
            console.log(error);
            if(error instanceof AppError) {
                Alert.alert('Error', error.message);
            }else{
                Alert.alert('Error', 'Algo de errado não está certo :(');
            }
        }
    }

    function handleRemovePlayer(playerDTO: PlayerStorageDTO) {
        Alert.alert('Participante', `Deseja realmente remover o participante '${playerDTO.name}'?`,[
            {text: 'Sim', onPress: () => removePlayer(playerDTO.id)},
            {text: 'Não', style: 'cancel'}
        ]);
    }

    async function removePlayer(id: number) {
        try {

            await deletePlayer(id);

            getPlayers();

        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Algo de errado não está certo :(');
        }
    }

    async function getPlayers() {
        try {

            setIsLoading(true);

            const currentPlayers = await selectPlayers(groupDTO.id, activeTeam);
            setPlayers(currentPlayers);
            
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Algo de errado não está certo :(');
            
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        getPlayers();
    }, [activeTeam]));


    return (
        <Container>
            <Header showBackButton />
            <HightLight 
                title={groupDTO.name}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input 
                    placeholder="Nome do participante" 
                    autoCorrect={false}
                    onChangeText={setInputText}
                    value={inputText}
                    maxLength={50}
                    inputRef={inputTextRef}
                    onSubmitEditing={handleCreatePlayer}
                    returnKeyType='done'
                />
                <ButtonIcon 
                    icon='add' 
                    onPress={handleCreatePlayer} 
                />
            </Form>

            <HeaderList>
                <FlatList 
                    horizontal
                    data={teams}
                    keyExtractor={({id}) => id.toString()}
                    renderItem={({item}) => (
                        <Filter 
                            title={item.name} 
                            isActive={item.id === activeTeam}
                            onPress={() => setActiveTeam(item.id)} 
                        />
                    )}
                />

                <NumberOfPlayes>
                    {players.length}
                </NumberOfPlayes>

            </HeaderList>

            {
                isLoading ? <Loading /> :
                <FlatList
                    showsVerticalScrollIndicator={false} 
                    data={players}
                    keyExtractor={({id}) => id.toString()}
                    renderItem={({item}) => (
                        <PlayCard 
                            name={item.name} 
                            onRemove={() => handleRemovePlayer(item)}
                        />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty 
                            message="Adicione novos participantes a lista!!" 
                        />
                    )}
                    // contentContainerStyle={ {paddingBottom: players.length === 0 ? 0 : 100} }
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && { flex: 1 }
                    ]}
                />
            }

            <Button
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleRemoveGroup}
            />

        </Container>
    );
}
