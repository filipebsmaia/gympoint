import React, {useState} from 'react';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import logo from '~/assets/logobellow.png';

import {Container, Form, FormInput, SubmitButton} from './styles';

import {signInRequest} from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email));
  }

  return (
    <>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu email de cadastro"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={email}
            onChangeText={setEmail}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </>
  );
}
