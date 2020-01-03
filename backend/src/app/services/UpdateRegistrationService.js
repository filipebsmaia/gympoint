import { startOfDay, parseISO, isBefore, addMonths } from 'date-fns';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class UpdateRegistrationService {
  async run({ registration_id, student_id, plan_id, start_date }) {
    const registration = await Registration.findByPk(registration_id);

    if (!registration) {
      throw new Error('Registration does not exists.');
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Student does not exists.');
    }

    if (plan_id) {
      const plan = await Plan.findByPk(plan_id);

      if (!plan) {
        throw new Error('Plan does not exists.');
      }

      const dayStart = startOfDay(parseISO(start_date));
      if (isBefore(dayStart, startOfDay(new Date()))) {
        throw new Error('Past dates are not permited.');
      }

      const { duration, price: planPrice } = plan;
      const end_date = addMonths(parseISO(start_date), duration);

      const price = planPrice * duration;

      const updatedRegistration = await registration.update({
        student_id,
        plan_id,
        start_date,
        end_date,
        price,
      });

      return updatedRegistration;
    }

    return registration;
  }
}

export default new UpdateRegistrationService();
