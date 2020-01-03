import React, {useState, useEffect} from 'react';

import {MdAdd} from 'react-icons/md';

import {Link} from 'react-router-dom';

import {toast} from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv} from '~/styles/global';
import Loading from '~/components/Loading';
import {PlanTable} from './styles';

export default function Plans() {
  const [loading, setLoading] = useState(true);

  const [plans, setPlans] = useState([]);

  function handleRegisterPlan() {
    history.push('/plans/register');
  }

  async function handleDeletePlan(plan) {
    const r = confirm(`Você deseja realmente apagar o plano ${plan.title}?`); //eslint-disable-line
    if (r) {
      try {
        await api.delete(`/plans/${plan.id}`);
        setPlans(plans.filter(p => p !== plan));
        toast.success(`O plano ${plan.title} foi apagado!`);
      } catch (err) {
        toast.error(`Ocorreu um erro ao apagar o plano ${plan.title}!`);
      }
    }
  }

  async function loadPlan() {
    setLoading(true);
    const response = await api.get('plans');

    setPlans(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadPlan();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <HeaderDiv>
        <h1>Gerenciando planos</h1>
        <button type="button" onClick={handleRegisterPlan}>
          <MdAdd size={20} color="#FFF" />
          Cadastrar
        </button>
      </HeaderDiv>
      <ContentDiv>
        {(loading && <Loading />) || (
          <PlanTable>
            <thead>
              <tr>
                <th>Título</th>
                <th>duração</th>
                <th>Valor p/ mês</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={String(plan.id)}>
                  <td>{plan.title}</td>
                  <td>
                    {plan.duration} {plan.duration <= 1 ? 'mês' : 'meses'}
                  </td>
                  <td>R${plan.price}</td>
                  <td>
                    <div>
                      <Link to={`/plans/edit/${plan.id}`}>editar</Link>
                      <button
                        type="button"
                        color="#DE3B3B"
                        onClick={() => handleDeletePlan(plan)}>
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </PlanTable>
        )}
      </ContentDiv>
    </Container>
  );
}
