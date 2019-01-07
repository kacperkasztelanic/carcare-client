import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getVehicles, openDetails } from '../vehicle/vehicle.reducer';
import { downloadReport, downloadCostReport } from './reports.reducer';
import BackButton from 'app/shared/components/BackButton';

export interface IReportsProps extends StateProps, DispatchProps, RouteComponentProps<{}> { }

export interface IReportsState {
    selectedVehicle: any;
    dateFrom: Date;
    dateTo: Date;
    selectedVehicles: any[];
}

export class Reports extends React.Component<IReportsProps, IReportsState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedVehicle: {
                id: ''
            },
            dateFrom: undefined,
            dateTo: undefined,
            selectedVehicles: []
        };
        this.onDateFromChange.bind(this);
        this.onDateToChange.bind(this);
        this.onVehiclesSelect.bind(this);
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
            selectedVehicle: this.props.vehicles.find(x => x.id == event.target.value)
        });
    }

    onVehiclesSelect = event => {
        const options = event.target.options;
        const value = [];
        for (const option of options) {
            if (option.selected) {
                value.push(option.value);
            }
        }
        this.setState({
            selectedVehicles: value
        });
    }

    onDateFromChange = event => {
        this.setState({
            dateFrom: event.target.value
        });
    }

    onDateToChange = event => {
        this.setState({
            dateTo: event.target.value
        });
    }

    generateClick = event => {
        event.preventDefault();
        if (this.state.selectedVehicle !== null) {
            this.props.downloadReport(this.state.selectedVehicle);
        }
    }

    generateCostReportClick = event => {
        event.preventDefault();
        if (this.state.selectedVehicles.length !== 0 && this.state.dateFrom !== undefined && this.state.dateTo !== undefined) {
            this.props.downloadCostReport(this.state.selectedVehicles, this.state.dateFrom, this.state.dateTo);
        }
    }

    render() {
        const { vehicles } = this.props;
        return (
            <div>
                <Row>
                    <Col md="6" sd="12">
                        <h3>
                            <FontAwesomeIcon icon="car" />{' '}
                            <Translate contentKey="carcare.reports.vehicle-report">Vehicle report</Translate>
                        </h3>
                        <hr />
                        <Form>
                            <FormGroup>
                                <Label for="vehicleSelect">
                                    <Translate contentKey="carcare.reports.vehicle-select">Vehicle</Translate>
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
                            <div className="text-center">
                                <Button
                                    color="primary"
                                    id="generate-report"
                                    type="submit"
                                    disabled={!this.state.selectedVehicle.id}
                                    onClick={this.generateClick}>
                                    <FontAwesomeIcon icon="file-excel" />{' '}
                                    <Translate contentKey="carcare.reports.generate">Generate</Translate>
                                </Button>
                            </div>
                        </Form>
                    </Col>
                    <Col md="6" sd="12">
                        <h3>
                            <FontAwesomeIcon icon="dollar-sign" />{' '}
                            <Translate contentKey="carcare.reports.cost-report">Cost report</Translate>
                        </h3>
                        <hr />
                        <Form>
                            <FormGroup>
                                <Label for="fromDate">
                                    <Translate contentKey="carcare.reports.date-from">From</Translate>
                                </Label>
                                <Input
                                    type="date"
                                    name="fromDate"
                                    id="fromDate"
                                    onChange={this.onDateFromChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="toDate">
                                    <Translate contentKey="carcare.reports.date-to">To</Translate>
                                </Label>
                                <Input
                                    type="date"
                                    name="toDate"
                                    id="toDate"
                                    onChange={this.onDateToChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="vehicleSelect">
                                    <Translate contentKey="carcare.reports.vehicles-select">Vehicle</Translate>
                                </Label>
                                <Input type="select" multiple name="selectMultiple" value={this.state.selectedVehicles} id="vehicleSelectMultiple" onChange={this.onVehiclesSelect}>
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
                            <div className="text-center">
                                <Button
                                    color="primary"
                                    id="generate-report"
                                    type="submit"
                                    disabled={this.state.selectedVehicles.length === 0 || !this.state.dateFrom || !this.state.dateTo}
                                    onClick={this.generateCostReportClick}>
                                    <FontAwesomeIcon icon="file-excel" />{' '}
                                    <Translate contentKey="carcare.reports.generate">Generate</Translate>
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <hr />
                <BackButton handleFunction={this.handleClose} />
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    vehicles: storeState.vehicles.vehicles,
    totalItems: storeState.vehicles.totalItems
});

const mapDispatchToProps = { getVehicles, openDetails, downloadReport, downloadCostReport };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reports);
