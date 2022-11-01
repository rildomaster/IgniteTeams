import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { GroupStorageDTO } from "./GroupStorageDTO";
import { deletePlayersByGroup } from "@storage/players";


export async function selectGroups() {

    try {
        
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

        const groups: GroupStorageDTO[] = storage ? JSON.parse(storage) : [];
        
        return groups;

    } catch (error) {
        throw error;
    }
}

export async function createGroup(groupName: string) {

    try {
        
        const currentGroups = await selectGroups();

        //const groupExist = currentGroups.includes(groupName);
        const groupExist = currentGroups.find(p => p.name === groupName);
        if(groupExist) {
            //throw new Error(`A turma '${groupName}' já existe cadastrada!!!`);
            throw new AppError(`A turma '${groupName}' já existe cadastrada!`);
        }

        //const lastId = Math.max(...currentGroups.map(o => o.id)) ?? 0;
        const lastId = currentGroups.length == 0 ? 0 : currentGroups.reduce((a, b) => a.id > b.id ? a : b).id;
        const newId = lastId + 1;

        const newGroup: GroupStorageDTO = { id: newId, name: groupName };

        const newGroups = [...currentGroups, newGroup];

        const newStorage = JSON.stringify(newGroups);

        await AsyncStorage.setItem(GROUP_COLLECTION, newStorage);

        return newGroup;

    } catch (error) {
        throw error;
    }
}

export async function selectGroup(id: number) {

    try {

        const currentGroups = await selectGroups();

        const group = currentGroups.find(p => p.id === id);
        
        return group;

    } catch (error) {
        throw error;
    }
}

export async function deleteGroup(id: number) {

    try {

        await deletePlayersByGroup(id);
        
        const currentGroups = await selectGroups();

        const newGroups = currentGroups.filter(p => p.id !== id);

        const newStorage = JSON.stringify(newGroups);

        await AsyncStorage.setItem(GROUP_COLLECTION, newStorage);

    } catch (error) {
        throw error;
    }
}