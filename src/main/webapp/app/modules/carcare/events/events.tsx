import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Form, FormGroup, Label, Input, Table, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getVehicles, openDetails } from '../vehicle/vehicle.reducer';
import { fetchEvents, reset } from './events.reducer';
import { APP_LOCAL_DATE_FORMAT, APP_COMPACT_DETAILS_LENGTH } from 'app/config/constants';
import TableSummary from 'app/shared/components/TableSummary';
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
        this.props.reset();
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
        const { vehicles, events, totalItems, loading, vehiclesLoading, fetched } = this.props;
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
                                    <Translate contentKey="carcare.forthcoming-events.search">Search</Translate>
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
                {loading ? (
                    <ReactLoading type="bubbles" color="17A2B8" />
                ) : null}
                {fetched ? (
                    <div>
                        <Row>
                            <Col md="12" sd="12">
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>
                                                <Translate contentKey="carcare.common.date">Date</Translate>
                                            </th>
                                            <th>
                                                <Translate contentKey="carcare.common.mileage" interpolate={{ unit: 'km' }}>Mileage (km)</Translate>
                                            </th>
                                            <th>
                                                <Translate contentKey="carcare.common.cost" interpolate={{ unit: 'PLN' }}>Cost (PLN)</Translate>
                                            </th>
                                            <th>
                                                <Translate contentKey="carcare.service.next-by-date">Next by date</Translate>
                                            </th>
                                            <th>
                                                <Translate contentKey="carcare.service.next-by-mileage" interpolate={{ unit: 'km' }}>Next by mileage</Translate>
                                            </th>
                                            <th>
                                                <Translate contentKey="carcare.service.station">Station</Translate>
                                            </th>
                                            <th>
                                                <Translate contentKey="carcare.service.details">Details</Translate>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.map((e, i) => (
                                            <tr id={`i`} key={`event-${i}`}>
                                                <th>{i + 1}</th>
                                                <td>{e.eventType}</td>
                                                <td>{e.eventType}</td>
                                                <td>{e.vehicleId}</td>
                                                <td>
                                                    <TextFormat value={e.dateThru} type="date" format={APP_LOCAL_DATE_FORMAT} blankOnInvalid />
                                                </td>
                                                <td>{e.mileageThru}</td>
                                                <td>
                                                    <Button id="details-popover" type="button" outline color="info" onClick={this.toogleDetailsPopover}>
                                                        <span className="d-none d-md-inline">
                                                            {e.details.slice(0, APP_COMPACT_DETAILS_LENGTH - 3) + (e.details.length > APP_COMPACT_DETAILS_LENGTH ? '...' : '')}
                                                        </span>
                                                        <span className="d-sd-inline d-md-none"><FontAwesomeIcon icon="question" /></span>
                                                    </Button>
                                                    <Popover placement="right" isOpen={this.state.detailsPopoverOpen} target="details-popover">
                                                        <PopoverHeader><Translate contentKey="carcare.service.details">Details</Translate></PopoverHeader>
                                                        <PopoverBody style={{ whiteSpace: 'pre-wrap' }}>{e.details}</PopoverBody>
                                                    </Popover>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <TableSummary totalItems={totalItems} />
                            </Col>
                        </Row>
                    </div>) : null}
                <Row>
                    <Col md="12" sd="12">
                        <BackButton handleFunction={this.handleClose} />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    vehicles: storeState.vehicles.vehicles,
    vehiclesLoading: storeState.vehicles.loading,
    totalItems: storeState.events.totalItems,
    events: storeState.events.events,
    fetched: storeState.events.fetched,
    loading: storeState.events.loading
});

const mapDispatchToProps = { getVehicles, openDetails, fetchEvents, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events);
