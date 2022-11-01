import styled from "styled-components/native";

import { SafeAreaView } from "react-native-safe-area-context";

import { UsersThree } from "phosphor-react-native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};

    /* padding-top: 38px; */
    /* padding-bottom: 16px;
    padding-right: 16px;
    padding-left: 16px; */

    padding: 0px 16px 16px 16px;
    
    align-items: center;
`;

export const Content = styled.View`
    width: 100%;
    /* flex: 1;
    justify-content: center; */

    padding-top: 40%;
`;

export const Icon = styled(UsersThree).attrs(({theme}) => ({
    color: theme.COLORS.GREEN_700,
    size: 56
}))`
    align-self: center;
`;