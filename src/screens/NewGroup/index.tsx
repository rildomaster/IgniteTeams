import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { Container, Content, Icon } from './styles';
import { createGroup } from '@storage/groups';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { HightLight } from '@components/HightLight';
import { Input } from '@components/Input';
import { AppError } from '@utils/AppError';


export function NewGroup() {

    const [ groupName, setGroupName ] = useState('');

    const navigation = useNavigation();

    async function handleCreateGroup() {
        try {
            if(!groupName.trim()) {
                return Alert.alert('Turma', 'Informe o nome da Turma!');
            }

            const newGroup = await createGroup(groupName);
            
            navigation.navigate('players', { groupDTO: newGroup });

        } catch (error) {

            if(error instanceof AppError) {
                Alert.alert('Error', error.message);
            }else{
                Alert.alert('Error', 'Algo de errado não está certo :(');
            }

            console.log(error);
        }
    }

    return (
        <Container>
            <Header showBackButton={true} />

            <Content>
                <Icon />

                <HightLight 
                    title='Nova turma'
                    subtitle='Crie a turma para adicionar os jogadores'
                />

                <Input 
                    placeholder='Nome da Turma'
                    onChangeText={setGroupName}
                    value={groupName}
                    onSubmitEditing={handleCreateGroup}
                    returnKeyType='done'
                />

                <Button title='Criar' style={{ marginTop: 20 }} onPress={handleCreateGroup} />

            </Content>

        </Container>
    );
};