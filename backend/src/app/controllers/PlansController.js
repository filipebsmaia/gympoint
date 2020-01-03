import Plan from '../models/Plan';

class PlansController {
  async index(req, res) {
    const { id } = req.query;
    const where = {};
    if (id) {
      const plan = await Plan.findByPk(id);
      if (!plan) {
        return res.status(400).json({ error: 'Plan does not exists.' });
      }
      const { title, duration, price } = plan;
      return res.json({ id, title, duration, price });
    }

    const plan = await Plan.findAll({
      where,
      order: ['price'],
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plan);
  }

  async store(req, res) {
    const { title } = req.body;

    const plan = await Plan.findOne({
      where: {
        title,
      },
    });

    if (plan) {
      return res
        .status(401)
        .json({ error: 'Plan with that name already exists.' });
    }

    const { id, duration, price } = await Plan.create(req.body);
    return res.json({
      Plans: {
        id,
        title,
        duration,
        price,
      },
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    const { title, duration, price } = await plan.update(req.body);
    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    const deletedPlan = await Plan.destroy({
      where: {
        id,
      },
    });
    if (deletedPlan !== 1) {
      return res
        .status(500)
        .json({ error: 'Failed to delete plan.', deletedPlan });
    }
    return res.json({ success: 'Plan deleted.' });
  }
}
export default new PlansController();
