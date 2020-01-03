import React, {useState, useEffect} from 'react';

import {MdKeyboardArrowLeft, MdCheck} from 'react-icons/md';

import {toast} from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv, Button} from '~/styles/global';
import {EditForm} from './styles';

export default function EditPlan() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function goBack() {
    history.push(`/plans`);
  }

  async function createPlan() {
    await api.post('plans/', {
      title,
      duration,
      price,
    });

    setTitle('');
    setDuration(0);
    setPrice(0);
    setTotalPrice(0);

    toast.success('Plano criado com sucesso!');
  }

  useEffect(() => {
    setTotalPrice(price * duration);
  }, [duration, price]);

  return (
    <Container>
      <HeaderDiv>
        <h1>Cadastro de planos</h1>
        <div>
          <Button type="button" color="#CCC" onClick={goBack}>
            <MdKeyboardArrowLeft size={20} color="#FFF" />
            Voltar
          </Button>
          <Button type="button" color="#EE4D64" onClick={createPlan}>
            <MdCheck size={20} color="#FFF" />
            Salvar
          </Button>
        </div>
      </HeaderDiv>
      <ContentDiv>
        <EditForm>
          <h2>Título do plano</h2>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div>
            <div>
              <h2>Duração (em meses)</h2>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </div>
            <div>
              <h2>Preço mensal</h2>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div>
              <h2>Preço total</h2>
              <input
                type="number"
                value={totalPrice}
                onChange={e => setTotalPrice(e.target.value)}
                disabled
              />
            </div>
          </div>
        </EditForm>
      </ContentDiv>
    </Container>
  );
}
