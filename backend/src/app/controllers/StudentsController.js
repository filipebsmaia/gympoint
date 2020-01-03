import * as Yup from 'yup';

import Sequelize from 'sequelize';
import Student from '../models/Student';

class StudentsController {
  async index(req, res) {
    const { name, email } = req.query;

    if (email) {
      const student = await Student.findOne({
        where: {
          email,
        },
      });
      if (!student) {
        return res.status(400).json({ error: 'Student does not exists.' });
      }
      const { id, name: studentName, age, weight, height } = student;
      return res.json({ id, name: studentName, email, age, weight, height });
    }

    const student = await Student.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name || ''}%`,
        },
      },
      order: ['created_at'],
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });
    return res.json(student);
  }

  async store(req, res) {
    const studentExists = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );
    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const studentExists = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const { email, newEmail } = req.body;

    if (newEmail && newEmail !== email) {
      const validNewEmail = await Student.findOne({
        where: {
          email: newEmail,
        },
      });

      if (validNewEmail) {
        return res
          .status(400)
          .json({ error: 'Already have student using this email.' });
      }
    }

    const student = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    await student.update({ ...req.body, email: newEmail || email });

    const { id, name, age, weight, height } = student;

    return res.json({
      id,
      name,
      email: newEmail || email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const deletedStudent = await Student.destroy({
      where: {
        id,
      },
    });

    if (deletedStudent !== 1) {
      return res
        .status(500)
        .json({ error: 'Failed to delete student.', deletedStudent });
    }
    return res.json({ success: 'Student deleted.' });
  }
}

export default new StudentsController();
