import Registration from '../models/Registration';

import CreateRegistrationService from '../services/CreateRegistrationService';
import UpdateRegistrationService from '../services/UpdateRegistrationService';
import ListRegistrationService from '../services/ListRegistrationService';

class RegistrationsController {
  async index(req, res) {
    const { id } = req.query;
    const registration = await ListRegistrationService.run({ id });

    return res.json(registration);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const registration = await CreateRegistrationService.run({
      student_id,
      plan_id,
      start_date,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const { end_date, price } = await UpdateRegistrationService.run({
      registration_id: id,
      student_id,
      plan_id,
      start_date,
    });

    return res.json({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    if (!registration) {
      return res.status(400).json({ error: 'Registration does not exists.' });
    }

    const deletedRegistration = await Registration.destroy({
      where: {
        id,
      },
    });
    if (deletedRegistration !== 1) {
      return res
        .status(500)
        .json({ error: 'Failed to delete plan.', deletedRegistration });
    }
    return res.json({ success: 'Registration deleted.' });
  }
}

export default new RegistrationsController();
