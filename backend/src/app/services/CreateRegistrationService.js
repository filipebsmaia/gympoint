import Sequelize from 'sequelize';
import { startOfDay, parseISO, isBefore, addMonths } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Queue from '../../lib/Queue';
import RegistrationMail from '../jobs/RegistrationMail';

class CreateRegistrationService {
  async run({ student_id, plan_id, start_date }) {
    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Student does not exists.');
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      throw new Error('Plan does not exists.');
    }

    const dayStart = startOfDay(parseISO(start_date));
    if (isBefore(dayStart, startOfDay(new Date()))) {
      throw new Error('Past dates are not permited.');
    }

    const activeRegistration = await Registration.findOne({
      where: {
        student_id,
        end_date: {
          [Sequelize.Op.gte]: new Date(),
        },
      },
    });

    if (activeRegistration) {
      throw new Error('Student already has an active registration.');
    }

    const { duration, price: planPrice } = plan;
    const end_date = addMonths(parseISO(start_date), duration);

    const price = planPrice * duration;

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(RegistrationMail.key, {
      registration,
      student,
      plan,
    });

    return registration;
  }
}

export default new CreateRegistrationService();
