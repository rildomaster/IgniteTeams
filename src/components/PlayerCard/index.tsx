import { ButtonIcon } from '@components/ButtonIcon';
import { Container, Name, Icon } from './styles';


type Props = {
    name: string,
    onRemove: () => void
}

export function PlayCard({name, onRemove}: Props) {
    return (
        <Container>

            <Icon />

            <Name>
                {name}
            </Name>

            <ButtonIcon 
                icon='close'
                type='SECONDARY'
                onPress={onRemove}
            />
            
        </Container>
    );
};