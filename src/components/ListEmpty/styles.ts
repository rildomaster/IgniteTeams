import styled, { css } from "styled-components/native";

import { FolderPlus } from 'phosphor-react-native'


export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    border-top-width: 2px;
    border-top-color: ${({theme}) => theme.COLORS.GRAY_400};
`;

export const Icon = styled(FolderPlus).attrs(({theme}) => ({
    color: theme.COLORS.GRAY_300,
    size: 60,
    weight: 'duotone'
}))`
    margin-top: 24px;
    margin-bottom: 16px;
`;

export const Message = styled.Text`
    ${({theme}) => css`
        color: ${theme.COLORS.GRAY_300};
        font-size: ${theme.FONT_SIZE.SM}px;
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
    /* text-align: center; */
`;