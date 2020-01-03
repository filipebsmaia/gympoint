import React, {useMemo} from 'react';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/Background';
import TopBar from '~/components/TopBar';
import {Container, Header, Title, Time, Text} from './styles';

export default function Viewer({navigation}) {
  const order = navigation.getParam('order');

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(order.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [order.created_at]);

  return (
    <>
      <Background>
        <TopBar />
        <Container>
          <Header>
            <Title>PERGUNTA</Title>
            <Time>{dateParsed}</Time>
          </Header>
          <Text>{order.question}</Text>
          <Title>RESPOSTA</Title>
          <Text>
            {order.answer
              ? order.answer
              : 'A academia ainda não respondeu sua solicitação de auxílio'}
          </Text>
        </Container>
      </Background>
    </>
  );
}
