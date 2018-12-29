import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Vehicle from './vehicle';
import VehicleDeleteDialog from './vehicle-delete-dialog';
import VehicleUpdate from './vehicle-update';
import VehicleDetails from './vehicle-details';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:id`} component={VehicleDetails} />
            <ErrorBoundaryRoute path={`${match.url}`} component={Vehicle} />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/new`} component={VehicleUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:id/edit`} component={VehicleUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VehicleDeleteDialog} />
    </>
);

export default Routes;
