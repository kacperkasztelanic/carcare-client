import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, setFileData } from 'react-jhipster';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getVehicle, updateVehicle, reset, getFuelTypes } from './vehicle.reducer';
import { IFuelType } from 'app/shared/model/fuel-type.model';

export interface IVehicleDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export interface IVehicleDetailsUpdateState {
    id: string;
    blobData: any;
    blobDataContentType: any;
}

export class VehicleDetailsUpdate extends React.Component<IVehicleDetailsUpdateProps, IVehicleDetailsUpdateState> {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            blobData: this.props.vehicleEntity.vehicleDetails.image,
            blobDataContentType: this.props.vehicleEntity.vehicleDetails.imageContentType
        };
    }

    componentDidMount() {
        this.props.getVehicle(this.props.match.params.id);
        this.props.getFuelTypes();
    }

    saveEntity = (event, errors, values) => {
        if (errors.length === 0) {
            const { vehicleEntity } = this.props;
            const entity = {
                ...vehicleEntity,
                ...values,
                model: values.model,
                vehicleDetails: {
                    ...values.vehicleDetails,
                    image: this.state.blobData,
                    imageContentType: this.state.blobDataContentType
                }
            };
            this.props.updateVehicle(entity);
            this.handleClose(event);
        }
    };

    handleClose = event => {
        event.stopPropagation();
        this.props.history.goBack();
    };

    onBlobChange = (isAnImage, name) => event => {
        setFileData(event, (contentType, data) => (
            this.setState({
                blobData: data,
                blobDataContentType: contentType
            })), isAnImage);
    };

    render() {
        const { vehicleEntity, fuelTypes, loading, updating } = this.props;
        return (
            <Modal isOpen toggle={this.handleClose} size="lg">
                <ModalHeader toggle={this.handleClose}>
                    <Translate contentKey="carcare.vehicle-details.edit-title">Create or edit a vehicle</Translate>
                </ModalHeader>
                <ModalBody>
                    {loading ? (
                        <ReactLoading type="bubbles" color="353D47" />
                    ) : (
                            <AvForm model={vehicleEntity} onSubmit={this.saveEntity}>
                                <Row>
                                    <Col md="4" sd="12">
                                        <AvGroup>
                                            <Label id="makeLabel" for="make">
                                                <Translate contentKey="carcare.vehicle.make">Make</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-make"
                                                type="text"
                                                className="form-control"
                                                name="make"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') },
                                                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="modelLabel" for="model">
                                                <Translate contentKey="carcare.vehicle.model">Model</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-model"
                                                type="text"
                                                className="form-control"
                                                name="model"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') },
                                                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="modelSuffixLabel" for="vehicleDetails.modelSuffix">
                                                <Translate contentKey="carcare.vehicle-details.model-suffix">Model suffix</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-modelSuffix"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.modelSuffix"
                                                validate={{
                                                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="licensePlateLabel" for="licensePlate">
                                                <Translate contentKey="carcare.vehicle.license-plate">License plate</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-licensePlate"
                                                type="text"
                                                className="form-control"
                                                name="licensePlate"
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') },
                                                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                                                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                                                }}
                                            />
                                        </AvGroup>
                                    </Col>
                                    <Col md="4" sd="12">
                                        <AvGroup>
                                            <Label id="yearOfManufactureLabel" for="vehicleDetails.yearOfManufacture">
                                                <Translate contentKey="carcare.vehicle-details.year-of-manufacture">License plate</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-yearOfManufacture"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.yearOfManufacture"
                                                validate={{
                                                    pattern: { value: '^[0-9]*$', errorMessage: translate('entity.validation.number') },
                                                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                                                    max: { value: 99999, errorMessage: translate('entity.validation.max', { max: 99999 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="enginePowerLabel" for="vehicleDetails.enginePower">
                                                <Translate contentKey="carcare.vehicle-details.engine-power" interpolate={{ unit: 'kW' }}>Engine power (kW)</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-enginePower"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.enginePower"
                                                validate={{
                                                    pattern: { value: '^[0-9]*$', errorMessage: translate('entity.validation.number') },
                                                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                                                    max: { value: 99999, errorMessage: translate('entity.validation.max', { max: 99999 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="engineVolumeLabel" for="vehicleDetails.engineVolume">
                                                <Translate contentKey="carcare.vehicle-details.engine-volume" interpolate={{ unit: 'cm3' }}>Engine volume (cm3)</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-engineVolume"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.engineVolume"
                                                validate={{
                                                    pattern: { value: '^[0-9]*$', errorMessage: translate('entity.validation.number') },
                                                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                                                    max: { value: 99999, errorMessage: translate('entity.validation.max', { max: 99999 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="fuelTypeLabel" for="fuelType">
                                                <Translate contentKey="carcare.vehicle.fuel-type">Fuel type</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-fuelType"
                                                type="select"
                                                className="form-control"
                                                name="fuelType"
                                                value={vehicleEntity.fuelType ? vehicleEntity.fuelType.type : ''}
                                                validate={{
                                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                                }}>
                                                <option disabled hidden />
                                                {fuelTypes
                                                    ? fuelTypes.map((x: IFuelType) => (
                                                        <option value={x.type} key={x.type}>
                                                            {x.translation}
                                                        </option>
                                                    ))
                                                    : null}
                                            </AvField>
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="weightLabel" for="vehicleDetails.weight">
                                                <Translate contentKey="carcare.vehicle-details.weight" interpolate={{ unit: 'kg' }}>Weight (kg)</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-weight"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.weight"
                                                validate={{
                                                    pattern: { value: '^[0-9]*$', errorMessage: translate('entity.validation.number') },
                                                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                                                    max: { value: 99999, errorMessage: translate('entity.validation.max', { max: 99999 }) }
                                                }}
                                            />
                                        </AvGroup>
                                    </Col>
                                    <Col md="4" sd="12">
                                        <AvGroup>
                                            <Label id="vinLabel" for="vehicleDetails.vinNumber">
                                                <Translate contentKey="carcare.vehicle-details.vin-number">VIN</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-vin"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.vinNumber"
                                                validate={{
                                                    maxLength: { value: 17, errorMessage: translate('entity.validation.maxlength', { max: 17 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="registrationCertificateLabel" for="vehicleDetails.registrationCertificate">
                                                <Translate contentKey="carcare.vehicle-details.registration-certificate">Registration certificate</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-registrationCertificate"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.registrationCertificate"
                                                validate={{
                                                    maxLength: { value: 17, errorMessage: translate('entity.validation.maxlength', { max: 14 }) }
                                                }}
                                            />
                                        </AvGroup>
                                        <AvGroup>
                                            <Label id="vehicleCardLabel" for="vehicleDetails.vehicleCard">
                                                <Translate contentKey="carcare.vehicle-details.vehicle-card">Vehicle card</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-vehicleCard"
                                                type="text"
                                                className="form-control"
                                                name="vehicleDetails.vehicleCard"
                                                validate={{
                                                    maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                                                }}
                                            />
                                        </AvGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6" sd="12">
                                        <AvGroup>
                                            <Label id="notesLabel" for="vehicleDetails.notes">
                                                <Translate contentKey="carcare.vehicle-details.notes">Notes</Translate>
                                            </Label>
                                            <AvField
                                                id="vehicle-details-notes"
                                                type="textarea"
                                                rows="5"
                                                name="vehicleDetails.notes"
                                            />
                                        </AvGroup>
                                    </Col>
                                    <Col md="6" sd="12">
                                        <AvGroup>
                                            <AvGroup>
                                                <Label id="imageLabel" for="vehicleDetails.image">
                                                    <Translate contentKey="carcare.vehicle-details.image">Image</Translate>
                                                </Label>
                                                <br />
                                                <input id="vehicleDetails.image" type="file" onChange={this.onBlobChange(true, 'vehicleDetaiils.Image')} accept="image/*" />
                                            </AvGroup>
                                        </AvGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <Button tag={Link} id="cancel-save" to={`/app/details/${this.state.id}`} replace color="info">
                                            <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                                                <Translate contentKey="entity.action.back">Back</Translate>
                                            </span>
                                        </Button>
                                        &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                                            <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                                        </Button>
                                    </Col>
                                </Row>
                            </AvForm>
                        )}
                </ModalBody>
            </Modal >
        );
    }
}

const mapStateToProps = (storeState: IRootState) => ({
    vehicleEntity: storeState.vehicles.vehicle,
    fuelTypes: storeState.vehicles.fuelTypes,
    loading: storeState.vehicles.loading,
    updating: storeState.vehicles.updating,
    updateSuccess: storeState.vehicles.updateSuccess
});

const mapDispatchToProps = {
    getVehicle,
    updateVehicle,
    reset,
    getFuelTypes
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleDetailsUpdate);
