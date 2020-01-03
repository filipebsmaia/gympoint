import React, {useState} from 'react';

import {MdKeyboardArrowLeft, MdCheck} from 'react-icons/md';

import {toast} from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv, Button} from '~/styles/global';
import {EditForm} from './styles';

export default function EditStudents() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  function goBack() {
    history.push(`/students`);
  }

  async function createStudent() {
    await api.post('students/', {
      name,
      email,
      age,
      weight,
      height,
    });

    setName('');
    setEmail('');
    setAge('');
    setWeight('');
    setHeight('');

    toast.success('Aluno criado com sucesso!');
  }

  return (
    <Container>
      <HeaderDiv>
        <h1>Cadastro de aluno</h1>
        <div>
          <Button type="button" color="#CCC" onClick={goBack}>
            <MdKeyboardArrowLeft size={20} color="#FFF" />
            Voltar
          </Button>
          <Button type="button" color="#EE4D64" onClick={createStudent}>
            <MdCheck size={20} color="#FFF" />
            Salvar
          </Button>
        </div>
      </HeaderDiv>
      <ContentDiv>
        <EditForm>
          <h2>Nome completo</h2>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <h2>Endereço de e-mail</h2>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
      </ContentDiv>
    </Container>
  );
}
