import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import refuel from './refuel';
import repair from './repair';
import inspection from './inspection';
import insurance from './insurance';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/refuel`} component={refuel} />
      <ErrorBoundaryRoute path={`${match.url}/repair`} component={repair} />
      <ErrorBoundaryRoute path={`${match.url}/inspection`} component={inspection} />
      <ErrorBoundaryRoute path={`${match.url}/insurance`} component={insurance} />
    </Switch>
  </>
);

export default Routes;
