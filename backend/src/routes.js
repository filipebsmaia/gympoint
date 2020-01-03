import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlansController from './app/controllers/PlansController';
import RegistrationsController from './app/controllers/RegistrationsController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrdersController from './app/controllers/HelpOrdersController';

import validateHelpOrderStore from './app/validators/HelpOrderStore';
import validateHelpOrderUpdate from './app/validators/HelpOrderUpdate';

import validatePlanStore from './app/validators/PlanStore';
import validatePlanUpdate from './app/validators/PlanUpdate';

import validateRegistrationStore from './app/validators/RegistrationStore';
import validateRegistrationUpdate from './app/validators/RegistrationUpdate';

import validateSessionStore from './app/validators/SessionStore ';

import validateStudentsStore from './app/validators/StudentsStore';
import validateStudentsUpdate from './app/validators/StudentsUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.get('/students', StudentsController.index);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

routes.post(
  '/students/:id/help-orders',
  validateHelpOrderStore,
  HelpOrdersController.store
);
routes.get('/students/:id/help-orders', HelpOrdersController.index);

routes.use(authMiddleware);

routes.get('/help-orders', HelpOrdersController.index);
routes.put(
  '/help-orders/:id/answer',
  validateHelpOrderUpdate,
  HelpOrdersController.update
);

routes.post('/students', validateStudentsStore, StudentsController.store);
routes.put('/students', validateStudentsUpdate, StudentsController.update);
routes.delete('/students/:id', StudentsController.delete);

routes.post('/plans', validatePlanStore, PlansController.store);
routes.put('/plans/:id', validatePlanUpdate, PlansController.update);
routes.delete('/plans/:id', PlansController.delete);
routes.get('/plans', PlansController.index);

routes.post(
  '/registrations',
  validateRegistrationStore,
  RegistrationsController.store
);
routes.put(
  '/registrations/:id',
  validateRegistrationUpdate,
  RegistrationsController.update
);
routes.delete('/registrations/:id', RegistrationsController.delete);
routes.get('/registrations', RegistrationsController.index);

export default routes;
