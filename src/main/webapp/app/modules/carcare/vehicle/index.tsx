import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

const Routes = ({ match }) => (
    <>
        <Switch>
            {/* <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VehicleUpdate} /> */}
            {/* <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VehicleUpdate} /> */}
        </Switch>
    </>
);

export default Routes;
