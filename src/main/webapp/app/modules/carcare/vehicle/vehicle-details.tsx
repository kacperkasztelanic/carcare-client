import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, CardDeck, CardBody, CardTitle, Popover, PopoverHeader, PopoverBody, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import BackButton from 'app/shared/components/BackButton';

import { getVehicle, updateVehicle, createVehicle, reset } from './vehicle.reducer';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export interface IVehicleUpdateState {
    id: string;
    detailsPopoverOpen: boolean;
}

export class VehicleDetails extends React.Component<IVehicleUpdateProps, IVehicleUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            detailsPopoverOpen: false
        };
    }

    toogleDetailsPopover = () => {
        this.setState({
            detailsPopoverOpen: !this.state.detailsPopoverOpen
        });
    }

    componentWillMount() {
        this.props.getVehicle(this.props.match.params.id);
    }

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    prepareStringValue = (val: string): string => (
        val !== null && val.trim().length !== 0 ? val : '-'
    )

    prepareValue = (val: number) => (
        val !== null && val !== 0 ? val : '-'
    )

    clickRepairs = () => {
        this.props.history.push(`/app/repair/${this.state.id}`);
    }

    clickServices = () => {
        this.props.history.push(`/app/service/${this.state.id}`);
    }

    clickInspections = () => {
        this.props.history.push(`/app/inspection/${this.state.id}`);
    }

    clickInsurances = () => {
        this.props.history.push(`/app/insurance/${this.state.id}`);
    }

    clickRefuels = () => {
        this.props.history.push(`/app/refuel/${this.state.id}`);
    }

    render() {
        const { vehicleEntity, loading, match } = this.props;
        const iconSize = '4x';
        return (
            <div>
                {loading ? (
                    <ReactLoading type="bubbles" color="353D47" />
                ) : (<div>
                    <h2>
                        {vehicleEntity.make} {vehicleEntity.model} - {vehicleEntity.licensePlate}
                        <Link to={`${match.url}/edit`} className="btn btn-primary float-right jh-create-entity">
                            <FontAwesomeIcon icon="pencil-alt" /> <Translate contentKey="entity.action.edit">Edit</Translate>
                        </Link>
                    </h2>
                    <hr />
                    <Row size="md">
                        <Col md="3" sd="12">
                            <dl className="jh-entity-details">
                                <dt>
                                    <Translate contentKey="carcare.vehicle.make">Model</Translate>
                                </dt>
                                <dd>{vehicleEntity.make}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle.model">Model</Translate>
                                </dt>
                                <dd>{vehicleEntity.model}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.model-suffix">Model suffix</Translate>
                                </dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.modelSuffix)}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle.license-plate">License plate</Translate>
                                </dt>
                                <dd>{vehicleEntity.licensePlate}</dd>
                            </dl>
                        </Col>
                        <Col md="3" sd="12">
                            <dl className="jh-entity-details">
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.year-of-manufacture">Year of manufacture</Translate>
                                </dt>
                                <dd>{this.prepareValue(vehicleEntity.vehicleDetails.yearOfManufacture)}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.engine-power" interpolate={{ unit: 'kW' }}>Engine power (kW)</Translate>
                                </dt>
                                <dd>{this.prepareValue(vehicleEntity.vehicleDetails.enginePower)}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.engine-volume" interpolate={{ unit: 'cm3' }}>Engine volume (cm3)</Translate>
                                </dt>
                                <dd>{this.prepareValue(vehicleEntity.vehicleDetails.engineVolume)}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle.fuel-type">Fuel type</Translate>
                                </dt>
                                <dd>{vehicleEntity.fuelType}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.weight" interpolate={{ unit: 'kg' }}>Weight (kg)</Translate>
                                </dt>
                                <dd>{this.prepareValue(vehicleEntity.vehicleDetails.weight)}</dd>
                            </dl>
                        </Col>
                        <Col md="3" sd="12">
                            <dl className="jh-entity-details">
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.vin-number">VIN</Translate>
                                </dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.vinNumber)}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.registration-certificate">Registration certificate</Translate>
                                </dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.registrationCertificate)}</dd>
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.vehicle-card">Vehicle card</Translate>
                                </dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.vehicleCard)}</dd>
                            </dl>
                            <hr />
                            <dl className="jh-entity-details">
                                <dt>
                                    <Translate contentKey="carcare.vehicle-details.notes">Notes</Translate>
                                </dt>
                                <dd style={{ whiteSpace: 'pre-wrap' }}>
                                    {this.prepareStringValue(vehicleEntity.vehicleDetails.notes).slice(0, 120)}
                                    {(vehicleEntity.vehicleDetails.notes.length > 120 ? (
                                        <div>
                                            <br />
                                            <div className="text-center">
                                                <Button id="details-popover" type="button" color="info" onClick={this.toogleDetailsPopover}>...</Button>
                                                <Popover placement="right" isOpen={this.state.detailsPopoverOpen} target="details-popover">
                                                    <PopoverHeader><Translate contentKey="carcare.insurance.details">Details</Translate></PopoverHeader>
                                                    <PopoverBody style={{ whiteSpace: 'pre-wrap' }}>{this.prepareStringValue(vehicleEntity.vehicleDetails.notes)}</PopoverBody>
                                                </Popover>
                                            </div>
                                        </div>) : '')}
                                </dd>
                            </dl>
                        </Col>
                        <Col md="3" sd="12" className="text-right">
                            <img src={`data:image/jpeg;base64,${vehicleEntity.vehicleDetails.image}`} style={{ height: '250px' }} />
                        </Col>
                    </Row>
                    <hr />
                    <CardDeck>
                        <Card body inverse color="danger" style={{ cursor: 'pointer' }} onClick={this.clickRepairs}>
                            <CardBody>
                                <FontAwesomeIcon size={iconSize} icon="screwdriver" />
                                <hr />
                                <CardTitle>
                                    <Translate contentKey="carcare.repair.title">Repairs</Translate>
                                </CardTitle>
                            </CardBody>
                        </Card>
                        <Card body inverse color="warning" style={{ cursor: 'pointer' }} onClick={this.clickServices}>
                            <CardBody>
                                <FontAwesomeIcon size={iconSize} icon="oil-can" />
                                <hr />
                                <CardTitle>
                                    <Translate contentKey="carcare.service.title">Services</Translate>
                                </CardTitle>
                            </CardBody>
                        </Card>
                        <Card body inverse color="info" style={{ cursor: 'pointer' }} onClick={this.clickInspections}>
                            <CardBody>
                                <FontAwesomeIcon size={iconSize} icon="check-double" />
                                <hr />
                                <CardTitle>
                                    <Translate contentKey="carcare.inspection.title">Inspections</Translate>
                                </CardTitle>
                            </CardBody>
                        </Card>
                        <Card body inverse color="primary" style={{ cursor: 'pointer' }} onClick={this.clickInsurances}>
                            <CardBody>
                                <FontAwesomeIcon size={iconSize} icon="file-invoice-dollar" />
                                <hr />
                                <CardTitle>
                                    <Translate contentKey="carcare.insurance.title">Insurances</Translate>
                                </CardTitle>
                            </CardBody>
                        </Card>
                        <Card body inverse color="success" style={{ cursor: 'pointer' }} onClick={this.clickRefuels}>
                            <CardBody>
                                <FontAwesomeIcon size={iconSize} icon="gas-pump" />
                                <hr />
                                <CardTitle>
                                    <Translate contentKey="carcare.refuel.title">Refuels</Translate>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </CardDeck>
                    <hr />
                    <BackButton handleFunction={this.handleClose} />
                </div>
                    )}
            </div>
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    vehicleEntity: storeState.vehicles.vehicle,
    loading: storeState.vehicles.loading,
    updating: storeState.vehicles.updating,
    updateSuccess: storeState.vehicles.updateSuccess
});

const mapDispatchToProps = {
    getVehicle,
    updateVehicle,
    createVehicle,
    reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleDetails);
