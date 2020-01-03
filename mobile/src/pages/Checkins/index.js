import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Alert} from 'react-native';
import api from '~/services/api';

import Background from '~/components/Background';
import Checkin from '~/components/Checkin';
import TopBar from '~/components/TopBar';
import {Container, SubmitButton, CheckinView, List} from './styles';

export default function Checkins() {
  const student = useSelector(state => state.auth.student);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadCheckins() {
    const response = await api.get(`students/${student.id}/checkins`);
    setCheckins(response.data);
  }

  useEffect(() => {
    loadCheckins();
  }, []); //eslint-disable-line

  async function handleAddCheckin() {
    try {
      setLoading(true);
      await api.post(`students/${student.id}/checkins`);
      await loadCheckins();
    } catch (err) {
      Alert.alert('Você excedeu o limite de check-ins semanais!');
    }
    setLoading(false);
  }

  return (
    <>
      <TopBar />
      <Background>
        <Container>
          <CheckinView>
            <SubmitButton loading={loading} onPress={handleAddCheckin}>
              Novo check-in
            </SubmitButton>
            <List
              data={checkins}
              keyExtractor={item => String(item.id)}
              renderItem={({item}) => <Checkin data={item} />}
            />
          </CheckinView>
        </Container>
      </Background>
    </>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({tintColor}) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
