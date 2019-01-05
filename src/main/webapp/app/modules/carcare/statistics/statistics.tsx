import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getVehicles, openDetails } from '../vehicle/vehicle.reducer';
import { calculateConsumption } from './statistics.reducer';
import BackButton from 'app/shared/components/BackButton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface IStatisticsProps extends StateProps, DispatchProps, RouteComponentProps<{}> { }

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
        this.props.getVehicles();
    }

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    onVehicleSelect = event => {
        this.setState({
            ...this.state,
            selectedVehicle: this.props.vehicles.find(x => x.id == event.target.value)
        });
    }

    onDateFromChange = event => {
        this.setState({
            ...this.state,
            dateFrom: event.target.value
        });
    }

    onDateToChange = event => {
        this.setState({
            ...this.state,
            dateTo: event.target.value
        });
    }

    calculateClick = event => {
        event.preventDefault();
        if (this.state.selectedVehicle.id !== '' && this.state.dateFrom !== undefined && this.state.dateTo !== undefined) {
            this.props.calculateConsumption(this.state.selectedVehicle, this.state.dateFrom, this.state.dateTo);
        }
    }

    prepareConsumptionData = () => {
        const result = [];
        for (const consumptionResult of this.props.consumptionResults) {
            result.push({
                name: consumptionResult.periodVehicle.dateTo,
                fc: consumptionResult.averageConsumption
            });
        }
        return result;
    }

    render() {
        const { vehicles } = this.props;
        const consumptionData = this.prepareConsumptionData();
        return (
            <div>
                <Row>
                    <Col md="12" sd="12">
                        <h3>
                            <FontAwesomeIcon icon="calendar-alt" />{' '}
                            <Translate contentKey="carcare.statistics.title">Forthcoming events</Translate>
                        </h3>
                        <hr />
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col md="4" sd="12">
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
                        <Col md="4" sd="12">
                            <FormGroup>
                                <Label for="fromDate">
                                    <Translate contentKey="carcare.statistics.date-from">From</Translate>
                                </Label>
                                <Input
                                    type="date"
                                    name="fromDate"
                                    id="fromDate"
                                    onChange={this.onDateFromChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="4" sd="12">
                            <FormGroup>
                                <Label for="toDate">
                                    <Translate contentKey="carcare.statistics.date-to">To</Translate>
                                </Label>
                                <Input
                                    type="date"
                                    name="toDate"
                                    id="toDate"
                                    onChange={this.onDateToChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" sd="12">
                            <div className="text-center">
                                <Button
                                    color="primary"
                                    id="generate-report"
                                    type="submit"
                                    disabled={this.state.selectedVehicle.id === '' || !this.state.dateFrom || !this.state.dateTo}
                                    onClick={this.calculateClick}>
                                    <FontAwesomeIcon icon="calculator" />{' '}
                                    <Translate contentKey="carcare.statistics.calculate">Calculate</Translate>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col md="12" sd="12">
                        <hr />
                    </Col>
                </Row>
                <Row>
                    <Col md="12" sd="12">
                        <div className="text-center"><h4>
                            <Translate contentKey="carcare.statistics.title">Fuel consumption</Translate>
                        </h4></div>
                        <ResponsiveContainer width="100%" aspect={15 / 5}>
                            <BarChart data={consumptionData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="fc" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>

                    </Col>
                </Row>
                <hr />
                <BackButton handleFunction={this.handleClose} />
            </div >
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    vehicles: storeState.vehicles.vehicles,
    totalItems: storeState.vehicles.totalItems,
    consumptionResults: storeState.statistics.consumptionResults
});

const mapDispatchToProps = { getVehicles, openDetails, calculateConsumption };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistics);
