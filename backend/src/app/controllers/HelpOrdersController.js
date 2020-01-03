import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

class HelpOrdersController {
  async index(req, res) {
    const { id } = req.params;

    if (id) {
      const helpOrders = await HelpOrder.findAll({
        where: {
          student_id: id,
        },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
          },
        ],
        order: ['created_at'],
        attributes: [
          'id',
          'student_id',
          'question',
          'answer',
          'answer_at',
          'created_at',
        ],
      });
      return res.json(helpOrders);
    }

    const helpOrders = await HelpOrder.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
        },
      ],
      order: ['created_at'],
      attributes: [
        'id',
        'student_id',
        'question',
        'answer',
        'answer_at',
        'created_at',
      ],
    });
    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const { id: helpOrderId, answer, answer_at } = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json({
      id: helpOrderId,
      student_id: Number(id),
      question,
      answer,
      answer_at,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { answer, answer_at } = req.body;

    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exists.' });
    }
    await helpOrder.update({
      answer,
      answer_at: answer_at || new Date(),
    });

    await Queue.add(HelpOrderAnswerMail.key, {
      helpOrder,
    });

    return res.json(helpOrder);
  }
}
export default new HelpOrdersController();
