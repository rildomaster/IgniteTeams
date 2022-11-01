import styled, { css } from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

import { UsersThree } from 'phosphor-react-native';

//import { TouchableOpacity } from "react-native";
//export const Container = styled(TouchableOpacity)`cls

//export const Container = styled.TouchableOpacity`
//export const Container = styled(TouchableOpacity)`

export const Container = styled(TouchableOpacity)`
    width: 100%;
    height: 70px;

    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    border-radius: 6px;
    /* margin-left: 20px;
    margin-right: 20px; */
    flex-direction: row;
    align-items: center;
    
    padding: 24px;
    margin-bottom: 12px;
`;

export const Icon = styled(UsersThree).attrs(({theme}) => ({
    color: theme.COLORS.GREEN_700,
    size: 32,
    weight: 'fill'
}))`
    margin-right: 12px;
`;

export const Title = styled.Text.attrs(() => ({
    numberOfLines: 2
}))`

    ${({theme}) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};

    /* margin-left: 12px; */
    /* margin: 0px 12px 0px 12px; */
`;