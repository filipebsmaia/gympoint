import React from 'react';

import {MdSync} from 'react-icons/md';
import {Container} from './styles';

export default function Loading() {
  return (
    <Container>
      <MdSync size={40} color="#000" />
      <h2>Carregando...</h2>
    </Container>
  );
}
