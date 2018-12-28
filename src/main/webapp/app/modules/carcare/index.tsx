import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import refuel from './refuel';
import repair from './repair';
import inspection from './inspection';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/refuel`} component={refuel} />
      <ErrorBoundaryRoute path={`${match.url}/repair`} component={repair} />
      <ErrorBoundaryRoute path={`${match.url}/inspection`} component={inspection} />
    </Switch>
  </>
);

export default Routes;
