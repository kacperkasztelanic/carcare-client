import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getVehicles, openDetails } from '../vehicle/vehicle.reducer';
import { fetchEvents } from './events.reducer';
import BackButton from 'app/shared/components/BackButton';

export interface IEventsProps extends StateProps, DispatchProps, RouteComponentProps<{}> { }

export interface IEventsState {
    dateFrom: Date;
    dateTo: Date;
    selectedVehicles: any[];
}

export class Events extends React.Component<IEventsProps, IEventsState> {
    constructor(props) {
        super(props);
        this.state = {
            dateFrom: undefined,
            dateTo: undefined,
            selectedVehicles: []
        };
        this.onDateFromChange.bind(this);
        this.onDateToChange.bind(this);
        this.onVehiclesSelect.bind(this);
    }

    componentDidMount() {
        this.props.getVehicles();
    }

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

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

    fetchEventsClick = event => {
        event.preventDefault();
        if (this.state.selectedVehicles.length !== 0 && this.state.dateFrom !== undefined && this.state.dateTo !== undefined) {
            this.props.fetchEvents(this.state.selectedVehicles, this.state.dateFrom, this.state.dateTo);
        }
    }

    render() {
        const { vehicles } = this.props;
        return (
            <div>
                <Row>
                    <Col md="12" sd="12">
                        <h3>
                            <FontAwesomeIcon icon="calendar-alt" />{' '}
                            <Translate contentKey="carcare.forthcoming-events.title">Forthcoming events</Translate>
                        </h3>
                        <hr />
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col md="4" sd="12">
                            <FormGroup>
                                <Label for="vehicleSelect">
                                    <Translate contentKey="carcare.forthcoming-events.vehicles-select">Vehicles</Translate>
                                </Label>
                                <Input type="select" multiple name="selectMultiple" id="vehicleSelectMultiple" onChange={this.onVehiclesSelect}>
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
                                    <Translate contentKey="carcare.forthcoming-events.date-from">From</Translate>
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
                                    <Translate contentKey="carcare.forthcoming-events.date-to">To</Translate>
                                </Label>
                                <Input
                                    type="date"
                                    name="toDate"
                                    id="toDate"
                                    onChange={this.onDateToChange}
                                />
                            </FormGroup>
                            <div className="text-right">
                                <Button
                                    color="primary"
                                    id="generate-report"
                                    type="submit"
                                    disabled={this.state.selectedVehicles.length === 0 || !this.state.dateFrom || !this.state.dateTo}
                                    onClick={this.fetchEventsClick}>
                                    <FontAwesomeIcon icon="search" />{' '}
                                    <Translate contentKey="carcare.forthcoming-events.show">Show</Translate>
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
                    <Col md="6" sd="12">
                    </Col>
                    <Col md="6" sd="12">
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
    totalItems: storeState.vehicles.totalItems
});

const mapDispatchToProps = { getVehicles, openDetails, fetchEvents };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events);
