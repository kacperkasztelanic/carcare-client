import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import refuel from './refuel';

const Routes = ({ match }) => (
  <div>
      <ErrorBoundaryRoute path={`${match.url}/refuel`} component={refuel} />
  </div>
);

export default Routes;
