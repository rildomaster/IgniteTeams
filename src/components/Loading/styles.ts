import styled from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
`;

//export const LoadingIndicator = styled.ActivityIndicator``;
//export const LoadingIndicator = styled.ActivityIndicator.attrs``;
export const LoadingIndicator = styled.ActivityIndicator.attrs(({theme}) => ({
    color: theme.COLORS.GREEN_700,
    size: 'large'
}))``;