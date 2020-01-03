import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {MdKeyboardArrowLeft, MdCheck} from 'react-icons/md';

import {toast} from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv, Button} from '~/styles/global';
import Loading from '~/components/Loading';
import {EditForm} from './styles';

export default function EditPlan({match}) {
  const {id} = match.params;
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function loadPlan() {
      setLoading(true);
      const {data} = await api.get(`plans`, {
        params: {
          id,
        },
      });

      setTitle(data.title);
      setDuration(data.duration);
      setPrice(data.price);
      setLoading(false);
    }

    loadPlan();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function goBack() {
    history.push(`/plans`);
  }

  async function updatePlan() {
    try {
      await api.put(`plans/${id}`, {
        title,
        duration,
        price,
      });

      toast.success('Plano atualizado com sucesso!');
    } catch (err) {
      toast.error('Verifique os dados inseridos!');
    }
  }

  useEffect(() => {
    setTotalPrice(price * duration);
  }, [duration, price]);

  return (
    <Container>
      <HeaderDiv>
        <h1>Edição de plano</h1>
        <div>
          <Button type="button" color="#CCC" onClick={goBack}>
            <MdKeyboardArrowLeft size={20} color="#FFF" />
            Voltar
          </Button>
          <Button type="button" color="#EE4D64" onClick={updatePlan}>
            <MdCheck size={20} color="#FFF" />
            Salvar
          </Button>
        </div>
      </HeaderDiv>
      <ContentDiv>
        {(loading && <Loading />) || (
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
        )}
      </ContentDiv>
    </Container>
  );
}

EditPlan.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
