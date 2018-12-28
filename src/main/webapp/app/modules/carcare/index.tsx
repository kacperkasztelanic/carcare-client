import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import refuel from './refuel';
import repair from './repair';

const Routes = ({ match }) => (
  <div>
      <ErrorBoundaryRoute path={`${match.url}/refuel`} component={refuel} />
      <ErrorBoundaryRoute path={`${match.url}/repair`} component={repair} />
  </div>
);

export default Routes;
