import React, {useState, useEffect} from 'react';
import {MdAdd, MdSearch} from 'react-icons/md';
import {Link} from 'react-router-dom';

import {toast} from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv} from '~/styles/global';
import Loading from '~/components/Loading';
import {StudentsTable} from './styles';

export default function StudentsList() {
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  function handleRegisterStudent() {
    history.push('/students/register');
  }

  async function handleDeleteStudent(student) {
    const r = confirm(`Você deseja realmente apagar o aluno ${student.name}?`); //eslint-disable-line
    if (r) {
      try {
        await api.delete(`/students/${student.id}`);
        setStudents(students.filter(s => s !== student));
        toast.success(`O aluno ${student.name} foi apagado!`);
      } catch (err) {
        toast.error(`Ocorreu um erro ao apagar o aluno ${student.name}!`);
      }
    }
  }

  async function loadStudents() {
    setLoading(true);
    const response = await api.get('students', {
      params: {name: search},
    });

    setStudents(response.data);
    setSearch('');
    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <HeaderDiv>
        <h1>Gerenciando alunos</h1>
        <div>
          <button type="button" onClick={handleRegisterStudent}>
            <MdAdd size={20} color="#FFF" />
            Cadastrar
          </button>
          <form
            onSubmit={e => {
              e.preventDefault();
              loadStudents();
            }}>
            <MdSearch size={20} color="#999" />
            <input
              placeholder="Buscar aluno"
              value={search}
              onChange={e => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
            />
          </form>
        </div>
      </HeaderDiv>
      <ContentDiv>
        {(loading && <Loading />) || (
          <StudentsTable>
            <thead>
              <tr>
                <th>Nome</th>
                <th>e-mail</th>
                <th>Idade</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.email}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <div>
                      <Link to={`/students/edit/${student.email}`}>editar</Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteStudent(student)}>
                        apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </StudentsTable>
        )}
      </ContentDiv>
    </Container>
  );
}
