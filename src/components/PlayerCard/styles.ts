import styled, { css } from "styled-components/native";
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
    width: 100%;
    height: 56px;

    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    border-radius: 6px;

    flex-direction: row;
    align-items: center;

    margin-bottom: 12px;
`;

export const Name = styled.Text`
    flex: 1;

    ${({theme}) => css`
        font-size: ${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.GRAY_200};
        font-family: ${theme.FONT_FAMILY.REGULAR};
    `};
`;

export const Icon = styled(MaterialIcons).attrs(({theme}) => ({
    color: theme.COLORS.GRAY_200,
    size: 24,
    name: 'person'
}))`
    margin-left: 16px;
    margin-right: 4px;
`;
