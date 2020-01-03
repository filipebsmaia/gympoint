import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {MdKeyboardArrowLeft, MdCheck} from 'react-icons/md';

import {toast} from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv, Button} from '~/styles/global';
import Loading from '~/components/Loading';
import {EditForm} from './styles';

export default function EditStudent({match}) {
  const {email} = match.params;
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [newEmail, setNewEmailmail] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    async function loadStudent() {
      setLoading(true);
      const {data} = await api.get('students/', {
        params: {
          email,
        },
      });

      setName(data.name);
      setNewEmailmail(email);
      setAge(data.age);
      setWeight(data.weight);
      setHeight(data.height);
      setLoading(false);
    }

    loadStudent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function goBack() {
    history.push(`/students`);
  }

  async function updateStudent() {
    try {
      await api.put('students/', {
        name,
        email,
        newEmail,
        age,
        weight,
        height,
      });
      history.push(`/students/edit/${newEmail}`);
      toast.success('Aluno atualizado com sucesso!');
    } catch (err) {
      toast.error('Verifique os dados inseridos!');
    }
  }

  return (
    <Container>
      <HeaderDiv>
        <h1>Edição de alunos</h1>
        <div>
          <Button type="button" color="#CCC" onClick={goBack}>
            <MdKeyboardArrowLeft size={20} color="#FFF" />
            Voltar
          </Button>
          <Button type="button" color="#EE4D64" onClick={updateStudent}>
            <MdCheck size={20} color="#FFF" />
            Salvar
          </Button>
        </div>
      </HeaderDiv>
      <ContentDiv>
        {(loading && <Loading />) || (
          <EditForm>
            <h2>Nome</h2>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <h2>Endereço de e-mail</h2>
            <input
              type="email"
              value={newEmail}
              onChange={e => setNewEmailmail(e.target.value)}
            />
            <div>
              <div>
                <h2>Idade</h2>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                />
              </div>
              <div>
                <h2>PESO (em kg)</h2>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                />
              </div>
              <div>
                <h2>Altura</h2>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                />
              </div>
            </div>
          </EditForm>
        )}
      </ContentDiv>
    </Container>
  );
}

EditStudent.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
