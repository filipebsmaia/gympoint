import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {Container, Header, AnswerStatus, Time, Text} from './styles';

export default function HelpOrderButtonSummary({data, ...rest}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.created_at), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.created_at]);

  return (
    <Container {...rest}>
      <Header>
        <AnswerStatus answered={data.answer}>
          {data.answer ? 'Respondido' : 'Sem resposta'}
        </AnswerStatus>
        <Time>{dateParsed}</Time>
      </Header>
      <Text>{data.question}</Text>
    </Container>
  );
}

HelpOrderButtonSummary.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
