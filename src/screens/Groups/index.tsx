import { useState, useCallback } from "react";

import { Container, List } from "./styles";
import { Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { selectGroups } from "@storage/groups";
import { GroupStorageDTO } from "@storage/groups/GroupStorageDTO";

import { Header } from '@components/Header';
import { HightLight } from "@components/HightLight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

//import { FlatList } from "react-native";

export function Groups() {

    const [groups, setGroups] = useState<GroupStorageDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();


    function handleCardClick(groupDTO: GroupStorageDTO) {
        navigation.navigate('players', { groupDTO });
        //Alert.alert(`Você clicou na turma '${groupName}' index: ${index}`);
    }

    function handleButtonAddClick() {
        //Alert.alert('Clicou no botão adicionar!');
        navigation.navigate('newGroup');
    }

    async function getGroups() {

        try {
            setIsLoading(true);

            const currentGroups = await selectGroups();
            setGroups(currentGroups);

        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        getGroups();
    }, []));

    return (
        <Container>
            <Header />
            <HightLight 
                title='Turmas' 
                subtitle='joque com a sua turma'
            />

            {
                isLoading ? <Loading /> :
                <List 
                    data={groups}
                    keyExtractor={({id}) => id.toString()}
                    renderItem={({item}) => (
                    <GroupCard 
                        title={item.name} 
                        onPress={() => handleCardClick(item)}
                    />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty message='Que tal começar a criar uma nova turma?' />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            }

            <Button 
                title='Criar nova turma' 
                onPress={handleButtonAddClick}
            />

        </Container>
    );
}