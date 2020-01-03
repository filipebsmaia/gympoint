import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class CreateRegistrationService {
  async run({ id }) {
    if (id) {
      const registration = await Registration.findByPk(id, {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title', 'duration', 'price'],
          },
        ],
      });
      if (!registration) {
        throw new Error('Registration does not exists.');
      }
      return registration;
    }

    const registration = await Registration.findAll({
      order: ['start_date'],
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'age', 'weight', 'height'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'duration', 'price'],
        },
      ],
    });

    return registration;
  }
}

export default new CreateRegistrationService();
