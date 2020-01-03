import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
      answer_at: Yup.date(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation failed.', messages: err.inner });
  }
};
