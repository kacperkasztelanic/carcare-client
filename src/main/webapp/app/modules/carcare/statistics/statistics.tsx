import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Translate } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getVehicles } from '../vehicle/vehicle.reducer';
import { calculateConsumption, calculateCosts, calculateMileage, reset } from './statistics.reducer';
import BackButton from 'app/shared/components/BackButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, LabelList } from 'recharts';
import { APP_COLOR_GREEN, APP_COLOR_BLUE, APP_COLOR_CYAN, APP_COLOR_RED, APP_COLOR_YELLOW } from 'app/config/constants';

export interface IStatisticsProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IStatisticsState {
  selectedVehicle: any;
  dateFrom: Date;
  dateTo: Date;
}

export class Statistics extends React.Component<IStatisticsProps, IStatisticsState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicle: {
        id: ''
      },
      dateFrom: undefined,
      dateTo: undefined
    };
    this.onDateFromChange.bind(this);
    this.onDateToChange.bind(this);
    this.onVehicleSelect.bind(this);
  }

  componentDidMount() {
    this.props.reset();
    this.props.getVehicles();
  }

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  onVehicleSelect = event => {
    this.setState({
      selectedVehicle: this.props.vehicles.find(x => x.id == event.target.value)
    });
  };

  onDateFromChange = event => {
    this.setState({
      dateFrom: event.target.value
    });
  };

  onDateToChange = event => {
    this.setState({
      dateTo: event.target.value
    });
  };

  calculateClick = event => {
    event.preventDefault();
    if (this.state.selectedVehicle.id !== '' && this.state.dateFrom !== undefined && this.state.dateTo !== undefined) {
      this.props.calculateConsumption(this.state.selectedVehicle, this.state.dateFrom, this.state.dateTo);
      this.props.calculateCosts(this.state.selectedVehicle, this.state.dateFrom, this.state.dateTo);
      this.props.calculateMileage(this.state.selectedVehicle, this.state.dateFrom, this.state.dateTo);
    }
  };

  render() {
    const { vehicles, loading, calculated, consumptionResults, costsResults, mileageResults, minMileage } = this.props;
    return (
      <div>
        <Row>
          <Col md="12" sm="12">
            <h3>
              <FontAwesomeIcon icon="chart-bar" /> <Translate contentKey="carcare.statistics.title">Statistics</Translate>
            </h3>
            <hr />
          </Col>
        </Row>
        <Form>
          <Row>
            <Col md="4" sm="12">
              <FormGroup>
                <Label for="vehicleSelect">
                  <Translate contentKey="carcare.statistics.vehicle-select">Vehicle</Translate>
                </Label>
                <Input type="select" name="select" id="vehicleSelect" value={this.state.selectedVehicle.id} onChange={this.onVehicleSelect}>
                  <option disabled hidden />
                  {vehicles
                    ? vehicles.map(x => (
                        <option value={x.id} key={x.id}>
                          {x.make} {x.model} - {x.licensePlate}
                        </option>
                      ))
                    : null}
                </Input>
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label for="fromDate">
                  <Translate contentKey="carcare.statistics.date-from">From</Translate>
                </Label>
                <Input type="date" name="fromDate" id="fromDate" onChange={this.onDateFromChange} />
              </FormGroup>
            </Col>
            <Col md="4" sm="12">
              <FormGroup>
                <Label for="toDate">
                  <Translate contentKey="carcare.statistics.date-to">To</Translate>
                </Label>
                <Input type="date" name="toDate" id="toDate" onChange={this.onDateToChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12" sm="12">
              <div className="text-center">
                <Button
                  color="primary"
                  id="generate-report"
                  type="submit"
                  disabled={this.state.selectedVehicle.id === '' || !this.state.dateFrom || !this.state.dateTo}
                  onClick={this.calculateClick}
                >
                  <FontAwesomeIcon icon="calculator" /> <Translate contentKey="carcare.statistics.calculate">Calculate</Translate>
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col md="12" sm="12">
            <hr />
          </Col>
        </Row>
        {loading ? <ReactLoading type="bubbles" color="17A2B8" /> : null}
        {calculated ? (
          <div>
            <Row>
              <Col md="6" sm="12">
                <div className="text-center">
                  <h4>
                    <Translate contentKey="carcare.statistics.fuel-consumption" interpolate={{ unit: 'dm3/100km' }}>
                      Fuel consumption
                    </Translate>
                  </h4>
                </div>
                <ResponsiveContainer width="100%" aspect={16 / 9}>
                  <BarChart data={consumptionResults} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumption" fill={APP_COLOR_CYAN}>
                      <LabelList dataKey="consumption" position="inside" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Col>
              <Col md="6" sm="12">
                <div className="text-center">
                  <h4>
                    <Translate contentKey="carcare.statistics.costs" interpolate={{ unit: 'PLN' }}>
                      Costs
                    </Translate>
                  </h4>
                </div>
                <ResponsiveContainer width="100%" aspect={16 / 9}>
                  <BarChart data={costsResults} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="refuels" fill={APP_COLOR_GREEN}>
                      <LabelList dataKey="refuels" position="inside" />
                    </Bar>
                    <Bar dataKey="insurances" fill={APP_COLOR_BLUE}>
                      <LabelList dataKey="insurances" position="inside" />
                    </Bar>
                    <Bar dataKey="inspections" fill={APP_COLOR_CYAN}>
                      <LabelList dataKey="inspections" position="inside" />
                    </Bar>
                    <Bar dataKey="services" fill={APP_COLOR_YELLOW}>
                      <LabelList dataKey="services" position="inside" />
                    </Bar>
                    <Bar dataKey="repairs" fill={APP_COLOR_RED}>
                      <LabelList dataKey="repairs" position="inside" />
                    </Bar>
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
            </Row>
            <Row>
              <Col md="12" sm="12">
                <div className="text-center">
                  <h4>
                    <Translate contentKey="carcare.statistics.mileage" interpolate={{ unit: 'km' }}>
                      Mileage
                    </Translate>
                  </h4>
                </div>
                <ResponsiveContainer width="100%" aspect={32 / 9}>
                  <LineChart data={mileageResults} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[minMileage, 'auto']} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="mileage" stroke={APP_COLOR_CYAN}>
                      <LabelList dataKey="mileage" position="bottom" />
                    </Line>
                  </LineChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </div>
        ) : null}
        <hr />
        <BackButton handleFunction={this.handleClose} />
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  vehicles: storeState.vehicles.vehicles,
  totalItems: storeState.vehicles.totalItems,
  consumptionResults: storeState.statistics.consumptionResults,
  costsResults: storeState.statistics.costsResults,
  mileageResults: storeState.statistics.mileageResults,
  minMileage: storeState.statistics.minMileage,
  calculated: storeState.statistics.calculated,
  loading: storeState.statistics.loading
});

const mapDispatchToProps = { getVehicles, calculateConsumption, calculateCosts, calculateMileage, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statistics);
