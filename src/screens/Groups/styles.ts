import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, FlatListProps  } from "react-native";

import { GroupStorageDTO } from "@storage/groups/GroupStorageDTO";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
    /* justify-content: center; */
    align-items: center;

    /* padding-top: 38px; */
    /* padding-bottom: 16px;
    padding-right: 16px;
    padding-left: 16px; */

    padding: 0px 16px 16px 16px;
`;


// export const List = styled.FlatList`
//     width: 100%;
// `;

//export const List = styled(FlatList as new (props: FlatListProps<string>) => FlatList<string>)`
//export const List = styled(FlatList)<FlatListProps<string>>`

export const List = styled(FlatList as new (props: FlatListProps<GroupStorageDTO>) => FlatList<GroupStorageDTO>)`
    width: 100%;
`;