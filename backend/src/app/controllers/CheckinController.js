import { subDays } from 'date-fns';
import Sequelize from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
      },
      order: ['created_at'],
      attributes: ['id', 'student_id', ['created_at', 'date']],
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const checkins = await Checkin.findAndCountAll({
      where: {
        student_id: id,
        created_at: {
          [Sequelize.Op.gte]: subDays(new Date(), 7),
        },
      },
      order: ['created_at'],
      attributes: ['id', 'student_id', ['created_at', 'date']],
    });

    if (checkins.count >= 5) {
      return res.status(401).json({ error: 'Check-in limit exceeded.' });
    }

    const { id: checkinId, createdAt } = await Checkin.create({
      student_id: id,
    });

    return res.json({
      id: checkinId,
      created_at: createdAt,
    });
  }
}
export default new CheckinController();
