import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import RegisterStudent from '../pages/Students/Register';
import EditStudent from '../pages/Students/Edit';

import Plans from '../pages/Plans';
import RegisterPlan from '../pages/Plans/Register';
import EditPlan from '../pages/Plans/Edit';

import Registrations from '../pages/Registrations';
import RegisterRegistrations from '../pages/Registrations/Register';
import EditRegistrations from '../pages/Registrations/Edit';

import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/register" component={RegisterStudent} isPrivate />
      <Route path="/students/edit/:email" component={EditStudent} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/register" component={RegisterPlan} isPrivate />
      <Route path="/plans/edit/:id" component={EditPlan} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/register"
        component={RegisterRegistrations}
        isPrivate
      />
      <Route
        path="/registrations/edit/:id"
        component={EditRegistrations}
        isPrivate
      />

      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
