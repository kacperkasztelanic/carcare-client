import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import refuel from './refuel';
import repair from './repair';
import inspection from './inspection';
import insurance from './insurance';
import service from './service';
import reports from './reports';
import events from './events';
import statistics from './statistics';
import vehicle from './vehicle';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/refuel`} component={refuel} />
      <ErrorBoundaryRoute path={`${match.url}/repair`} component={repair} />
      <ErrorBoundaryRoute path={`${match.url}/inspection`} component={inspection} />
      <ErrorBoundaryRoute path={`${match.url}/insurance`} component={insurance} />
      <ErrorBoundaryRoute path={`${match.url}/service`} component={service} />
      <ErrorBoundaryRoute path={`${match.url}/reports`} component={reports} />
      <ErrorBoundaryRoute path={`${match.url}/events`} component={events} />
      <ErrorBoundaryRoute path={`${match.url}/statistics`} component={statistics} />
      <ErrorBoundaryRoute path={`${match.url}/`} component={vehicle} />
    </Switch>
  </>
);

export default Routes;
