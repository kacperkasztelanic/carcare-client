import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import vehicles, { VehiclesState } from 'app/modules/carcare/vehicle/vehicle.reducer';
import refuels, { RefuelsState } from 'app/modules/carcare/refuel/refuel.reducer';
import repairs, { RepairsState } from 'app/modules/carcare/repair/repair.reducer';
import inspections, { InspectionsState } from 'app/modules/carcare/inspection/inspection.reducer';
import insurances, { InsurancesState } from 'app/modules/carcare/insurance/insurance.reducer';
import services, { ServicesState } from 'app/modules/carcare/service/service.reducer';
import statistics, { StatisticsState } from 'app/modules/carcare/statistics/statistics.reducer';
import events, { EventsState } from 'app/modules/carcare/events/events.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly vehicles: VehiclesState;
  readonly refuels: RefuelsState;
  readonly repairs: RepairsState;
  readonly inspections: InspectionsState;
  readonly insurances: InsurancesState;
  readonly services: ServicesState;
  readonly statistics: StatisticsState;
  readonly events: EventsState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  vehicles,
  refuels,
  repairs,
  inspections,
  insurances,
  services,
  statistics,
  events,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
