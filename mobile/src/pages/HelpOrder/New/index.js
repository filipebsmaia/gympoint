import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import api from '~/services/api';

import Background from '~/components/Background';
import TopBar from '~/components/TopBar';
import {Container, SubmitButton, TextArea} from './styles';

export default function New() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const student = useSelector(state => state.auth.student);

  async function handleSubmit() {
    setLoading(true);
    try {
      await api.post(`/students/${student.id}/help-orders`, {question});
      setQuestion('');
      Alert.alert('Pedido de auxílio enviado!');
    } catch (err) {
      Alert.alert('Ocorreu um erro ao enviar o pedido de auxílio!');
    }

    setLoading(false);
  }
  return (
    <>
      <TopBar />
      <Background>
        <Container>
          <TextArea
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={25}
            autoCorrect={false}
            autoCapitalize="sentences"
            textAlignVertical="top"
            placeholder="Inclua seu pedido de auxílio"
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Enviar pedido
          </SubmitButton>
        </Container>
      </Background>
    </>
  );
}
