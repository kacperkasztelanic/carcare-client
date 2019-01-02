import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Card, CardDeck, CardBody, CardTitle } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import BackButton from 'app/shared/components/BackButton';
import { image } from 'app/shared/other/image';

import { getVehicle, updateVehicle, createVehicle, reset } from './vehicle.reducer';

export interface IVehicleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export interface IVehicleUpdateState {
    id: string;
}

export class VehicleDetails extends React.Component<IVehicleUpdateProps, IVehicleUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };
    }

    componentWillMount() {
        this.props.getVehicle(this.props.match.params.id);
    }

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    prepareStringValue = (val: string): string => (
        val.length !== 0 ? val : '-'
    )

    prepareValue = (val: number) => (
        val !== 0 ? val : '-'
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
        const { vehicleEntity, loading, updating, match } = this.props;
        const iconSize = '4x';
        return (
            <div>
                {loading ? (
                    <p>Loading...</p>
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
                                    <Translate contentKey="userManagement.createdBy">Created By</Translate>
                                </dt>
                                <dd>{this.prepareValue(vehicleEntity.vehicleDetails.enginePower)}</dd>
                                <dt>
                                    <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                                </dt>
                                <dd>{this.prepareValue(vehicleEntity.vehicleDetails.engineVolume)}</dd>
                                <dt>
                                    <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                                </dt>
                                <dd>{vehicleEntity.fuelType}</dd>
                                <dt>
                                    <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                                </dt>
                                <dd>{this.prepareValue(vehicleEntity.vehicleDetails.weight)}</dd>
                            </dl>
                        </Col>
                        <Col md="3" sd="12">
                            <dl className="jh-entity-details">
                                <dt>
                                    <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                                </dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.vinNumber)}</dd>
                                <dt>
                                    <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                                </dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.registrationCertificate)}</dd>
                                <dt>
                                    <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                                </dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.vehicleCard)}</dd>
                            </dl>
                        </Col>
                        <Col md="3" sd="12" className="text-right">
                            <img src={`data:image/jpeg;base64,${image}`} style={{ height: '250px' }} />
                        </Col>
                    </Row>
                    <Row size="md">
                        <Col>
                            <dl className="jh-entity-details">
                                <dt>Notes</dt>
                                <dd>{this.prepareStringValue(vehicleEntity.vehicleDetails.notes)}</dd>
                            </dl>
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

                    {/* <Card body inverse color="success" text-center style={{ cursor: 'pointer' }} onClick={this.clickReports}>
                        <CardBody>
                            <FontAwesomeIcon size={iconSize} icon="file-excel" />
                            <hr />
                            <CardTitle>
                                <Translate contentKey="carcare.reports.title">Reports</Translate>
                            </CardTitle>
                        </CardBody>
                    </Card>
                    <hr /> */}

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
