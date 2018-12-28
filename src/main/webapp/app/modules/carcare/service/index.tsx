import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Service from './service';
import ServiceDeleteDialog from './service-delete-dialog';
import ServiceUpdate from './service-update';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:vehicleId`} component={Service} />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/new`} component={ServiceUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/edit`} component={ServiceUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/delete`} component={ServiceDeleteDialog} />
    </>
);

export default Routes;
