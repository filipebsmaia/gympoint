import React, {useState, useEffect} from 'react';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import {MdAdd, MdCheckCircle} from 'react-icons/md';

import {Link} from 'react-router-dom';

import {toast} from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv} from '~/styles/global';
import Loading from '~/components/Loading';
import {RegistrationTable} from './styles';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleRegisterPlan() {
    history.push('/registrations/register');
  }

  async function handleDeleteRegistration(registration) {
    // eslint-disable-next-line
    const r = confirm(
      `Você deseja realmente apagar a matricula de ${registration.student.name}?`
    );
    if (r) {
      try {
        await api.delete(`/registrations/${registration.id}`);
        setRegistrations(registrations.filter(reg => reg !== registration));
        toast.success(
          `A matricula de ${registration.student.name} foi apagada!`
        );
      } catch (err) {
        toast.error(
          `Ocorreu um erro ao apagar matricula de ${registration.student.name}!`
        );
      }
    }
  }

  async function loadRegistrations() {
    setLoading(true);
    const response = await api.get('registrations');

    function formatDate(date) {
      return format(parseISO(date), "d 'de' MMMM 'de' yyyy", {
        locale: pt,
      });
    }

    const data = response.data.map(registration => {
      registration.startDateFormated = formatDate(registration.start_date);
      registration.endDateFormated = formatDate(registration.end_date);

      return registration;
    });
    // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setRegistrations(data);
    setLoading(false);
  }

  useEffect(() => {
    loadRegistrations();
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
          <RegistrationTable>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Plano</th>
                <th>Início</th>
                <th>Término</th>
                <th>Ativa</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(registration => (
                <tr key={String(registration.id)}>
                  <td>{registration.student.name}</td>
                  <td>{registration.plan.title}</td>
                  <td>{registration.startDateFormated}</td>
                  <td>{registration.endDateFormated}</td>
                  <td>
                    {registration.active ? (
                      <MdCheckCircle size={20} color="#42CB59" />
                    ) : (
                      <MdCheckCircle size={20} color="#DDD" />
                    )}
                  </td>
                  <td>
                    <div>
                      <Link to={`/registrations/edit/${registration.id}`}>
                        editar
                      </Link>
                      <button
                        type="button"
                        color="#DE3B3B"
                        onClick={() => handleDeleteRegistration(registration)}>
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </RegistrationTable>
        )}
      </ContentDiv>
    </Container>
  );
}
