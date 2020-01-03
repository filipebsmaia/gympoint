import React, {useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {format, parseISO, addMonths} from 'date-fns';

import {MdKeyboardArrowLeft, MdCheck} from 'react-icons/md';

import {toast} from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {Container, ContentDiv, HeaderDiv, Button} from '~/styles/global';
import Loading from '~/components/Loading';
import {EditForm} from './styles';

export default function EditRegistration({match}) {
  const {id} = match.params;
  const [loading, setLoading] = useState(true);

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
      // Update to current values
      const {data} = await api.get(`registrations`, {
        params: {
          id,
        },
      });

      setSelectedPlan(data.plan);
      setSelectedStudent(data.student);

      // Load all plans and students
      const {data: plansData} = await api.get('plans');
      setPlans(plansData);

      const {data: studentsData} = await api.get('students');
      setStudents(studentsData);

      setLoading(false);
    }

    fetchData();
  }, []); //eslint-disable-line

  function goBack() {
    history.push(`/registrations`);
  }

  async function editRegistration() {
    try {
      await api.put(`registrations/${id}`, {
        student_id: selectedStudent.id,
        plan_id: selectedPlan.id,
        start_date: parseISO(startDate),
      });
      toast.success('Matricula salva com sucesso!');
    } catch (err) {
      toast.error(
        'Verifique os dados inseridos ou se o aluno já não possui uma matricula ativa!'
      );
    }
  }

  return (
    <Container>
      <HeaderDiv>
        <h1>Edição de matrícula</h1>
        <div>
          <Button type="button" color="#CCC" onClick={goBack}>
            <MdKeyboardArrowLeft size={20} color="#FFF" />
            Voltar
          </Button>
          <Button type="button" color="#EE4D64" onClick={editRegistration}>
            <MdCheck size={20} color="#FFF" />
            Salvar
          </Button>
        </div>
      </HeaderDiv>
      <ContentDiv>
        {(loading && <Loading />) || (
          <EditForm>
            <h2>Aluno</h2>
            <select
              value={selectedStudent.id}
              onChange={e => {
                setSelectedStudent(
                  students.find(
                    student => student.id === Number(e.target.value)
                  )
                );
              }}>
              <option value={selectedStudent.id}>{selectedStudent.name}</option>
              {students.map(
                student =>
                  selectedStudent.id !== student.id && (
                    <option key={String(student.id)} value={student.id}>
                      {student.name}
                    </option>
                  )
              )}
            </select>
            <div>
              <div>
                <h2>Plano</h2>
                <select
                  value={selectedPlan.id}
                  onChange={e => {
                    setSelectedPlan(
                      plans.find(plan => plan.id === Number(e.target.value))
                    );
                  }}>
                  <option value={selectedPlan.id}>{selectedPlan.title}</option>
                  {plans.map(
                    plan =>
                      selectedPlan.id !== plan.id && (
                        <option key={String(plan.id)} value={plan.id}>
                          {plan.title}
                        </option>
                      )
                  )}
                </select>
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
        )}
      </ContentDiv>
    </Container>
  );
}

EditRegistration.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
