import { TextInput } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(TextInput).attrs(({theme}) => ({
    // placeholderTextColor: theme.COLORS.GRAY_400
}))`
    flex: 1;
    
    min-height: 56px;
    max-height: 56px;

    ${({theme}) => css`
        background-color: ${theme.COLORS.GRAY_700};
        color: ${theme.COLORS.WHITE};

        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.MD}px;
    `};

    border-radius: 6px;
    padding: 16px;
`;