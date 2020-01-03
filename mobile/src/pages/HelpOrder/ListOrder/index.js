import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {useSelector} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import TopBar from '~/components/TopBar';
import HelpOrderButtonSummary from '~/components/HelpOrderButtonSummary';
import {Container, SubmitButton, HelpOrderView, List} from './styles';

function ListOrder({navigation, isFocused}) {
  const student = useSelector(state => state.auth.student);
  const [helpOrders, setHelpOrders] = useState();

  async function loadHelpOrders() {
    const response = await api.get(`students/${student.id}/help-orders`);
    setHelpOrders(response.data);
  }

  useEffect(() => {
    loadHelpOrders();
  }, [isFocused]); //eslint-disable-line

  return (
    <>
      <TopBar />
      <Background>
        <Container>
          <HelpOrderView>
            <SubmitButton onPress={() => navigation.navigate('NewHelpOrder')}>
              Novo pedido de auxílio
            </SubmitButton>

            <List
              data={helpOrders}
              keyExtractor={item => String(item.id)}
              renderItem={({item}) => (
                <HelpOrderButtonSummary
                  data={item}
                  onPress={() =>
                    navigation.navigate('HelpOrderViewer', {order: item})
                  }
                />
              )}
            />
          </HelpOrderView>
        </Container>
      </Background>
    </>
  );
}

ListOrder.propTypes = {
  isFocused: PropTypes.oneOfType[PropTypes.object].isRequired,
};

export default withNavigationFocus(ListOrder);
