import { Container, Icon, Message } from "./styles";

type Props = {
    message: string
}

export function ListEmpty({message}: Props) {
    return (
        <Container>
            <Icon />
            <Message>
                {message}
            </Message>
        </Container>
    );
}