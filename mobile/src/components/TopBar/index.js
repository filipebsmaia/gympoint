import React from 'react';
import {Image} from 'react-native';

import logo from '~/assets/logo.png';
import {Container} from './styles';

export default function TobBar() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
