import { useNavigation } from '@react-navigation/native';

import { Container, BackButton, BackIcon, Separator, Logo } from './styles';

import logoImg from '@assets/logo.png';

type Props = {
    showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {

    const navigation = useNavigation();

    function handleGoBack() {
        //navigation.goBack();
        navigation.navigate('groups');
    }

    return (
        <Container>
            {
                showBackButton && 
                <>
                    <BackButton onPress={handleGoBack}>
                        <BackIcon />
                    </BackButton>
                    <Separator />
                </>
            }

            <Logo source={logoImg} />
            
        </Container>
    );
}