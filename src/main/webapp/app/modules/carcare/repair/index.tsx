import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Repair from './repair';
import RepairDeleteDialog from './repair-delete-dialog';
import RepairUpdate from './repair-update';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:vehicleId`} component={Repair} />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/new`} component={RepairUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/edit`} component={RepairUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/delete`} component={RepairDeleteDialog} />
    </>
);

export default Routes;
