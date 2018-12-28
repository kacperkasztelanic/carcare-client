import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Insurance from './insurance';
import InsuranceDeleteDialog from './insurance-delete-dialog';
import InsuranceUpdate from './insurance-update';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:vehicleId`} component={Insurance} />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/new`} component={InsuranceUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/edit`} component={InsuranceUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/delete`} component={InsuranceDeleteDialog} />
    </>
);

export default Routes;
