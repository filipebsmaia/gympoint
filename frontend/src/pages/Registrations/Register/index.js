import React, {useState, useEffect, useMemo} from 'react';
import {format, parseISO, addMonths} from 'date-fns';

import {MdKeyboardArrowLeft, MdCheck} from 'react-icons/md';

import {toast} from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv, Button} from '~/styles/global';
import {EditForm} from './styles';

export default function EditPlan() {
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState();
  const [selectedPlan, setSelectedPlan] = useState();
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const endDate = useMemo(() => {
    if (selectedPlan && startDate) {
      return format(
        addMonths(parseISO(startDate), selectedPlan.duration),
        'yyyy-MM-dd'
      );
    }
    return format(new Date(), 'yyyy-MM-dd');
  }, [selectedPlan, startDate]);

  const finalValue = useMemo(() => {
    if (selectedPlan) {
      return selectedPlan.duration * selectedPlan.price;
    }
    return 0;
  }, [selectedPlan]);

  useEffect(() => {
    async function fetchData() {
      const {data: plansData} = await api.get('plans');
      setPlans(plansData);
      if (plansData[0]) {
        setSelectedPlan(plansData[0]);
      }

      const {data: studentsData} = await api.get('students');
      setStudents(studentsData);
      if (studentsData[0]) {
        setSelectedStudent(studentsData[0]);
      }
    }

    fetchData();
  }, []); //eslint-disable-line

  function goBack() {
    history.push(`/registrations`);
  }

  async function createRegistration() {
    try {
      await api.post('registrations/', {
        student_id: selectedStudent.id,
        plan_id: selectedPlan.id,
        start_date: parseISO(startDate),
      });
      toast.success('Matricula criada com sucesso!');
    } catch (err) {
      toast.error(
        'Verifique os dados inseridos ou se o aluno já não possui uma matricula ativa!'
      );
    }
  }

  return (
    <Container>
      <HeaderDiv>
        <h1>Cadastro de matrícula</h1>
        <div>
          <Button type="button" color="#CCC" onClick={goBack}>
            <MdKeyboardArrowLeft size={20} color="#FFF" />
            Voltar
          </Button>
          <Button type="button" color="#EE4D64" onClick={createRegistration}>
            <MdCheck size={20} color="#FFF" />
            Salvar
          </Button>
        </div>
      </HeaderDiv>
      <ContentDiv>
        <EditForm>
          <h2>Aluno</h2>
          <select
            onChange={e => {
              setSelectedStudent(
                students.find(student => student.id === Number(e.target.value))
              );
            }}>
            {students.map(student => (
              <option key={String(student.id)} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <div>
            <div>
              <h2>Plano</h2>
              <select
                onChange={e => {
                  setSelectedPlan(
                    plans.find(plan => plan.id === Number(e.target.value))
                  );
                }}>
                {plans.map(plan => (
                  <option key={String(plan.id)} value={plan.id}>
                    {plan.title}
                  </option>
                ))}
              </select>
              {/* <AsyncSelector
                cacheOptions
                defaultOptions
                loadOptions={loadPlans}
              /> */}
            </div>
            <div>
              <h2>Data de inicio</h2>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <h2>Data de término</h2>
              <input type="date" value={endDate} disabled />
            </div>
            <div>
              <h2>Valor final</h2>
              <input type="number" value={finalValue} disabled />
            </div>
          </div>
        </EditForm>
      </ContentDiv>
    </Container>
  );
}
