import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {Container, Name, Time} from './styles';

export default function Checkin({data}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container>
      <Name>Check-in #{data.id}</Name>
      <Time>{dateParsed}</Time>
    </Container>
  );
}

Checkin.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
