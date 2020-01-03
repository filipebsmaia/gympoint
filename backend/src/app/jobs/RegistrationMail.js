import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { registration, student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Nova matricula',
      template: 'registration',
      context: {
        student: student.name,
        user: student.name,
        plan: plan.title,
        price: plan.price,
        total: plan.duration * plan.price,
        months: plan.duration,
        date: format(parseISO(registration.end_date), "dd 'de' MMMM", {
          locale: pt,
        }),
      },
    });
  }
}

export default new RegistrationMail();
