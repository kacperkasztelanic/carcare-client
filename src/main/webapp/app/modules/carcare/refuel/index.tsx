import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Refuel from './refuel';
import RefuelDeleteDialog from './refuel-delete-dialog';
import RefuelUpdate from './refuel-update';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:vehicleId`} component={Refuel} />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/new`} component={RefuelUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/edit`} component={RefuelUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/delete`} component={RefuelDeleteDialog} />
    </>
);

export default Routes;
