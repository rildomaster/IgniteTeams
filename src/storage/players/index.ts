import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from './PlayerStorageDTO';


export async function selectPlayers(groupId?: number, teamId?: number) {

    try {
        
        const storage = await AsyncStorage.getItem(PLAYER_COLLECTION);

        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];
        
        if((groupId ?? 0) !== 0 && (teamId ?? 0) === 0){
            return players.filter(p => p.groupId === groupId);
        }

        if((groupId ?? 0) === 0 && (teamId ?? 0) !== 0){
            return players.filter(p => p.teamId === teamId);
        }

        if((groupId ?? 0) !== 0 && (teamId ?? 0) !== 0){
            return players.filter(p => p.groupId === groupId && p.teamId === teamId);
        }

        return players;

    } catch (error) {
        throw error;
    }
}

export async function createPlayer(newPlayer: PlayerStorageDTO) {

    try {
        
        //const currentPlayers = await selectPlayers(newPlayer.groupId, newPlayer.teamId);
        const currentPlayersExist = await selectPlayers(newPlayer.groupId);

        //const playerExist = currentPlayers.includes(playerName);
        const playerExist = currentPlayersExist.find(player => player.name === newPlayer.name);
        if(playerExist) {
            //throw new Error(`O participante '${playerName}' já existe cadastrado!`);
            throw new AppError(`O participante '${newPlayer.name}' já existe cadastrado!`);
        }
        
        const currentPlayers = await selectPlayers();
        const lastId = currentPlayers.length == 0 ? 0 : currentPlayers.reduce((a, b) => a.id > b.id ? a : b).id;
        const newId = lastId + 1;
        newPlayer.id = newId;

        const newPlayers = [...currentPlayers, newPlayer];

        const newStorage = JSON.stringify(newPlayers);

        await AsyncStorage.setItem(PLAYER_COLLECTION, newStorage);

        return newPlayer;

    } catch (error) {
        throw error;
    }
}

export async function selectPlayer(id: number) {

    try {

        const currentPlayers = await selectPlayers();

        const player = currentPlayers.find(player => player.id === id);
        
        return player;

    } catch (error) {
        throw error;
    }
}

export async function deletePlayer(id: number) {

    try {
        
        const currentPlayers = await selectPlayers();

        const newPlayers = currentPlayers.filter(player => player.id !== id);

        const newStorage = JSON.stringify(newPlayers);

        await AsyncStorage.setItem(PLAYER_COLLECTION, newStorage);

    } catch (error) {
        throw error;
    }
}

export async function deletePlayersByGroup(groupId: number) {

    try {
        
        const currentPlayers = await selectPlayers();

        const newPlayers = currentPlayers.filter(player => player.groupId !== groupId);

        const newStorage = JSON.stringify(newPlayers);

        await AsyncStorage.setItem(PLAYER_COLLECTION, newStorage);

    } catch (error) {
        throw error;
    }
}