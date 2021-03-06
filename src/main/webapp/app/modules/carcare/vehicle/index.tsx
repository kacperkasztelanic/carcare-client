import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Vehicle from './vehicle';
import VehicleDeleteDialog from './vehicle-delete-dialog';
import VehicleCreate from './vehicle-create';
import VehicleDetails from './vehicle-details';
import VehicleDetailsUpdate from './vehicle-details-update';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/details/:id`} component={VehicleDetails} />
            <ErrorBoundaryRoute path={`${match.url}`} component={Vehicle} />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/details/:id/edit`} component={VehicleDetailsUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VehicleDeleteDialog} />
        <ErrorBoundaryRoute path={`${match.url}/new`} component={VehicleCreate} />
        <ErrorBoundaryRoute path={`${match.url}/:id/edit`} component={VehicleCreate} />
    </>
);

export default Routes;
