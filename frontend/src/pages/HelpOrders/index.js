import React, {useState, useEffect} from 'react';

import {toast} from 'react-toastify';

import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv, Button} from '~/styles/global';
import Loading from '~/components/Loading';
import {HelpOrderTable, ReplyContainer} from './styles';

export default function HelpOrders() {
  const [loading, setLoading] = useState(true);
  const [helpOrders, setHelpOrders] = useState([]);

  const [visible, setVisible] = useState(false);
  const [showOrder, setShowOrder] = useState([]);
  const [answer, setAnswer] = useState('');

  function handleReplyHelpOrder(order) {
    setVisible(true);
    setShowOrder(order);
  }

  async function sendAnswerToReplyOrder() {
    setLoading(true);
    try {
      await api.put(`/help-orders/${showOrder.id}/answer`, {answer});

      setVisible(false);
      setShowOrder([]);
      setAnswer('');

      setHelpOrders(helpOrders.filter(order => order !== showOrder));

      toast.success('Pedido de auxílio atualizado com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro ao responser este pedido de auxílio!');
    }
    setLoading(false);
  }

  useEffect(() => {
    async function loadStudents() {
      setLoading(true);
      const {data: orders} = await api.get('help-orders');

      setHelpOrders(orders.filter(order => order.answer_at == null));

      setLoading(false);
    }
    loadStudents();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <HeaderDiv>
        <h1>Pedidos de auxílio</h1>
      </HeaderDiv>
      <ContentDiv>
        {(loading && <Loading />) || (
          <HelpOrderTable>
            <thead>
              <tr>
                <th>Aluno</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {helpOrders.map(order => (
                <tr key={String(order.id)}>
                  <td>{order.student.name}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleReplyHelpOrder(order)}>
                      responder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </HelpOrderTable>
        )}
      </ContentDiv>
      <ReplyContainer visible={visible}>
        <div>
          <strong>Pergunta</strong>
          <p>{showOrder.question}</p>
          <strong>Resposta</strong>
          <textarea value={answer} onChange={e => setAnswer(e.target.value)} />
          <Button
            type="button"
            onClick={sendAnswerToReplyOrder}
            color="#EE4D64">
            {(loading && 'Enviando resposta...') || 'Responder aluno'}
          </Button>
        </div>
      </ReplyContainer>
    </Container>
  );
}
