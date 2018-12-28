import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Inspection from './inspection';
import InspectionDeleteDialog from './inspection-delete-dialog';
import InspectionUpdate from './inspection-update';

const Routes = ({ match }) => (
    <>
        <Switch>
            <ErrorBoundaryRoute path={`${match.url}/:vehicleId`} component={Inspection} />
        </Switch>
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/new`} component={InspectionUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/edit`} component={InspectionUpdate} />
        <ErrorBoundaryRoute path={`${match.url}/:vehicleId/:id/delete`} component={InspectionDeleteDialog} />
    </>
);

export default Routes;
