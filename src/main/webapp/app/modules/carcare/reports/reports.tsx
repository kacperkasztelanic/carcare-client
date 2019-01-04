import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Col, Card, CardDeck, CardBody, CardTitle, Form, FormGroup, Label, Input } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getVehicles, openDetails } from '../vehicle/vehicle.reducer';
import { downloadReport, downloadCostReport } from './reports.reducer';
import TableSummary from 'app/shared/components/TableSummary';
import { IVehicle } from 'app/shared/model/vehicle.model';
import BackButton from 'app/shared/components/BackButton';

export interface IReportsProps extends StateProps, DispatchProps, RouteComponentProps<{}> { }

export interface IReportsState {
    selectedVehicle: any;
}

export class Reports extends React.Component<IReportsProps, IReportsState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedVehicle: ''
        };
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

    generateClick = event => {
        event.preventDefault();
        if (this.state.selectedVehicle !== null) {
            this.props.downloadReport(this.state.selectedVehicle);
        }
    }

    generateCostReportClick = event => {
        event.preventDefault();
        if (this.state.selectedVehicle !== null) {
            this.props.downloadCostReport([], new Date(), new Date());
        }
    }

    render() {
        const { vehicles, totalItems, match } = this.props;
        const iconSize = '3x';
        return (
            <div>
                <Row>
                    <Col md="6" sd="12">
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
                            <Button color="primary" id="generate-report" type="submit" disabled={!this.state.selectedVehicle} onClick={this.generateClick}>
                                <FontAwesomeIcon icon="file-excel" />&nbsp;
                  <Translate contentKey="carcare.reports.generate">Generate</Translate>
                            </Button>
                        </Form>
                    </Col>
                    <Col md="6" sd="12">
                        <Form>
                            <FormGroup>
                                <Label for="fromDate">Date</Label>
                                <Input
                                    type="date"
                                    name="fromDate"
                                    id="fromDate"
                                    placeholder="from Date"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="toDate">Date</Label>
                                <Input
                                    type="date"
                                    name="toDate"
                                    id="toDate"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="vehicleSelect">
                                    <Translate contentKey="carcare.reports.vehicle-select">Vehicle</Translate>
                                </Label>
                                <Input type="select" multiple name="selectMultiple" id="vehicleSelectMultiple">
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
                            <Button color="primary" id="generate-report" type="submit" disabled={false} onClick={this.generateCostReportClick}>
                                <FontAwesomeIcon icon="file-excel" />&nbsp;
                  <Translate contentKey="carcare.reports.generate">Generate</Translate>
                            </Button>
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
