import styled from "styled-components/native";

import { TouchableOpacity } from 'react-native';

import { CaretLeft } from 'phosphor-react-native';

export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 16px;
`;

export const Logo = styled.Image`
    width: 46px;
    height: 55px;
`;

export const Separator = styled.View`
    flex: 1;
`;


//export const BackButton = styled.TouchableOpacity`
export const BackButton = styled(TouchableOpacity)`
    
`;

export const BackIcon = styled(CaretLeft).attrs(({theme}) => ({
    color: theme.COLORS.WHITE,
    size: 32
}))``;